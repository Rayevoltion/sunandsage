// Sun & Sage Spaces Worker.
// Static site files in _site are served automatically.
// This script only handles the site editor's GitHub sign-in: /auth and /callback.
// Needs Worker secrets: GITHUB_CLIENT_ID, GITHUB_CLIENT_SECRET.

async function startAuth(request, env) {
  const url = new URL(request.url);
  const state = crypto.randomUUID();
  const authorize = new URL("https://github.com/login/oauth/authorize");
  authorize.searchParams.set("client_id", env.GITHUB_CLIENT_ID);
  authorize.searchParams.set("redirect_uri", `${url.origin}/callback`);
  authorize.searchParams.set("scope", url.searchParams.get("scope") || "repo");
  authorize.searchParams.set("state", state);
  return new Response(null, {
    status: 302,
    headers: {
      Location: authorize.toString(),
      "Set-Cookie": `decap_oauth_state=${state}; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=600`
    }
  });
}

function page(status, payload) {
  const message = `authorization:github:${status}:${JSON.stringify(payload)}`;
  return new Response(
    `<!doctype html><html><body><p>Signing in…</p><script>
(function () {
  var msg = ${JSON.stringify(message)};
  function receive(e) {
    if (e.origin !== window.location.origin) return;
    window.opener.postMessage(msg, e.origin);
    window.removeEventListener("message", receive);
    setTimeout(function () { window.close(); }, 200);
  }
  window.addEventListener("message", receive);
  window.opener && window.opener.postMessage("authorizing:github", window.location.origin);
})();
</script></body></html>`,
    {
      headers: {
        "Content-Type": "text/html; charset=utf-8",
        "Set-Cookie": "decap_oauth_state=; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=0"
      }
    }
  );
}

async function finishAuth(request, env) {
  const url = new URL(request.url);
  const code = url.searchParams.get("code");
  const state = url.searchParams.get("state");
  const cookie = request.headers.get("Cookie") || "";
  const saved = (cookie.match(/decap_oauth_state=([^;]+)/) || [])[1];

  if (!code || !state || state !== saved) {
    return page("error", { message: "Sign-in expired or was interrupted. Close this window and try again." });
  }

  const res = await fetch("https://github.com/login/oauth/access_token", {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json", "User-Agent": "sunandsage-editor" },
    body: JSON.stringify({
      client_id: env.GITHUB_CLIENT_ID,
      client_secret: env.GITHUB_CLIENT_SECRET,
      code,
      redirect_uri: `${url.origin}/callback`
    })
  });
  const data = await res.json();
  if (!data.access_token) {
    return page("error", { message: data.error_description || "GitHub did not return a token." });
  }
  return page("success", { token: data.access_token, provider: "github" });
}

export default {
  async fetch(request, env) {
    const { pathname } = new URL(request.url);
    if (pathname === "/auth") return startAuth(request, env);
    if (pathname === "/callback") return finishAuth(request, env);
    return env.ASSETS.fetch(request);
  }
};

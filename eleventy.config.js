module.exports = function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy("src/assets");
  eleventyConfig.addPassthroughCopy("src/admin");
  eleventyConfig.addPassthroughCopy({ "src/robots.txt": "robots.txt" });
  eleventyConfig.addPassthroughCopy({ "src/_headers": "_headers" });
  eleventyConfig.addFilter("year", () => new Date().getFullYear());
  eleventyConfig.addFilter("pad", (n) => String(n).padStart(2, "0"));
  eleventyConfig.addFilter("paras", (t) => (t || "").split(/\n\s*\n/).map(x => x.trim()).filter(Boolean)
    .map(x => "<p>" + x.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/\n/g,"<br>") + "</p>").join("\n"));
  return {
    dir: { input: "src", includes: "_includes", data: "_data", output: "_site" },
    htmlTemplateEngine: "njk",
    templateFormats: ["njk"]
  };
};

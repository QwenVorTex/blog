import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";

export default defineConfig({
  site: "https://your-blog.edgeone.app",
  integrations: [mdx(), sitemap()],
  output: "static",
  build: {
    assets: "_assets",
  },
  markdown: {
    shikiConfig: {
      theme: "github-dark",
      wrap: true,
    },
  },
});

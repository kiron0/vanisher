import { defineConfig } from "vitepress";

export default defineConfig({
  title: "VanisherJS",
  description:
    "Gradually fade out websites and elements with deadline-based opacity control",
  appearance: true,
  cleanUrls: true,
  metaChunk: true,

  head: [
    ["link", { rel: "icon", href: "/logo.png" }],
    ["link", { rel: "apple-touch-icon", href: "/logo.png" }],
    ["meta", { property: "og:type", content: "website" }],
    [
      "meta",
      {
        property: "og:title",
        content: "VanisherJS - Fade out by deadline",
      },
    ],
    [
      "meta",
      {
        property: "og:description",
        content:
          "Gradually fade out websites and elements with deadline-based opacity control",
      },
    ],
    ["meta", { property: "og:image", content: "/og-image.png" }],
    ["meta", { property: "og:url", content: "https://vanisher.js.org" }],
    // Twitter
    ["meta", { name: "twitter:card", content: "summary_large_image" }],
    [
      "meta",
      {
        name: "twitter:title",
        content: "VanisherJS - Fade out by deadline",
      },
    ],
    [
      "meta",
      {
        name: "twitter:description",
        content:
          "Gradually fade out websites and elements with deadline-based opacity control",
      },
    ],
    ["meta", { name: "twitter:image", content: "/og-image.png" }],
  ],

  themeConfig: {
    logo: {
      src: "/logo.png",
      alt: "VanisherJS Logo",
    },
    siteTitle: "VanisherJS",
    nav: [
      { text: "Guide", link: "/guide/introduction" },
      { text: "API", link: "/api/core-api" },
      { text: "Examples", link: "/examples/overview" },
    ],
    sidebar: {
      "/guide/": [
        {
          text: "Getting Started",
          items: [
            { text: "Introduction", link: "/guide/introduction" },
            { text: "Installation", link: "/guide/installation" },
            { text: "Quick Start", link: "/guide/quick-start" },
          ],
        },
        {
          text: "Core Concepts",
          items: [
            { text: "How It Works", link: "/guide/how-it-works" },
            { text: "Configuration", link: "/guide/configuration" },
            { text: "Deadlines", link: "/guide/deadlines" },
          ],
        },
      ],
      "/api/": [
        {
          text: "API Reference",
          items: [
            { text: "Core API", link: "/api/core-api" },
            { text: "React Components", link: "/api/react" },
            { text: "Next.js Components", link: "/api/next" },
            { text: "Types", link: "/api/types" },
          ],
        },
      ],
      "/examples/": [
        {
          text: "Examples",
          items: [
            { text: "Overview", link: "/examples/overview" },
            { text: "Basic Usage", link: "/examples/basic-usage" },
            { text: "Script Tag Demo", link: "/examples/script-tag-demo" },
            { text: "React Integration", link: "/examples/react" },
            { text: "Next.js Integration", link: "/examples/next" },
            { text: "Advanced Scenarios", link: "/examples/advanced" },
            {
              text: "React Warning Test",
              link: "/examples/react-warning-test",
            },
            {
              text: "Next.js Warning Test",
              link: "/examples/nextjs-warning-test",
            },
          ],
        },
      ],
    },
    socialLinks: [
      {
        icon: "github",
        link: "https://github.com/kiron0/vanisher/tree/main/packages",
      },
    ],
    footer: {
      message: "Released under the MIT License.",
      copyright: `Copyright &copy;${new Date().getFullYear()} Toufiq Hasan Kiron`,
    },
  },
  vite: {
    optimizeDeps: {
      include: ["vanisher"],
    },
  },
});

export default function manifest() {
  return {
    name: "James Guevara Gamboa | Frontend & Full Stack Developer",
    short_name: "James Guevara",
    description:
      "Portfolio of James Guevara Gamboa, Frontend & Full Stack Developer based in Heredia, Costa Rica.",
    start_url: "/en",
    display: "standalone",
    background_color: "#07070b",
    theme_color: "#07070b",
    icons: [
      { src: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
  };
}

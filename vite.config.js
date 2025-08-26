// import { defineConfig } from "vite";
// import react from "@vitejs/plugin-react";
// import tailwindcss from "@tailwindcss/vite";
// import { fileURLToPath, URL } from "node:url";
// import svgr from "vite-plugin-svgr";

// // https://vite.dev/config/
// export default defineConfig({
//   plugins: [react(), tailwindcss(), svgr()],
//   resolve: {
//     alias: {
//       "@": fileURLToPath(new URL("./src", import.meta.url)),
//       "@assets": fileURLToPath(new URL("./src/assets", import.meta.url)),
//       "@components": fileURLToPath(
//         new URL("./src/components", import.meta.url)
//       ),
//       "@constants": fileURLToPath(new URL("./src/constants", import.meta.url)),
//       "@contexts": fileURLToPath(new URL("./src/contexts", import.meta.url)),
//       "@layouts": fileURLToPath(new URL("./src/layouts", import.meta.url)),
//       "@pages": fileURLToPath(new URL("./src/pages", import.meta.url)),

//       "@hooks": fileURLToPath(new URL("./src/hooks", import.meta.url)),
//       "@utils": fileURLToPath(new URL("./src/utils", import.meta.url)),
//       "@services": fileURLToPath(new URL("./src/services", import.meta.url)),
//     },
//   },
// });



export default defineConfig({
  base: "/",   // 👈 ensures assets load from root
  plugins: [react(), tailwindcss(), svgr()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
      "@assets": fileURLToPath(new URL("./src/assets", import.meta.url)),
      "@components": fileURLToPath(new URL("./src/components", import.meta.url)),
      "@constants": fileURLToPath(new URL("./src/constants", import.meta.url)),
      "@contexts": fileURLToPath(new URL("./src/contexts", import.meta.url)),
      "@layouts": fileURLToPath(new URL("./src/layouts", import.meta.url)),
      "@pages": fileURLToPath(new URL("./src/pages", import.meta.url)),
      "@hooks": fileURLToPath(new URL("./src/hooks", import.meta.url)),
      "@utils": fileURLToPath(new URL("./src/utils", import.meta.url)),
      "@services": fileURLToPath(new URL("./src/services", import.meta.url)),
    },
  },
});

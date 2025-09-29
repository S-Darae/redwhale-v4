import path from "path";
import { defineConfig } from "vite";

export default defineConfig({
  base: "/redwhale-v4/",

  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `
          @use "foundation/typography" as *;
          @use "foundation/color" as *;
          @use "foundation/shadow" as *;
          @use "foundation/icon" as *;
        `,
        includePaths: [path.resolve(__dirname, ".")],
      },
    },
  },
});

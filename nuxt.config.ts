import { defineNuxtConfig } from "nuxt";

export default defineNuxtConfig({
    modules: ["@nuxtjs/tailwindcss"],
    nitro: {
        preset: "node-server",
    },
});

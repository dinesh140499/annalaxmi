module.exports = {
  name: "GrainPulseAgroWebsite",
  script: "serve",
  env: {
    PM2_SERVE_PATH: "./dist",
    PM2_SERVE_PORT: 65293,
    PM2_SERVE_SPA: "true",
    PM2_SERVE_HOMEPAGE: "/index.html",
  },
};

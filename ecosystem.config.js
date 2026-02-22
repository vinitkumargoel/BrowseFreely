module.exports = {
  apps: [
    {
      name: "browsefreely",
      script: "src/index.tsx",
      interpreter: "bun",
      env: {
        NODE_ENV: "production",
        PORT: 3065
      },
    },
  ],
};

const Hapi = require("@hapi/hapi");

(async () => {
  const server = Hapi.server({
    host: "localhost",
    port: 3000,
    routes: {
      cors: {
        origin: ["*"],
      },
    },
  });
  server.start();
  console.log(`Server is running on ${server.info.uri}`);
})();

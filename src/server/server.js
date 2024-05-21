require("dotenv").config();

const Hapi = require("@hapi/hapi");
const routes = require("./routes");
const InputError = require("../exceptions/InputError");
const loadModel = require("../services/loadModel");

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
  const model = await loadModel();

  server.app.model = model; // attach model to the web service
  server.route(routes);

  server.ext("onPreResponse", function (request, h) {
    const response = request.response;

    if (response.isBoom && response.statusCode === 413) {
      const newResponse = h
        .response({
          status: "fail",
          message:
            "Payload content length greater than maximum allowed: 1000000",
        })
        .code(413);

      return newResponse;
    }

    if (response instanceof InputError) {
      // InputError akan berasal dari file InputError.js
      const newResponse = h.response({
        status: "fail",
        message: `${response.message} Silakan gunakan foto lain.`,
      });
      newResponse.code(response.statusCode);
      return newResponse;
    }
    if (response.isBoom) {
      const newResponse = h.response({
        status: "fail",
        message: response.message,
      });
      newResponse.code(response.statusCode);
      return newResponse;
    }
    return h.continue;
  });

  server.start();
  console.log(
    `[INFO][${new Date().toLocaleTimeString()}] Server is running on ${
      server.info.uri
    }`
  );
})();

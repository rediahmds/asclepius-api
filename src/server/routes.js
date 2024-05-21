const { postPredictHandler, getPredictionHistories } = require("./handlers");

const routes = [
  {
    method: "GET",
    path: "/hello",
    handler: (request, h) => {
      return h.response({
        status: "success",
        message: "Hello World!",
      });
    },
  },
  {
    method: "POST",
    path: "/predict",
    handler: postPredictHandler,
    options: {
      payload: {
        allow: "multipart/form-data", // allow sending image format
        multipart: true,
      },
    },
  },

  {
    method: "GET",
    path: "/predict/histories",
    handler: getPredictionHistories,
  },
];

module.exports = routes;

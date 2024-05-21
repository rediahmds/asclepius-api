const { postPredictHandler, getPredictionHistories } = require("./handlers");

const routes = [
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

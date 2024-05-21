const postPredictHandler = require("./handlers");

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
];

module.exports = routes;

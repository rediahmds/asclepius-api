const predictClassification = require("../services/inferenceService");
const crypto = require("crypto");
const { storeData, getHistories } = require("../services/firestoreInteract");

const postPredictHandler = async (request, h) => {
  const { image } = request.payload;
  const { model } = request.server.app;

  const { result, suggestion } = await predictClassification(model, image);

  const id = crypto.randomUUID();
  const createdAt = new Date().toISOString();
  const data = {
    id,
    result,
    suggestion,
    createdAt,
  };

  await storeData(id, data);

  const response = h
    .response({
      status: "success",
      message: "Model is predicted successfully",
      data,
    })
    .code(201);

  return response;
};

const getPredictionHistories = async (request, h) => {
  const histories = await getHistories();

  return h
    .response({
      status: "success",
      data: histories,
    })
    .code(200);
};
module.exports = { postPredictHandler, getPredictionHistories };

const { Firestore } = require("@google-cloud/firestore");

const db = new Firestore();

function storeData(id, data) {
  const predictCollection = db.collection("predictions");
  return predictCollection.doc(id).set(data);
}

async function getHistories() {
  const snapshot = await db.collection("predictions").get();
  const histories = [];
  snapshot.forEach((doc) => histories.push({ id: doc.id, history: doc.data() }));

  return histories;
}

module.exports = { storeData, getHistories };

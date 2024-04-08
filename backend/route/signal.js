const express = require("express");
const {
  getAllData,
  getDataById,
  postData,
  getCriteriaData,
} = require("../controller/signal");

const router = express.Router();

router.post("/", postData);

router.get("/", getAllData);

router.get("/:id", getDataById);

router.get("/:id/:variable", getCriteriaData);

module.exports = router;

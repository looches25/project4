//"api/sku"
const express = require("express");
const SKU = require("../models/SKUSchema");
const { StatusCodes } = require("http-status-codes");
const SeedSKU = require("../models/SeedSKU");

const router = express.Router();

//! Seed Route (reset database)
router.get("/seed", async (req, res) => {
  try {
    await SKU.deleteMany({});
    const newSKU = await SKU.create(SeedSKU);
    res.send({ status: "success", data: newSKU });
  } catch (error) {
    res.send(error);
  }
});

//! CREATE
router.post("/new", async (req, res) => {
  try {
    const newSKU = await SKU.create(req.body);
    res.status(StatusCodes.CREATED).send({ status: "success", data: newSKU });
  } catch (error) {
    res.send(error);
  }
});

//! READ - ALL
router.get("/", async (req, res) => {
  try {
    const allSKU = await SKU.find();
    res.send({ status: "success", data: allSKU });
  } catch (error) {
    res.send(error);
  }
});
//! READ - ONE
router.get("/:id", async (req, res) => {
  try {
    const SKUid = await SKU.findOne({
      _id:req.params.id
    });
    res.send({ status: "success", data: SKUid });
  } catch (error) {
    res.send(error);
  }
});
//! UPDATE
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const updateSKU = await SKU.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res
      .status(StatusCodes.OK)
      .send({ status: "success:", data: updateSKU });
  } catch (error) {
    res.send(error);
  }
});

module.exports = router;

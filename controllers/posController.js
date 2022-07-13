//"api/pos"
const express = require("express");
const POS = require("../models/POSSchema");
const { StatusCodes } = require("http-status-codes");
const SeedPOS = require("../models/SeedPOS");

const router = express.Router();

//! SEED
router.get("/seed/", async (req, res) => {
    try {
      await POS.deleteMany({})
        .then((data) => {
          POS.create(SeedPOS);
          res.send({ status: "success", data: data });
        })
    } catch (error) {
      res.send(error);
    }
  });

//! ALL
router.get("/", async (req, res) => {
  try {
    const POSdata = await POS.find();
    res.send({ status: "success", data: POSdata });
    // res.status(StatusCodes.OK).send({
    //       status: "success", data: userdata
    // });
  } catch (error) {
    res.send(error);
  }
});

//! CREATE
router.post("/new", async (req, res) => {
  // res.send("Hello123")
  try {
    const newPOS = await POS.create(req.body);
    res.status(StatusCodes.CREATED).send({ status: "POST success", data: newPOS });
  } catch (error) {
    res.send(error);
  }
});

module.exports = router;

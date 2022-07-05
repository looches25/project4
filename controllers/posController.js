//"api/pos"
const express = require("express");
const POS = require("../models/POSSchema");
const { StatusCodes } = require("http-status-codes");
const SeedPOS = require("../models/SeedPOS");

const router = express.Router();

//! SEED
router.get("/seed/", async (req, res) => {
    try {
      await Users.deleteMany({})
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
    const SKUdata = await SKU.find();
    res.send({ status: "success", data: SKUdata });
    // res.status(StatusCodes.OK).send({
    //       status: "success", data: userdata
    // });
  } catch (error) {
    res.send(error);
  }
});

module.exports = router;

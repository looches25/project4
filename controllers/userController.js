//"api/users"
const express = require("express");
const Users = require("../models/UserSchema");
const { StatusCodes } = require("http-status-codes");
const SeedUsers = require("../models/SeedUsers");
const bcrypt = require ("bcrypt")
const jwt = require ('jsonwebtoken')
require('dotenv').config()
const path = require ('path')

const router = express.Router();

//! SEED
router.get("/seed/", async (req, res) => {
    try {
      await Users.deleteMany({})
      const proUserSeed = SeedUsers.map(async (user) => { user.password= await bcrypt.hash
        (user.password, 10);

        return user
        })
        await Promise.all(proUserSeed)
        .then((data) => {
          Users.create(data);
          res.send({ status: "success", data: data });
        })
    } catch (error) {
      res.send(error);
    }
  });

//! ALL
router.get("/", async (req, res) => {
  try {
    const userdata = await Users.find();
    res.send({ status: "success", data: userdata });
    // res.status(StatusCodes.OK).send({
    //       status: "success", data: userdata
    // });
  } catch (error) {
    res.send(error);
  }
});

//! CREATE
router.post("/", async (req, res) => {
  try {
    const hashPW = await bcrypt.hash(req.body.password,10)
    const user = await Users.create({name: req.body.name, password: hashPW});
    res.status(StatusCodes.CREATED).send({ status: "success", data: user});
  } catch (error) {
    res.send(error);
  }
});
//! LOGIN
router.post("/login", async (req, res) => {
  try {
    const UserNow = await Users.findOne({
      name: req.body.name,
    })
    if (!UserNow) {
      res.send ({status:"failed", data:"User not found"})
    } else {
      if (await bcrypt.compare(req.body.password, UserNow.password)) {
        res.send('Success!')
      } else {
        res.send("Failed to login")
      }
    }

  } catch (error){
    res.send(error);
  }
})

module.exports = router;

const express = require("express");
const User = require("../schema/User");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const signature = "abTADA";

router.post(
  "/createuser",
  [
    body("name").isLength({ min: 5 }),
    body("email").isEmail(),
    body("password").isLength({ min: 5 }),
  ],
  async (req, res) => {
    const err = validationResult(req);
    if (!err.isEmpty()) {
      return res.status(400).json({ errors: err.array() });
    }
    try {
      const exEmail = await User.findOne({ email: req.body.email });
      const salt = await bcrypt.genSalt(10);
      const hashPassword = await bcrypt.hash(req.body.password, salt);
      if (!exEmail) {
        await User.create({
          name: req.body.name,
          password: hashPassword,
          email: req.body.email,
          location: req.body.location,
        }).then(res.json({ success: true }));
      } else {
        res.json({ success: "match" });
      }
    } catch (error) {
      console.log(error);
      res.json({ success: false });
    }
  }
);

router.post(
  "/login",
  [body("email").isEmail(), body("password").isLength({ min: 5 })],
  async (req, res) => {
    const err = validationResult(req);
    if (!err.isEmpty()) {
      return res.status(400).json({ errors: err.array() });
    }
    try {
      const email = await User.findOne({
        email: req.body.email,
      });
      const passwordCompare = await bcrypt.compare(
        req.body.password,
        email.password
      );

      const body = {
        id: email._id,
      };

      const authToken = jwt.sign(body, signature);

      if (email.email === req.body.email && passwordCompare) {
        res.json({ success: true, authToken: authToken });
      } else {
        return res.status(400).json({ errors: err.array() });
      }
    } catch (error) {
      console.log(error);
      res.json({ success: false });
    }
  }
);

module.exports = router;

const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { body, validationResult } = require("express-validator");
const JWT_SECRETE = "ayminisagoodgir@l";

const User = require('../models/Signup');

// Signup route
router.post(
  "/createuser",
  [
    body("username", "Enter a valid username").isLength({ min: 3 }),
    body("email", "Enter a valid  email").isEmail(),
    body("password")
      .isLength({ min: 5 })
      .withMessage("Enter atleast 5 charater long password"),

  ],
  async (req, res) => {
    let success = false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success, errors: errors.array() });
    }

    try {
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        return res
          .status(400)
          .json({ success, error: "User with this Email already exists" });
      }

      /*..........CREATING NEW USER..........*/
      const salt = await bcrypt.genSalt(10);
      const securePasssword = await bcrypt.hash(req.body.password, salt);
      user = await User.create({
        username: req.body.username,
        email: req.body.email,
        password: securePasssword,

      });

      /*For returning token to user for the same user who wants to login second time.*/
      const data = {
        user: {
          id: user.id,
        },
      };
      const authToken = jwt.sign(data, JWT_SECRETE);
      success = true;
      res.json({ success, authToken });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error");
    }
  }
);

//login route

router.post(
  "/login",
  [
    body("email", "Enter a valid  email").isEmail(),
    body("password", "Password cannot be blank").exists(),
  ],
  async (req, res) => {
    let success = false;
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;
    try {
      let user = await User.findOne({ email });
      if (!user) {
        success = false;
        return res
          .status(400)
          .json({ error: "Enter your correct credentials" });
      }
      const passwordCompare = await bcrypt.compare(password, user.password);
      if (!passwordCompare) {
        return res.status(400).json({ success, error: "Password not match." });
      }
      const data = {
        user: {
          id: user.id,
        },
      };
      const authToken = jwt.sign(data, JWT_SECRETE, { expiresIn: "1d" }); //token expire after 1day

      /*............For logout functionality............ */
      let oldTokens = user.authTokens || []; //if there is token then assign otherwise return empty array.
      if (oldTokens.length) {
        oldTokens = oldTokens.filter((t) => {
          const timeDiff = (Date.now() - parseInt(t.signedAt)) / 1000;
          if (timeDiff < 86400) {
            return t;
          }
        });
      }
      await User.findByIdAndUpdate(user.id, {
        authTokens: [
          ...oldTokens,
          { authToken, signedAt: Date.now().toString() },
        ],
      });

      success = true;
      const userInfo = {
        name: user.username,
        email: user.email,
        password: user.password,

      };
      res.json({ success, user: userInfo, authToken });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error");
    }
  }
);


module.exports = router;

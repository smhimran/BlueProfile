import express from "express";
import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// importing models
import User from "../models/user";

const router = express.Router();

router.post("/login", (req, res, next) => {
  User.find({ email: req.body.email })
    .exec()
    .then((user) => {
      if (user.length < 1) {
        res.status(401).json({ message: "Authentication failed!" });
      } else {
        bcrypt.compare(req.body.password, user[0].password, (err, result) => {
          if (err) {
            res.status(401).json({ message: "Authentication failed!" });
          } else {
            if (result) {
              const token = jwt.sign(
                {
                  email: user[0].email,
                  userId: user[0]._id,
                },
                process.env.JWT_KEY,
                {
                  expiresIn: "1h",
                }
              );
              res.status(200).json({
                message: "Auth Successful!",
                token: token,
              });
            } else {
              res.status(401).json({ message: "Authentication failed!" });
            }
          }
        });
      }
    })
    .catch((error) => {
      res.status(500).json({ error: error });
    });
});

router.post("/signup", (req, res, next) => {
  User.find({
    $or: [{ email: req.body.email }, { vjudgeID: req.body.vjudgeID }],
  })
    .exec()
    .then((user) => {
      if (user.length >= 1) {
        res.status(409).json({
          message: "An user with the Email or VjudgeID already exists!",
        });
      } else {
        bcrypt.hash(req.body.password, 10, (err, hash) => {
          if (err) {
            res.status(500).json({ error: err });
          } else {
            const user = new User({
              _id: new mongoose.Types.ObjectId(),
              name: req.body.name,
              email: req.body.email,
              vjudgeID: req.body.vjudgeID,
              password: hash,
            });

            user
              .save()
              .then((result) =>
                res.status(201).json({
                  _id: result.id,
                  name: result.name,
                  email: result.email,
                  vjudgeID: result.vjudgeID,
                })
              )
              .catch((error) => res.status(500).json({ error: error }));
          }
        });
      }
    });
});

export default router;

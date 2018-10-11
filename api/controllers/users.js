const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const MongoClient = require('mongodb').MongoClient
const url = "mongodb://localhost:27017/test"

exports.user_login = (req, res, next) => {
    MongoClient.connect(url,function (err , db){
        db.collection('test').find({email:req.body.email})
        .exec()
        .then(user => {
            if (user.length < 1) {
              return res.status(401).json({
                message: "Auth failed"
              });
            }
            bcrypt.compare(req.body.password, user[0].password, (err, result) => {
            if (err) {
                return res.status(401).json({
                  message: "Auth failed"
                });
              }
            if (result) {
            const token = jwt.sign(
                {
                    email: user[0].email,
                    userId: user[0]._id
                },
                process.env.JWT_KEY,
                {
                expiresIn: "1h"
                }
                );
                return res.status(200).json({
                    message: "Auth successful",
                    token: token
                });
              }
                res.status(401).json({
                    message: "Auth failed"
              });
            });
          })
          .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
    });
};
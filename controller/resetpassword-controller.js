const User = require("../model/model_user");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const { response } = require("express");
dotenv.config({ path: "config.env" });
//Topic create
async function forgetPassword(req, res) {
  try {
    const user = await User.findOne({ username: req.body.username });
    console.log(user)
    if (user) {
      const result = req.body.email === user.email;
      if (result) {
        res.status(200).json(user);
      } else {
       res.status(400).json({ error: "This Email is not registerd with this username" });
       }
    } else {
      res.status(400).json({ error: "User doesn't exist" });
    }
}
catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
}

async function ResetPassword(req, res) {
    try {
        const {id}= req.params;       
        console.log(id)
     await User.findByIdAndUpdate(id, req.body);
        const updatedPost = await User.findById(id);
        res.status(200).json({message: updatedPost});
        }
        
    catch (error) {
      console.log(error.message);
      res.status(500).json({ message: error.message });
    }
}
module.exports = {
    forgetPassword,
    ResetPassword
}
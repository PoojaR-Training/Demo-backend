const User = require("../model/model_user");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const { response } = require("express");
const nodemailer = require("nodemailer");
const bcrypt = require("bcrypt");
dotenv.config({ path: "config.env" });
let num;
async function forgetPassword(req, res) {
  try {
    const user = await User.findOne({ username: req.body.username });
    console.log(user);
    if (user) {
      const result = req.body.email === user.email;
      if (result) {
        let testAccount = await nodemailer.createTestAccount();
        let otp = Math.floor(100000+Math.random()*900000);
        let transporter = nodemailer.createTransport({
          host: "smtp.ethereal.email",
          port: 587,
          auth: {
            user: 'jessie.bogan25@ethereal.email',
            pass: 'ddNrZ933AmSmH7yAgA'
        }
        });
        let info = await transporter.sendMail({
          from: '"Pooja Ranpara" <pooja@gmail.com>', // sender address
          to: "poojajranpara15@gmail.com", // list of receivers
          subject: "Otp Verification", // Subject line
          text: `Your OTP to Reset password is ${otp}`, // plain text body
        });
      
        console.log(info);
        res.json(otp);
      
      } else {
        res
          .status(400)
          .json({ error: "This Email is not registerd with this username" });
      }
    } else {
      res.status(400).json({ error: "User doesn't exist" });
    }
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
}
async function verifyotp(req, res){
  try {
   const {otp_origin} = req.params
   const {code}=req.body
    console.log(otp_origin,'valid')
    console.log(code,'body')
    if(otp_origin=== code){
      res.status(200).json({ message: 'success' });
    }
    else{
      res.status(500).json({ error: 'Invalid otp' });
    }
  }
  catch (error) {
    console.log(error.message);
    res.status(500).json({ error: error.message });
  }
}
async function ResetPassword(req, res) {
  try {
    const { id } = req.params;
    console.log(id);
    console.log(req.body);
    const {  password,confirmPassword} = req.body;
    
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);
    await User.findByIdAndUpdate(id,{password :hashedPassword,confirmPassword :hashedPassword});
    const updatedPost = await User.findById(id);
    res.status(200).json({ message: updatedPost });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
}
module.exports = {
  forgetPassword,
  ResetPassword,
  verifyotp
};

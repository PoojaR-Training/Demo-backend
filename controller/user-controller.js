const req = require("express/lib/request");
const User = require("../model/model_user");
const jwt = require("jsonwebtoken");
const cloudinary = require("cloudinary").v2;
const bcrypt = require("bcrypt");
cloudinary.config({
  cloud_name: "dn1p21zgh",
  api_key: "384833787236885",
  api_secret: "cn-pl1rrfD0exF4biU9ykFOcDi4",
});
//User Register and Login
async function userRegister(req, res) {
  try {
    console.log(req.body);
    const { username, password, email, contact, confirmPassword } = req.body;

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    const register = await User.create({
      username,
      password: hashedPassword,
      confirmPassword: hashedPassword,
      email,
      contact,
    });
    res.status(200).json(register);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: error.message });
  }
}
async function userbyid(req, res) {
  try {
    const { id } = req.params;
    const user = User.findById(id);
    if (!user) {
      return res.status(404).json({ message: `cannot find any user` });
    } else {
      res.status(200).json(user);
    }
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: error.message });
  }
}

async function userImageUpload(req, res) {
  try {
    console.log("Uploading...");
    if (!req.file) {
      console.log("no file to upload", req.file);
      res.status(500).send({ error: "Error" });
    } else {
      console.log("else", req.file);

      const id = req.params.id;
      const image = req.file.path;
      console.log(image);
      const profileImageResult = await cloudinary.uploader.upload(image);
      const profileImageUrl = profileImageResult.secure_url;
      await User.updateOne({ _id: id }, { $set: { image: profileImageUrl } });
      res.status(200).send({ success: "Success" });
    }
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: error.message });
  }
}
async function getUserById(req, res) {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: `cannot find any user` });
    } else {
      res.status(200).json(user);
    }
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: error.message });
  }
}

async function userLogin(req, res) {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username });
    if (user) {
      const passwordMatch = await bcrypt.compare(password, user.password);
      if (passwordMatch) {
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
        res.status(200).json({ token, user });
      } else {
        res.status(400).json({ error: "Password doesn't match" });
      }
    } else {
      res.status(400).json({ error: "User doesn't exist" });
    }
  } catch (error) {
    res.status(500).json({ error });
  }
}

module.exports = {
  userLogin,
  userRegister,
  getUserById,
  userImageUpload,
};

const http = require("http");
const express = require("express");
const userRouter = require("./router/user_router");
const forgotRouter = require("./router/foreget-password_router");
const propertyRouter = require("./router/property_router");
const authToken = require("./middleware/auth");
const app = express();
const dotenv = require("dotenv");
dotenv.config({ path: "config.env" });
const port = process.env.PORT || 8000;

const connectDB = require("./database/connection");
connectDB();

app.use(express.json());

app.use("/users", userRouter);
app.use("/forgot",forgotRouter);
app.use("/property", propertyRouter);

//app.put('/users/image',upload.single('image'),(req, res) =>{})
const server = http.createServer(app);
server.listen(port);
console.log("My node.js web server is live");

const express = require('express');
const { signupUser, loginUser } = require('../Controllers/User.controller');
const UserRouter = express.Router();
UserRouter.use(express.json());

UserRouter.get("/");
UserRouter.post("/signup", signupUser);
UserRouter.post("/login", loginUser);


module.exports = { UserRouter };
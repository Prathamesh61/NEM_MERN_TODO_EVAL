const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { User } = require('../models/User.model');
require('dotenv').config();

const signupUser = async (req, res) => {
    const { email, password } = req.body;
    const ip = req.connection.remoteAddress;
    const isUSer = await User.findOne({ email });
    if (isUSer) {
        res.send({ msg: "USer Alredy exists,try Logging in" });
    } else {
        bcrypt.hash(password, 6, async (err, hash) => {
            let new_user = new User({
                email,
                password: hash,
                IP: ip
            })
            try {
                await new_user.save();
                res.send({ msg: "Sign up Successfully" });
            } catch (err) {
                res.send({ msg: "Something went Wrong ,Please try again later" })
            }
        })
    }
}

const loginUser = async (req, res) => {
    const { email, password } = req.body;
    console.log(email, password);
    let user = await User.findOne({ email });
    let hash = user.password;
    const user_id = user._id;
    bcrypt.compare(password, hash, async (err, result) => {
        if (err) {
            res.send({ msg: "Something went Wrong ,Please try again later" });
        }
        if (result) {
            const token = jwt.sign({ user_id }, process.env.SECRET_KEY);
            res.send({ msg: "Login Successsfull", token: token })
        } else {
            res.send({ msg: "Login Failed" })
        }
    })
}

module.exports = { signupUser, loginUser };
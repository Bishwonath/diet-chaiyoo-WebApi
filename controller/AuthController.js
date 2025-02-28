const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const SECRET_KEY = "4fb876242331584a793776ad67394d0ee00290f140fd9ab047456d54fdff0bd1";
const Credential = require("../model/credential")
const user = require('../model/user')


const register = async (req, res) => {
    try {
        const { username, password, role } = req.body;
        console.log(req.body)

        // Validate input
        if (!password) {
            return res.status(400).json({ error: "Password is required" });
        }

        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(password, salt);

        // Save user details
        const userData = { ...req.body, password: hashedPassword };
        console.log(user)
        const newuser = new user(userData);
        await newuser.save();

        // Save credentials separately
        // const cred = new Credential({ username, password: hashedPassword, role });
        // await cred.save();

        res.status(201);
    } catch (error) {
        console.error("Registration Error:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};



const login = async (req, res) => {
    try {
        console.log("Received login request:", req.body);
        
        const { username, password } = req.body;
        const cred = await user.findOne({ username });

        if (!cred) {
            console.log("User not found");
            return res.status(403).json({ error: 'Invalid username or password' });
        }

        console.log("Stored Hashed Password:", cred.password);
        
        const isMatch = await bcrypt.compare(password, cred.password);
        console.log("Password Match Result:", isMatch);
        
        if (!isMatch) {
            console.log("Password mismatch");
            return res.status(403).json({ error: 'Invalid username or password' });
        }

        const token = jwt.sign(
            { username: cred.username, role: cred.role },
            SECRET_KEY,
            { expiresIn: '1h' }
        );

        res.status(200).json({ token, message: "Login successful" });
    } catch (error) {
        console.error("Login Error:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};


module.exports = {
    login,
    register
}


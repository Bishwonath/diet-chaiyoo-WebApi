const User = require("../model/user");
const nodemailer=require("nodemailer");

const findall = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
};

const save = async (req, res) => {
    try {
        const user = new User(req.body);
        await user.save();
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
};

const findById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        res.status(200).json(user);
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
};

const deleteById = async (req, res) => {
    try {
        await User.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: "Data deleted successfully" });
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
};

const update = async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json(user);
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
};

module.exports = {
    findall,
    save,
    findById,
    deleteById,
    update,
};

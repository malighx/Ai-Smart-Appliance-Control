// controllers/applianceController.js
const Appliance = require('../models/Appliance');

exports.getAppliances = async (req, res) => {
    try {
        const appliances = await Appliance.find();
        res.json(appliances);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.addAppliance = async (req, res) => {
    const { name, status, userId } = req.body;
    try {
        const newAppliance = new Appliance({ name, status, userId });
        await newAppliance.save();
        res.status(201).json(newAppliance);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.updateStatus = async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;
    try {
        const updated = await Appliance.findByIdAndUpdate(id, { status }, { new: true });
        res.json(updated);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

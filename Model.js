// models/Appliance.js
const mongoose = require('mongoose');

const applianceSchema = new mongoose.Schema({
    name: { type: String, required: true },
    status: { type: Boolean, default: false }, // on/off
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Appliance', applianceSchema);

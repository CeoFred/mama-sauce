const mongoose = require('mongoose');

const AdminSchema = new mongoose.Schema({

}, { timestamps: true });

const Admin = mongoose.model('Admin', AdminSchema);

module.exports = Admin;

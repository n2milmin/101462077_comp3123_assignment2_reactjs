const mongoose = require('mongoose');

const empSchema = mongoose.Schema({
    first_name: { type: String, required: true},
    last_name: { type: String, required: true},
    email: { type: String, required: true, unique: true},
    position: { type: String, required: true},
    salary: { type: Number, required: true},
    date_of_joining: { type: Date, required: true},
    department: { type: String, required: true},
    created_at: Date,
    updated_at: { type: Date, default: Date.now}
}, { 
    versionKey: false 
});

module.exports = mongoose.model("Employee", empSchema)
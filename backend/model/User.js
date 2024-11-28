const mongoose = require('mongoose');
const { hash } = require('bcrypt');

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, index: {unique: true}},
    email: { type: String, required: true},
    password: { type: String, required: true}, //hashed 
    created_at: Date,
    updated_at: { type: Date, default: Date.now()}
});

userSchema.pre('save', async function(next) {
    const hashedPassword = await hash(this.password, 10)
    this.password = hashedPassword
    next()
})

module.exports = mongoose.model("User", userSchema)
const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: {
        type:String,
        required:[true,'Enter name']
    }
});

module.exports = mongoose.model("Bootcamp",UserSchema);
const mongoose = require('mongoose')
const { v4: uuidv4 } = require('uuid');

const secretSchema = new mongoose.Schema({
    uuid : {
        type: String,
        required : true,
        default: () => uuidv4()
    },
    name : {
        type: String,
        required: true,
    },
    expireAfter : {
        type: Number,
        required: true,
        default: 0
    }
}, {timestamps: true})

module.exports = mongoose.model('secrets', secretSchema);
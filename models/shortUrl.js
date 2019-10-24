const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// const autoIncrement = require('mongoose-auto-increment');
//autoIncrement.initialize();

const urlSchema = new Schema({
    original_url: String, 
    short_url: {
        type: Number,
        required: true,
       default: 0

    }
}, {timestamps: true});


const ShortUrl = mongoose.model('ShortUrl', urlSchema);


module.exports = ShortUrl;
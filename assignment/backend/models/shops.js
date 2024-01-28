const mongoose = require('mongoose');
const { Schema } = mongoose;

// This contains the Schema of the database of Shops.

const ShopsSchema = new Schema({
    name:{
        type: String,
        required: true
    },
    contact_no:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    }
});

module.exports = mongoose.model('user',ShopsSchema)
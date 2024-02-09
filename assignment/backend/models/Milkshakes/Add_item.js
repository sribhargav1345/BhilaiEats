const mongoose = require('mongoose');
const { Schema } = mongoose;

// This contains the Schema of the database of User.

const Add_milkshakeSchema = new Schema({
    categoryname:{
        type: String,
        required: true
    },
    name:{
        type: String,
        required: true
    },
    image:{
        type: String,
        required: true
    },
    options:{
        type: Array,
        required: true
    }
});

module.exports = mongoose.model('Add_item',Add_milkshakeSchema)
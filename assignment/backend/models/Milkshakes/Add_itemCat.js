const mongoose = require('mongoose');
const { Schema } = mongoose;

const Add_milkshakeCatSchema = new Schema({
    categoryname:{
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Add_itemCat',Add_milkshakeCatSchema)
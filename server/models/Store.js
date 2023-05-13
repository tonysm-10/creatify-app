const { Schema, model } = require('mongoose');
const Schema = mongoose.Schema;

const storeSchema = new Schema({
    
    storeName:{
        type: String,
        required: true,
    },
    colorBackground:{
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: [/.+@.+\..+/, 'Must match an email address!'],
    },
    phoneNumber: {
        type: Int,
        required: true,
    },
    storeLogo:{
        type: String,
        required: false,
    },
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
});


const Store = model('Store', storeSchema);

module.exports = Store;
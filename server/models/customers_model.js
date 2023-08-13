const mongoose = require('mongoose');



const customers = new mongoose.Schema({
    customerSno: {
        type: Number,
        required: true,
    },
    customerName: {
        type: String,
        required: true,
        maxLength: 25,
    },
    customerMobile: {
        type: String,
        required: true,
    },
    customerEmail: {
        type: String,
        required: true,
    }
})




module.exports = mongoose.model('customers', customers);
const mongoose = require('mongoose');
const customerSchema = new mongoose.Schema({
    name:{
        type : String,
    },

    balance:{
        type: Number,    
    
    },

    accountNumber:{
               type: Number,
        
    }
})

const customer=mongoose.model('customer',customerSchema);
module.exports = customer;
const customers = require('./models/customers');
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/banking', {useNewUrlParser: true, useUnifiedTopology: true})
  .then(()=>{
    console.log(" mongodb connected");
})
 .catch(err=>{
    console.log( " mongodb error");
    console.log(err);
})
    const c = new customers({
    name : 'malli',
    accountNumber : 19117096,
    balance : 200000,
})
    ///c.save().then( c => {
   /// console.log(c)
//})
  //  .catch(e => {
  ///  console.log(e);
//})




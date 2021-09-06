const express = require('express');
const app= express();
app.use("/public" ,express.static('public'));
const path = require('path'); 
const ejsMate= require('ejs-mate');
const mongoose = require('mongoose');
const customers = require('./models/customers');
const methodoverride = require('method-override');


const db = process.env.MONGODB_URL ||"mongodb+srv://<ARJUNA>:<Arjun%403015>@cluster0.7wlqd.mongodb.net/banking?retryWrites=true&w=majority"


mongoose.connect(db,{
   useNewUrlParser:true,
   useUnifiedTopology:true

})
  .then(()=>{
   console.log(" mongo connected");
})
 .catch(err=>{
   console.log( " mongo error");
   console.log(err);
})
app.engine('ejs',ejsMate);
app.set('views',path.join(__dirname,'views'));
app.set('view engine','ejs');

app.use(express.urlencoded({extended:true}))
app.use(methodoverride('_method'));




app.get('/customers', async (req,res) => {
   const customer =await  customers.find({});
   res.render('index',{customer});
})

app.get('/customers/transfer', async (req,res) => {
   const customer =await  customers.find({});
   res.render('transfer',{customer});
})
app.get('/customers/:id/transferform', async (req,res) => {
   const { id } = req.params;
   const customer = await customers.findById(id);
   res.render('transferform',{customer});
})
app.get('/customers/new', async (req,res) => {
   const customer = await customers.find({});
   res.render('new',{customer});
})
 
app.get('/customers/:id', async (req,res) => {
    const { id } = req.params;
    const customer = await customers.findById(id);
    res.render('show',{customer})
})
 
   app.post('/customers', async (req,res) => {
       const newcustomer= new customers(req.body);
       await newcustomer.save();
       setTimeout(()=>{  res.redirect(`/customers/${newcustomer._id}`);},2000) ;
    //   res.redirect(`/customers/${newcustomer._id}`);


 })
 
   app.put('/customers/:id/newbalance', async (req,res) => {
       const { id } = req.params;
       const customerr = await customers.findById(id);
      const newbal = customerr.balance + (+req.body.amount);
      const customer = await customers.findByIdAndUpdate(id,{balance : newbal},{runValidators:true});
      setTimeout(()=>{  res.redirect(`/customers/${customer._id}`);},2000) ;
      //res.redirect(`/customers/${customer._id}`)
     })


 app.put('/customers/:id', async (req,res) => {
    const { id } = req.params;
   const customer = await customers.findByIdAndUpdate(id,req.body,{runValidators:true});
  // res.redirect(`/customers/${customer._id}`)
   setTimeout(()=>{  res.redirect(`/customers/${customer._id}`);},2000) ;
 })

 app.get('/customers/:id/edit', async (req,res) => {
   const { id } = req.params;
   const customer = await customers.findById(id);
   res.render('edit',{customer});
})

app.delete('/customers/:id', async (req,res) => {
   const { id } = req.params;
   const customer = await customers.findByIdAndDelete(id);
   res.redirect('/customers');
  })

  
  

 app.listen(3000||process.env.port)

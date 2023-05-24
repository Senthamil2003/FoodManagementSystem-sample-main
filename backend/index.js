const express = require("express");
const dispatchRtr = require('./routes/dispatch');
const app = express();
const mysql = require("mysql2");
const cors = require("cors");
let bodyParser = require('body-parser');
const catRtr = require('./routes/catogery');
const aveRtr= require('./routes/average');
const itemBigRtr= require('./routes/itemwiseBig');
const monthlyRtr= require('./routes/monthly');
const itmRtr= require('./routes/item');
const purchaseRtr = require('./routes/purchase');
const db = require('./database');

app.use(cors());
app.use(express.json());



app.use(bodyParser.urlencoded({ extended: true }));

app.use('/dispatch',dispatchRtr);

app.get('/catg',(req,res)=>{
    db.query("SELECT * FROM category",(err,result)=>{
        if(err){
            console.log(err);
        }else{
            res.send(result);
            
        }
    })
})

app.get('/ven',(req,res)=>{
    db.query("SELECT * FROM vendor",(err,result)=>{
        if(err){
            console.log(err);
        }else{
            res.send(result);
            
        }
    })
})
app.get('/stock',(req,res)=>{
    db.query("SELECT * FROM current",(err,result)=>{
        if(err){
            console.log(err);
        }else{
            res.send(result);
            
        }
    })
})
app.post('/itemsd',(req,res)=>{
    const c = req.body.c;
    db.query("SELECT * FROM category where category=?",[c],(err,result)=>{
        if(err){
            console.log(err);
        }else{
            res.send(result);
            
        }
    })
})
app.post("/itms",(req,rse)=>{
    const cat = req.body.cat;
    const items = req.body.items;

    db.query("Insert into category (item,category) values (?,?)",[items,cat],(err,res)=>{
        if(err){
            console.log(err)
        }else{
            console.log("inserted")
        }
    })
})
app.post("/vendors",(req,rse)=>{
    const cat = req.body.cat;
    const items = req.body.items;

    db.query("Insert into vendor (vendorName,category) values (?,?)",[items,cat],(err,res)=>{
        if(err){
            console.log(err)
        }else{
            console.log("inserted")
        }
    })
})
app.put("/updt",(req,rse)=>{
    const cat = req.body.cat;
    const items = req.body.items;

    db.query("Update  category set cat = ? where item = ?",[cat,items],(err,res)=>{
        if(err){
            console.log(err)
        }else{
            console.log("inserted")
        }
    })
})
app.post("/delete", (req, res) => {
    const cat = req.body.cat;
    db.query("DELETE FROM category WHERE item = ?",[cat],(err, result) => {
      if (err) {
        console.log(err);
      } else {
        console.log(result);
      }
    });
  });
  app.post("/edit", (req, res) => {
    const edit = req.body.edit;
    const i = req.body.i;
    console.log(edit,i);
    db.query("Update category set item = ? where item = ?;",[edit,i],(err, result) => {
      if (err) {
        console.log(err);
      } else {
        console.log(result);
      }
    });
  });
  app.post("/ed", (req, res) => {
    const it = req.body.it;
    const ven = req.body.ven;
    const chg = req.body.chg;
    
    db.query("Update vendor set vendorName = ? where vendorName = ?;",[ven,chg],(err, result) => {
      if (err) {
        console.log(err);
      } else {
        console.log(result);
      }
    });
  });
  app.post("/dele", (req, res) => {
    const cat = req.body.cat;
    db.query("DELETE FROM vendor WHERE vendorName = ?",[cat],(err, result) => {
      if (err) {
        console.log(err);
      } else {
        console.log(result);
      }
    });
  });
app.use('/disp',catRtr);
app.use('/average',aveRtr);
app.use('/monthly',itemBigRtr);
app.use('/item',itmRtr);
app.use('/purchase',purchaseRtr);
app.use('/monthly',monthlyRtr)

app.listen(3002,()=>{
    console.log("You r up!!!");
})
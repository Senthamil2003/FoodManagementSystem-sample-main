const express = require('express');
const db = require('../database');
let bodyParser = require('body-parser');

const router = express.Router();

router.get('/report', async(req,res)=>{
    
    lp=[]
    // let items = await db.promise().query(`select * from purchase where date>='${req.query.fdate}' and date<='${req.query.tdate}'`);
      let items = await db.promise().query(`select item ,sum(quantity) as quantity ,sum(amount) as amount from purchase where date>='${req.query.fdate}' and date <='${req.query.tdate}' group by item;`);

    items=items[0]
    console.log(items)
    // for(let i=0;i<items.length;i++){
    //     fin={}
    //     fin["item"]=items[i].item
    //     let a = await db.promise().query(`select * from purchase where date>='${req.query.fdate}' and date<='${req.query.tdate}' and item='${items[i].item}'`);
    //     let m=0
    //     let p=0
    //     let u=0
    //     let v=0
    //     let w=0
    //     let x=0
    //     a=a[0]
    // //   console.log(a)
    //     for(let j=0;j<a.length;j++){
    //         m+=a[j].quantity
    //         p+=a[j].amount
    //         u=a[j].amountkg
    //         v=a[j].quantity 
    //         w+=(u*v)
    //         x+=v
    //     }
    //     d=0
    //     d=w/x
    //     fin["quantity"]=m
    //     fin["amount"]=p
    //     fin["average"]=d
    //     lp.push(fin)
         

    // }
    
    await res.status(200).send(items);

});

module.exports = router;
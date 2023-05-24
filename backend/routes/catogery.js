const express = require('express');
const db = require('../database');
let bodyParser = require('body-parser');

const router = express.Router();

router.get('/result', async(req,res)=>{

//     let result= await db.promise().query(`SELECT a.category,a.quantity,
//        COALESCE(b.sum_RMK, 0) as sum_RMK,
//        COALESCE(b.sum_RMD, 0) as sum_RMD,
//        COALESCE(b.sum_RMKCET, 0) as sum_RMKCET,
//        COALESCE(b.sum_RMKSCHOOL, 0) as sum_RMKSCHOOL
// FROM (
//   SELECT category, sum(quantity) as quantity
//   FROM purchase
//   WHERE date between '${req.query.fdate}' and '${req.query.tdate}' 
//   GROUP BY category
// ) AS a
// LEFT JOIN (
//   SELECT category, sum(RMK) as sum_RMK,
//          sum(RMD) as sum_RMD,
//          sum(RMKCET) as sum_RMKCET,
//          sum(RMKSCHOOL) as sum_RMKSCHOOL
//   FROM dispatch1
//   WHERE date between '${req.query.fdate}' and '${req.query.tdate}' 
//   GROUP BY category
// ) AS b
// ON a.category = b.category;`);

  let result = await db.promise().query(`SELECT c.category as category,
  SUM(p.amount) AS purchase_amount,
  COALESCE(SUM(d.RMK * p.rate), 0) AS RMK_amount,
  COALESCE(SUM(d.RMD * p.rate), 0) AS RMD_amount,
  COALESCE(SUM(d.RMKSCHOOL * p.rate), 0) AS RMKSCHOOL_amount,
  COALESCE(SUM(d.RMKCET * p.rate), 0) AS RMKCET_amount,
  (COALESCE(SUM(d.RMK * p.rate), 0) + COALESCE(SUM(d.RMD * p.rate), 0) + COALESCE(SUM(d.RMKSCHOOL * p.rate), 0) + COALESCE(SUM(d.RMKCET * p.rate), 0)) AS total_amount
FROM (
SELECT item, 
   
    SUM(quantity) AS quantity, 
    SUM(amount) AS amount,
    SUM(amount) / SUM(quantity) AS rate
FROM purchase
WHERE date BETWEEN '${req.query.fdate}' AND '${req.query.tdate}'
GROUP BY item
) AS p
LEFT JOIN (
SELECT item,
    SUM(RMK) AS RMK,
    SUM(RMD) AS RMD,
    SUM(RMKSCHOOL) AS RMKSCHOOL,
    SUM(RMKCET) AS RMKCET
FROM dispatch1
WHERE date BETWEEN '${req.query.fdate}' AND '${req.query.tdate}'
GROUP BY item
) AS d ON p.item = d.item
JOIN category c ON p.item = c.item
GROUP BY c.category`)


   // let lst=[[],[]]
   // TotPa=0;
   // TotDa=0;
   // let items = await db.promise().query(`select distinct(category) from purchase where date>='${req.query.fdate}' and date<='${req.query.tdate}'`);
   // items=items[0]
   //  for(let i=0;i<items.length;i++){
   //      fin={}
   //      fin['cat']=items[i].category
   //      let a = await db.promise().query(`select * from purchase where date>='${req.query.fdate}' and date<='${req.query.tdate}' and category='${items[i].category}' `);
   //      a=a[0]

   //      let val=0
   //      let purchasedQuantity=0
   //      let purchasedAmount=0
   //      for(let j=0;j<a.length;j++){
   //          val+=a[j].quantity;
   //          purchasedQuantity+=a[j].quantity;
   //          purchasedAmount+=a[j].amount
 
   //      }
        
   //      fin['purchasedAmount']=purchasedAmount.toFixed(2)
   //      TotPa+=Number(purchasedAmount.toFixed(2))
   //      let rate=(purchasedAmount/purchasedQuantity);
   //      let b = await db.promise().query(`select distinct(item) from purchase where date>='${req.query.fdate}' and date<='${req.query.tdate}' and category='${items[i].category}' `);
   //      let dispatchedQuantity=0
       
   //      b=b[0]
   //      // console.log(b)
   //      let c = await db.promise().query(`select sum(RMK+RMD+RMKCET+RMKSCHOOL) as quantity from dispatch1 where date>='${req.query.fdate}' and date<='${req.query.tdate}' group by category`);

   //      for(let k=0;k<b.length;k++){
   //          c=c[0]
            
   //          for(p=0;p<c.length;p++){
   //              dispatchedQuantity+=c[p].quantity;
   //          }

   //      }
   //      fin['dispatchedQuantity']=(dispatchedQuantity*rate).toFixed(2)
   //      let m=(dispatchedQuantity*rate)
   //      TotDa+=Number(m.toFixed(2))
   //      await lst[0].push(fin)
            
   //  }
   //  lst[1].push(TotPa.toFixed(2))
   //  lst[1].push(TotDa.toFixed(2))
    
 
    await res.status(200).send(result[0]);

});

module.exports = router;
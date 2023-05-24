const express = require('express');
const db = require('../database');
let bodyParser = require('body-parser');

const router = express.Router();

router.get('/monthlyReport', async(req,res)=>{
     
    
  var f= req.query.fdate
  var t=req.query.tdate
  console.log(f)
    let result= await db.promise().query(`SELECT c.item, 
      COALESCE(SUM(CASE WHEN MONTH(p_sub.date) = 1 THEN p_sub.quantity ELSE 0 END), 0) as "Jan_Quantity",
      COALESCE(SUM(CASE WHEN MONTH(p_sub.date) = 1 THEN p_sub.amount ELSE 0 END), 0) as "Jan_Amount",
      COALESCE(SUM(CASE WHEN MONTH(p_sub.date) = 2 THEN p_sub.quantity ELSE 0 END), 0) as "Feb_Quantity",
      COALESCE(SUM(CASE WHEN MONTH(p_sub.date) = 2 THEN p_sub.amount ELSE 0 END), 0) as "Feb_Amount",
      COALESCE(SUM(CASE WHEN MONTH(p_sub.date) = 3 THEN p_sub.quantity ELSE 0 END), 0) as "Mar_Quantity",
      COALESCE(SUM(CASE WHEN MONTH(p_sub.date) = 3 THEN p_sub.amount ELSE 0 END), 0) as "Mar_Amount",
      COALESCE(SUM(CASE WHEN MONTH(p_sub.date) = 4 THEN p_sub.quantity ELSE 0 END), 0) as "Apr_Quantity",
      COALESCE(SUM(CASE WHEN MONTH(p_sub.date) = 4 THEN p_sub.amount ELSE 0 END), 0) as "Apr_Amount",
      COALESCE(SUM(CASE WHEN MONTH(p_sub.date) = 5 THEN p_sub.quantity ELSE 0 END), 0) as "May_Quantity",
      COALESCE(SUM(CASE WHEN MONTH(p_sub.date) = 5 THEN p_sub.amount ELSE 0 END), 0) as "May_Amount",
      COALESCE(SUM(CASE WHEN MONTH(p_sub.date) = 6 THEN p_sub.quantity ELSE 0 END), 0) as "Jun_Quantity",
      COALESCE(SUM(CASE WHEN MONTH(p_sub.date) = 6 THEN p_sub.amount ELSE 0 END), 0) as "Jun_Amount",
      COALESCE(SUM(CASE WHEN MONTH(p_sub.date) = 7 THEN p_sub.quantity ELSE 0 END), 0) as "Jul_Quantity",
      COALESCE(SUM(CASE WHEN MONTH(p_sub.date) = 7 THEN p_sub.amount ELSE 0 END), 0) as "Jul_Amount",
      COALESCE(SUM(CASE WHEN MONTH(p_sub.date) = 8 THEN p_sub.quantity ELSE 0 END), 0) as "Aug_Quantity",
      COALESCE(SUM(CASE WHEN MONTH(p_sub.date) = 8 THEN p_sub.amount ELSE 0 END), 0) as "Aug_Amount",
      COALESCE(SUM(CASE WHEN MONTH(p_sub.date) = 9 THEN p_sub.quantity ELSE 0 END), 0) as "Sep_Quantity",
   COALESCE(SUM(CASE WHEN MONTH(p_sub.date) = 9 THEN p_sub.amount ELSE 0 END), 0) as "Sep_Amount",
   COALESCE(SUM(CASE WHEN MONTH(p_sub.date) = 10 THEN p_sub.quantity ELSE 0 END), 0) as "Oct_Quantity",
   COALESCE(SUM(CASE WHEN MONTH(p_sub.date) = 10 THEN p_sub.amount ELSE 0 END), 0) as "Oct_Amount",
COALESCE(SUM(CASE WHEN MONTH(p_sub.date) = 11 THEN p_sub.quantity ELSE 0 END), 0) as "Nov_Quantity",
   COALESCE(SUM(CASE WHEN MONTH(p_sub.date) = 11 THEN p_sub.amount ELSE 0 END), 0) as "Nov_Amount",
COALESCE(SUM(CASE WHEN MONTH(p_sub.date) = 12 THEN p_sub.quantity ELSE 0 END), 0) as "Dec_Quantity",
   COALESCE(SUM(CASE WHEN MONTH(p_sub.date) = 12 THEN p_sub.amount ELSE 0 END), 0) as "Dec_Amount"
FROM current c
LEFT JOIN (
 SELECT item, date, SUM(quantity) as quantity,SUM(amount) as amount
 FROM purchase
 WHERE date BETWEEN '${f}' AND '${t}'
 GROUP BY item, date
) p_sub ON c.item = p_sub.item
GROUP BY c.item;`);

    // console.log(result[0])  
    res.status(200).send(result[0]);

});

module.exports = router;      
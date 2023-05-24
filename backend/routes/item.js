const express = require('express');
const db = require('../database');
let bodyParser = require('body-parser');
const router = express.Router();

router.get('/hi', async(req,res)=>{
    let lst= []
    
    let result= await db.promise().query(`select p_sub.item, p_sub.quantity as purchaseQuantity,p_sub.amount as purchaseAmount ,COALESCE((SELECT quantity FROM closingstock WHERE date<='${req.query.fdate}' and item=p_sub.item ORDER BY date DESC limit 1),0) as closingStock, COALESCE(d_sub.RMK,0) as RMK,COALESCE(d_sub.RMD,0) as RMD, COALESCE(d_sub.RMKCET,0) as RMKCET, COALESCE(d_sub.RMKSCHOOL,0) as RMKSCHOOL  from (select item,sum(quantity) as quantity, sum(amount) as amount from purchase where date between '${req.query.fdate}' 
    and '${req.query.tdate}' group by item)p_sub left join (select item,sum(RMK) as RMK,sum(RMD) as RMD, sum(RMKCET) as RMKCET, sum(RMKSCHOOL) as RMKSCHOOL from dispatch1 where date between '${req.query.fdate}' 
    and '${req.query.tdate}' group by item)d_sub on p_sub.item=d_sub.item;`);

    console.log(result[0])

    // let items = await db.promise().query(`select distinct(item) from dispatch where date>='${req.query.fdate}' and date<='${req.query.tdate}' order by item`);
    // items=items[0]
    // for(let i=0;i<items.length;i++){
    //     let k=0
    //     fin={}
    //     fin['itemname']=items[i].item;
    //     let a= await db.promise().query(`select * from purchase where date>='${req.query.fdate}' and date<='${req.query.tdate}' and item='${items[i].item}'`);
    //     a=a[0]
    //     let val =0;
    //     let purchasedQuantity = 0;
    //     for(let j=0;j<a.length;j++){
    //         val+= a[j].quantity;
    //         purchasedQuantity +=a[j].quantity
    //     }
    //     fin['purchasedQuantity']=purchasedQuantity;
    //     let rmk="RMK"
    //     let b= await db.promise().query(`select * from dispatch where date>='${req.query.fdate}' and date<='${req.query.tdate}' and place='${rmk}' and item='${items[i].item}'`);
    //     b=b[0]
    //     val=0
    //     for(let i=0;i<b.length;i++){
    //         val+=b[i].quantity;
    //     }
    //     fin["val1"]=val;
    //     k+=val
    //     //RMD
    //     let rmd="RMD"
    //     let c= await db.promise().query(`select * from dispatch where date>='${req.query.fdate}' and date<='${req.query.tdate}' and place='${rmd}' and item='${items[i].item}'`);
    //     c=c[0]
    //     val=0
    //     for(let i=0;i<c.length;i++){
    //         val+=c[i].quantity;
    //     }
    //     fin["val2"]=val;
    //     k+=val
    //     //RMKCET
    //     let rmkcet="RMKCET"
    //     let d= await db.promise().query(`select * from dispatch where date>='${req.query.fdate}' and date<='${req.query.tdate}' and place='${rmkcet}' and item='${items[i].item}'`);
    //     d=d[0]
    //     val=0
    //     for(let i=0;i<d.length;i++){
    //         val+=d[i].quantity;
    //     }
    //     k+=val
    //     fin["val3"]=val;
       
    //     //School
    //     let school="SCHOOL"
    //     let e= await db.promise().query(`select * from dispatch where date>='${req.query.fdate}' and date<='${req.query.tdate}' and place='${school}' and item='${items[i].item}'`);
    //     e=e[0]
    //     val=0
    //     for(let i=0;i<e.length;i++){
    //         val+=e[i].quantity;
    //     }
    //     fin["val4"]=val;
    //     k+=val
    //     fin["tot"]=k
    //     lst.push(fin)

        
        
    // }
    // console.log(lst) 
 
    await res.status(200).send(result[0]);

});

module.exports = router;   
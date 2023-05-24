const express = require('express');
const db = require('../database');
let bodyParser = require('body-parser');

const router = express.Router();

router.get('/report', async(req,res)=>{
     
    
  
    let result= await db.promise().query(`select p_sub.item, p_sub.quantity as purchaseQuantity,p_sub.amount as purchaseAmount ,COALESCE((SELECT quantity FROM closingstock WHERE date<='${req.query.fdate}' and item=p_sub.item ORDER BY date DESC limit 1),0) as closingStock, COALESCE(d_sub.RMK,0) as RMK,COALESCE(d_sub.RMD,0) as RMD, COALESCE(d_sub.RMKCET,0) as RMKCET, COALESCE(d_sub.RMKSCHOOL,0) as RMKSCHOOL  from (select item,sum(quantity) as quantity, sum(amount) as amount from purchase where date between '${req.query.fdate}' 
    and '${req.query.tdate}' group by item)p_sub left join (select item,sum(RMK) as RMK,sum(RMD) as RMD, sum(RMKCET) as RMKCET, sum(RMKSCHOOL) as RMKSCHOOL from dispatch1 where date between '${req.query.fdate}' 
    and '${req.query.tdate}' group by item)d_sub on p_sub.item=d_sub.item;`);

    console.log(result[0])
    
  // let items = await db.promise().query(`select distinct(item),category from dispatch where date>='${req.query.fdate}' and date<='${req.query.tdate}' order by category`);
  // items=items[0]
  // let openingStockQtyTotal = 0;
	// let openingStockAmtTotal = 0;
	// let purchaseQtyTotal = 0;
	// let purchaseRateTotal = 0;
	// let purchaseAmtTotal = 0;
	// let totalQtyTotal = 0;
	// let totalAmtTotal = 0;
	// let rmkQtyTotal = 0;
	// let rmkAmtTotal = 0;
	// let rmdQtyTotal = 0;
	// let rmdAmtTotal = 0;
	// let rmkcetQtyTotal = 0;
	// let rmkcetAmtTotal = 0;
	// let schoolQtyTotal = 0;
	// let schoolAmtTotal = 0;
	// let issuesQtyTotal = 0;
	// let issuesRateTotal = 0;
	// let issuesAmtTotal = 0;
	// let closingStockQtyTotal = 0;
	// let closingStockAmtTotal = 0;
  //   let dispCategory = "";
  //   for(let i=0;i<items.length;i++){
  //       fin={}
  //       let category=items[i].category
  //       if(dispCategory!=category){
  //           dispCategory=category;
  //       }
  //      let dispatchedQuantities = 0;
  //      fin["item"]=items[i].item;
  //      let a = await db.promise().query(`select * from purchase where date>='${req.query.fdate}' and date<='${req.query.tdate}' and item='${items[i].item}' `);
  //      let amountKg = 0;
	//      let quantity = 0;
	//      let totalAmount = 0;
	//      let totalQuantity = 0;
  //      a=a[0]
  //      for(let j=0;j<a.length;j++){
  //       amountKg=a[j].amountkg;
  //       quantity=a[j].quantity
  //       // console.log(a[j])
  //       totalAmount+=(amountKg*quantity)
  //       totalQuantity+=quantity
  //      }
  //      let rate=0;
  //      if(totalQuantity!=0){
  //          rate =totalAmount/totalQuantity;
  //      }
  //   //    console.log(rate)
  //     let b=await db.promise().query(`select * from purchase where date<'${req.query.tdate}' and item='${items[i].item}' `);
  //     let c=await db.promise().query(`select * from dispatch where date<'${req.query.tdate}' and item='${items[i].item}' `);
  //     b=b[0]
  //     c=c[0]
  //     let openingStockPurchased = 0;
	//   let openingStockAmount = 0;
  //     for(let k=0;k<b.length;k++){
  //       openingStockPurchased += b[k].quantity;
  //       openingStockAmount += b[k].amount;
  //     } 
  //     let openingStockRate = 0;
  //     if(openingStockPurchased !=0){
  //       openingStockRate =openingStockAmount / openingStockPurchased;
  //     }
  //     let openingStockDispatched = 0;
  //     for(let p=0;p<c.length;p++){
  //       openingStockDispatched += c[p].quantity;
  //     }
  //     let openingStock =(openingStockPurchased-openingStockDispatched);
  //     if(openingStock <0)
  //     {
  //       openingStock=0;
  //     }
  //     //opening stock
  //     fin['opqty']= openingStock
  //     fin['opamount']=(openingStock*openingStockRate).toFixed(2);
  //     openingStockQtyTotal +=openingStock;
  //     openingStockAmtTotal+= Number((openingStock*openingStockRate).toFixed(2))

  //     let d = await db.promise().query(`select * from purchase where date>='${req.query.fdate}' and date<='${req.query.tdate}' and item='${items[i].item}' `);
  //     d=d[0]
  //     let val = 0;
	//   let purchasedQuantity = 0;
  //     for(let q=0;q<d.length;q++){
  //       val+=d[q].quantity;
  //       purchasedQuantity += d[q].quantity;
  //     }
  //     //purchase
  //    fin['purqty']=purchasedQuantity
  //    fin['purrate']=rate.toFixed(2);
  //    fin['puramt']= (purchasedQuantity *rate).toFixed(2)
  //    purchaseQtyTotal +=purchasedQuantity;
  //    purchaseRateTotal +=Number(rate.toFixed(2))
  //    purchaseAmtTotal += Number((purchasedQuantity *rate).toFixed(2))
  //    //total
  //    fin['totqty']=openingStock+purchasedQuantity
  //    fin['totamt']=((openingStock+purchasedQuantity)*rate).toFixed(2)
  //    totalQtyTotal +=openingStock+purchasedQuantity;
  //    totalAmtTotal += Number(((openingStock+purchasedQuantity)*rate).toFixed(2))
  //    let rmk="RMK"
  //    let e = await db.promise().query(`select * from dispatch where date>='${req.query.fdate}' and date<='${req.query.tdate}' and place='${rmk}' and item='${items[i].item}' `);
  //    e=e[0]               //RMK
  //    let rmkVal=0;
  //    for(let r=0;r<e.length;r++){
  //       rmkVal+=e[r].quantity;
  //    }
  //    fin['rmkqty']=rmkVal;
  //    fin["rmkamt"]= (rmkVal*rate).toFixed(2)
  //    dispatchedQuantities +=rmkVal;
  //    rmkQtyTotal += rmkVal;
  //    rmkAmtTotal+= Number((rmkVal*rate).toFixed(2))
     
  //    let rmd="RMD"
  //    let f = await db.promise().query(`select * from dispatch where date>='${req.query.fdate}' and date<='${req.query.tdate}' and place='${rmd}' and item='${items[i].item}' `);
  //    f=f[0]             //RMD
  //    let rmdVal=0;
  //    for(let s=0;s<f.length;s++){
  //       rmdVal+=f[s].quantity;
  //    }
  //    fin['rmdqty']=rmdVal;
  //    fin["rmdamt"]= (rmdVal*rate).toFixed(2)
  //    dispatchedQuantities +=rmdVal;
  //    rmdQtyTotal += rmdVal;
  //    rmdAmtTotal+= Number((rmdVal*rate).toFixed(2))
    

  //    // RMKCET
  //    let rmkcet="RMKCET"
  //    let g = await db.promise().query(`select * from dispatch where date>='${req.query.fdate}' and date<='${req.query.tdate}' and place='${rmkcet}' and item='${items[i].item}' `);
  //    g=g[0]             
  //    let rmkcetVal=0;
  //    for(let s=0;s<g.length;s++){
      
  //       rmkcetVal+=g[s].quantity;
  //    }
  //    fin['rmkcetqty']=rmkcetVal;
  //    fin["rmkcetamt"]= (rmkcetVal*rate).toFixed(2)
  //    dispatchedQuantities +=rmkcetVal;
  //    rmkcetQtyTotal += rmkcetVal;
  //    rmkcetAmtTotal+= Number((rmkcetVal*rate).toFixed(2))
  //     //school
  //     let aschool="SCHOOL"
  //    let h = await db.promise().query(`select * from dispatch where date>='${req.query.fdate}' and date<='${req.query.tdate}' and place='${aschool}' and item='${items[i].item}' `);
  //    h=h[0]          
  //    let school=0;
  //    for(let s=0;s<h.length;s++){
  //       school+=h[s].quantity;
  //    }
  //    fin['schoolqty']=school;
  //    fin["schoolamt"]= (school*rate).toFixed(2)
  //    dispatchedQuantities +=school;
  //    schoolQtyTotal += school;
  //    schoolAmtTotal+= Number((school*rate).toFixed(2))
  //    //issued total
  //    fin['issueqty']=dispatchedQuantities
  //    fin['issuerate']= rate.toFixed(2)
  //    fin['issueamt']=Number((dispatchedQuantities*rate).toFixed(2))
  //    issuesQtyTotal +=dispatchedQuantities;
  //    issuesRateTotal += Number(rate.toFixed(2))
  //    issuesAmtTotal +=Number((dispatchedQuantities*rate).toFixed(2))
  //    fin["closeqty"] =((openingStock + purchasedQuantity) - dispatchedQuantities)
  //    fin["closeamt"]=((openingStock + purchasedQuantity) - dispatchedQuantities).toFixed(2)
  //    closingStockQtyTotal += ((openingStock + purchasedQuantity) - dispatchedQuantities);
  //    closingStockAmtTotal += Number((((openingStock + purchasedQuantity) - dispatchedQuantities) * rate).toFixed(2));
   
     


  //    lp[0].push(fin)


      
  //   }
  //   fin1={}
  //    fin1['openingStockQtyTotal']=openingStockQtyTotal
  //    fin1['openingStockAmtTotal']=openingStockAmtTotal
  //    fin1['purchaseQtyTotal']=purchaseQtyTotal
  //    fin1['purchaseRateTotal']=purchaseRateTotal
  //    fin1['purchaseAmtTotal']=purchaseAmtTotal
  //    fin1['totalQtyTotal']=totalQtyTotal
  //    fin1['totalAmtTotal']=totalAmtTotal
  //    fin1['rmkQtyTotal']=rmkQtyTotal 
  //    fin1['rmkAmtTotal']  =rmkAmtTotal  
  //    fin1['rmdQtyTotal ']  =rmdQtyTotal 
  //    fin1['rmdAmtTotal ']  =rmdAmtTotal 
  //    fin1['rmkcetQtyTotal ']  =rmkcetQtyTotal 
  //    fin1['rmkcetAmtTotal']  =rmkcetAmtTotal 
  //    fin1['schoolQtyTotal']  =schoolQtyTotal 
  //    fin1['schoolAmtTotal ']  =schoolAmtTotal     
  //    fin1['issuesQtyTotal ']  =issuesQtyTotal 
  //    fin1['issuesRateTotal']  =issuesRateTotal
  //    fin1['issuesAmtTotal ']  =issuesAmtTotal 
  //    fin1['closingStockQtyTotal']  =closingStockQtyTotal
  //    fin1['closingStockAmtTotal']  =closingStockAmtTotal
  //    lp[1].push(fin1)
   
  //   console.log("kikijijij")
    
    res.status(200).send(result[0]);

});

module.exports = router;
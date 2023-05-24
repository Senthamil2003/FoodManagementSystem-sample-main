import React from 'react'
import axios from "axios";
import { useState,useEffect,useRef } from 'react';
import { Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import ReactToPrint from 'react-to-print';
import "./report.css"

export default function MonthlyRp() {
    let fdate=localStorage.getItem('fdate')
    let tdate=localStorage.getItem('tdate')
    const [data,sdata]=useState('')
    const[query,setquery] = useState("")
    const componentRef = useRef();


    useEffect(() => {
        axios.get("http://localhost:3002/monthly/report",{
            params: {
              fdate:fdate,
              tdate:tdate
            }
          }).then((response) => {
            sdata(response.data)

            console.log(response.data)
        });

    },[])
    
    console.log(data)
    if(data)return (
      <div className='container-fluid'>
        
        <div className='row'>
          <div className='col-12'> 
          <ReactToPrint
        trigger={() => <button className='btn btn-success btn-p'>Print this out!</button>}
        documentTitle="Average Report"
        content={() => componentRef.current}
      />
          <Link to="/rep"> <Button variant="success" className="btn-b">Back</Button></Link>
           
          </div>
        </div>
        <div className='row itm'>
          <div className='col-12 itm-c'>
          <input placeholder='Enter item to search.....' type="text" className='inpt-catg' onChange={(e)=>{setquery(e.target.value)}} value={query}/>
          {/* onChange={(e)=>{setquery(e.target.value)}} */}
          <Button variant="success" className='btn-catg'>SEARCH</Button>
          </div>
        </div>
        <div className='row'>
          <div className='col-12 tab-it' ref={componentRef}>
            <h1>Monthly Report</h1>
          <table class="table table-bordered">
  <thead>
    <tr>
      <th scope="col" rowspan="2">Item Name</th>
      <th scope="col" colSpan="2">RMK</th>
      <th scope="col" colSpan="2">RMD</th>
      <th scope="col" colSpan="2">RMKCET</th>
      <th scope="col" colSpan="2">SCHOOL</th>
      <th scope="col" colspan="2">ISSUE TOTAL</th>
    </tr>
    <tr>
      <th scope="col">Qty</th>
      <th scope="col">Amount</th>
      <th scope="col">Qty</th>
      <th scope="col">Amount</th>
      <th scope="col">Qty</th>
      <th scope="col">Amount</th>
      <th scope="col">Qty</th>
      <th scope="col">Amount</th>
      
    </tr>
  </thead>
  <tbody>
  {data.filter(e=>e.item.includes(query.toLocaleUpperCase())).map((e)=>{return(
                <tr>
                  <td>{e.item}</td>
                  <td>{e.RMK}</td>
                  <td>{((e.purchaseAmount/e.purchaseQuantity)*e.RMK).toFixed(2)}</td>
                  <td>{e.RMD}</td>
                  <td>{((e.purchaseAmount/e.purchaseQuantity)*e.RMD).toFixed(2)}</td>
                  <td>{e.RMKCET}</td>
                  <td>{((e.purchaseAmount/e.purchaseQuantity)*e.RMKCET).toFixed(2)}</td>
                  <td>{e.RMKSCHOOL}</td>
                  <td>{((e.purchaseAmount/e.purchaseQuantity)*e.RMKSCHOOL).toFixed(2)}</td>
                  <td>{e.RMK+e.RMD+e.RMKCET+e.RMKSCHOOL}</td>
                  <td>{((e.purchaseAmount/e.purchaseQuantity)*(e.RMK+e.RMD+e.RMKCET+e.RMKSCHOOL)).toFixed(2)}</td>
                </tr>
              )})}
    
  </tbody>
</table>
          </div>
        </div>
  
      </div>
    )
}

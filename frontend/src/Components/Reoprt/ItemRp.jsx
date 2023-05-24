import React from 'react'
import axios from "axios";
import { Table } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import ReactToPrint from 'react-to-print';
import { useState,useEffect ,useRef} from 'react';

export default function ItemRp() {
    let fdate=localStorage.getItem('fdate')
    let tdate=localStorage.getItem('tdate')
    const [data,sdata]=useState('')
    const[query,setquery] = useState("")
    const componentRef = useRef();


    useEffect(() => {
        axios.get("http://localhost:3002/item/hi",{
            params: {
              fdate:fdate,
              tdate:tdate
            }
          }).then((response) => {
            sdata(response.data)

            console.log(response.data)
        });

    },[])
    
    console.log(fdate,tdate)
    if(data)return (
    <div className='container-fluid'>
      <ReactToPrint
        trigger={() => <button className='btn btn-success btn-p'>Print this out!</button>}
        documentTitle="Average Report"
        content={() => componentRef.current}
      />
      <div className='row'>
        <div className='col-12'>
        <Link to="/rep"> <Button variant="success" className="btn-b">Back</Button></Link>
          <h1>ITEM WISE REPORT</h1>
        </div>
      </div>
      <div className='row itm'>
        <div className='col-12 itm-c'>
        <input placeholder='Enter items to search.....' type="text" className='inpt-catg' onChange={(e)=>{setquery(e.target.value)}} value={query}/>
        <Button variant="success" className='btn-catg'>SEARCH</Button>
        </div>
      </div>
      <div className='row'>
        <div className='col-12 tab-it' ref={componentRef}>
          
          <Table>
            <thead>
              <tr>
                <th>ITEMS</th>
                <th>OPENING STOCK</th>
                <th>PURCHASE</th>
                <th>RMK</th>
                <th>RMD</th>
                <th>RMKCET</th>
                <th>SCHOOL</th>
                <th>ToTal</th>
              </tr>
            </thead>
            <tbody>
          {data.filter((e)=>e.item.includes(query.toLocaleUpperCase())).map((e)=>{return(
          <tr>
            <td>{e.item}</td>
            <td>{e.closingStock}</td>
            <td>{e.purchaseQuantity}</td>
            <td>{e.RMD}</td>
            <td>{e.RMK}</td>
            <td>{e.RMKCET}</td>
            <td>{e.RMKSCHOOL}</td>
            <td>{e.RMK+e.RMD+e.RMKCET+e.RMKSCHOOL}</td>
            
            </tr>)})}
            </tbody>
          </Table>
        </div>
      </div>

    </div>
  )
}

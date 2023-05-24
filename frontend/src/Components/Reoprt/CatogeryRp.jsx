import React from 'react'
import axios from "axios";
import Button from 'react-bootstrap/Button';
import SearchIcon from '@mui/icons-material/Search';
import { Link } from 'react-router-dom';
import { Table } from 'react-bootstrap';
import './report.css'
import { useState,useEffect,useRef } from 'react';
import ReactToPrint from 'react-to-print';

export default function CatogeryRp() {
    let fdate=localStorage.getItem('fdate')
    let tdate=localStorage.getItem('tdate')
    const [data,sdata]=useState();
   
    const[query,setquery] = useState("")
    const componentRef = useRef();

    useEffect(() => {
        axios.get("http://localhost:3002/disp/result",{
            params: {
              fdate:fdate,
              tdate:tdate
            }
          }).then((response) => {
            sdata(response.data)

            console.log(response.data,"AVAIL")
        });

    },[])
    
    console.log(fdate,tdate)
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
          <h1>CATEGORY REPORT</h1>
        </div>
      </div>
      <div className='row'>
        <div className='col-12 ser-col'>
        <SearchIcon className="ser"/>
              <input placeholder='Enter category to search.....' type="text" className='inpt-catg' onChange={(e)=>{setquery(e.target.value)}} value={query}/>
              <Button variant="success" className='btn-catg'>SEARCH</Button>
        </div>
      </div>
      <div className='row r-p'>
        {/*<div className='col-4 pur'><h4>Total Puchase : {data[1][0]} </h4> </div>
        <div className='col-4'> </div>
        <div className='col-4 dis'><h4>Total Dispatch : {data[1][1]} </h4> </div>*/}
      </div>
      <div className='row'>
        <div className='col-12 tab-col' ref={componentRef}>
          <Table>
            <thead>
              <tr>
                <th>ITEMS</th>
                
                <th>PURCHASE</th>
                <th>RMK</th>
                <th>RMD</th>
                <th>RMKCET</th>
                <th>SCHOOL</th>
                <th>ToTal</th>
              </tr>
            </thead>
            <tbody>
          {data.filter((e)=>e.category.includes(query.toLocaleUpperCase())).map((e)=>{return(
          <tr>
            <td>{e.category}</td>
            <td>{(e.purchase_amount).toFixed(2)}</td>
            <td>{(e.RMK_amount).toFixed(2)}</td>
            <td>{e.RMD_amount.toFixed(2)}</td>
            <td>{e.RMKCET_amount.toFixed(2)}</td>
            <td>{e.RMKSCHOOL_amount.toFixed(2)}</td>
           <td>{e.total_amount.toFixed(2)}</td>
            </tr>

            )})}
        
            </tbody>
          </Table>
        </div>
      </div>
      
    </div>
  )
}

import React from 'react'
import './App.css';
import { ProSidebarProvider } from 'react-pro-sidebar';
import Slidebar from './Slidebar';
import {useNavigate} from "react-router-dom"
import { useState } from 'react';
function Report() {
  const [fdate,sfdate]=useState("")
  const [tdate,stdate]=useState("")
  const [data,sdata]=useState()
  const navigate = useNavigate();
  console.log(fdate)
  function category(){
    if(fdate == "" && tdate == ""){
      alert("Pls enter date")
    }else{
    localStorage.setItem('fdate', fdate);
    localStorage.setItem('tdate', tdate);
    navigate("/catogery")
}
  }
  function pvt(e){
      e.preventDefault()
  }
  function average(){
    if(fdate == "" && tdate == ""){
      alert("Pls enter date")
    }else{
    localStorage.setItem('fdate', fdate);
    localStorage.setItem('tdate', tdate);
    navigate("/average")
   }
  }
  function monthly(){
    if(fdate == "" && tdate == ""){
      alert("Pls enter date")
    }else{
localStorage.setItem('fdate', fdate);
    localStorage.setItem('tdate', tdate);
    navigate("/monthly")
    }
  }
  function item(){
    if(fdate == "" && tdate == ""){
      alert("Pls enter date")
    }
    else{
      localStorage.setItem('fdate', fdate);
    localStorage.setItem('tdate', tdate);
    navigate("/item")

    }
    

  }
  console.log(data)
  return (
    <div className='container-fluid'>
      <div className='row'>
        <div className='col-3'>
          
        <ProSidebarProvider>
      <Slidebar/>
      </ProSidebarProvider>
        </div>
        <div className='col-9'>
          <h1 className='rep-h1'>REPORTS</h1>
          <div className='row'>
            <div className='col-6 card card-r'>
            <div class="card-body">
              <h2 className='card-title'>MONTHLY</h2>
              <div className='row'>
              <div className='col-6'><h5 class="card-subtitle ">From</h5>
            <input type="date" value={fdate} onChange={(e)=>sfdate(e.target.value)} className="inp-mon" required/>
            </div>
              <div className='col-6'> <h5 class="card-subtitle ">To</h5>
        <input type="date"  value={tdate} onChange={(e)=>stdate(e.target.value)} className="inp-mon" required/></div>
        </div>
           
  </div>
  <button className="btn btn-d btn-success" onClick={monthly}>Monthly</button>  
            </div>
            <div className='col-6 card-r card'><div class="card-body">
              <h2 className='card-title'>CATEGORY-WISE</h2>
              <div className='row'>
              <div className='col-6'><h5 class="card-subtitle ">From</h5>
            <input type="date" value={fdate} onChange={(e)=>sfdate(e.target.value)} className="inp-mon"/></div>
              <div className='col-6'> <h5 class="card-subtitle ">To</h5>
        <input type="date" value={tdate} onChange={(e)=>stdate(e.target.value)} className="inp-mon"/></div>
        </div>
           
  </div>
  <button onClick={category} className="btn btn-d btn-success">Category</button>
  </div>
  
            </div>
          <div className='row'><div className='col-6 card-r card'><div class="card-body">
              <h2 className='card-title'>ITEM-WISE</h2>
              <div className='row'>
              <div className='col-6'><h5 class="card-subtitle ">From</h5>
            <input type="date" value={fdate} onChange={(e)=>sfdate(e.target.value)} className="inp-mon"/></div>
              <div className='col-6'> <h5 class="card-subtitle ">To</h5>
        <input type="date" value={tdate} onChange={(e)=>stdate(e.target.value)} className="inp-mon"/></div>
        </div>
           
  </div>
  <button onClick={item} className="btn btn-d btn-success">Item</button>
  </div><div className='col-6 card card-r'><div class="card-body">
              <h2 className='card-title'>COMPARISON</h2>
              <div className='row'>
              <div className='col-6'><h5 class="card-subtitle ">From</h5>
            <input type="date" value={fdate} onChange={(e)=>sfdate(e.target.value)} className="inp-mon"/></div>
              <div className='col-6'> <h5 class="card-subtitle ">To</h5>
        <input type="date" value={tdate} onChange={(e)=>stdate(e.target.value)} className="inp-mon"/></div>
        </div>
           
  </div>
  <button onClick={average} className="btn btn-d btn-success">Average</button>
  </div></div>
        {/* <form onSubmit={pvt}>
        <input type="date" value={fdate} onChange={(e)=>sfdate(e.target.value)}/>
        <input type="date" value={tdate} onChange={(e)=>stdate(e.target.value)}/>
        <button onClick={category}>Category</button>
        <br/>
        <button onClick={average}>Average</button>
        <br/>
        <button onClick={monthly}>Monthly</button>
        <button onClick={item}>Item</button>
      </form> */}

        </div>
        

      </div>
      
             
    </div>
  )
}

export default Report
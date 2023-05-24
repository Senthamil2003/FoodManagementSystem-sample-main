import { ProSidebarProvider } from 'react-pro-sidebar';
import Slidebar from './Slidebar';
import React, { useEffect, useState } from 'react'
import Axios from 'axios';
import Button from 'react-bootstrap/Button';
import SearchIcon from '@mui/icons-material/Search';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import {Modal} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';

function Vendor() {
  const [vendor,setvendor] = useState([]);
  const[catg,setcatg] = useState([]);
  const[c,setc] = useState([])
  const co = new Set();
  const[mod,setmod] = useState(false);
  const[mod1,setmod1] = useState(false);
  const[val,setval] = useState([])
  const [cat,setcat] = useState([])
  const[items,setitems] = useState()
  const[ven,setven] = useState("")
  const[it,setit] = useState("")
  const[chg,setchg] = useState("")
  
  useEffect(()=>{
    Axios.get("http://localhost:3002/ven").then((res)=>{
      setvendor(res.data);
    })
  })
  const modOn = () => {
    setmod(true);
  }
  
  const modOff = () => {
    setmod(false);
  }
  
  const modOff1 = () => {
    setmod1(false);
  }

  const getedit = (e) => {
    setmod1(true);
    setchg(e)
  }

  const edited = () => {
    Axios.post("http://localhost:3002/ed",{
      it:it,
      ven:ven,
      chg:chg
    }).then(()=>{
      console.log("success")
    })

  }
  const handleadd = () =>  {
    Axios.post("http://localhost:3002/vendors",{
      cat:cat,
      items:items
    }).then(()=>{
      console.log("success")
    })
      }
      const getcatg = (i) =>{
        Axios.post("http://localhost:3002/dele",{
          cat:i
        }).then(()=>{
          console.log("success")
        })   
      }
  return (
    <div className='container-fluid'>
      <Modal show={mod}>
        <Modal.Header>Enter items to be added</Modal.Header>
        <Modal.Body>
        <input type="text" onChange={(e)=>{setitems(e.target.value)}}/>
        </Modal.Body>
        <Button onClick={handleadd} className="btn">Submit</Button>
        <Button onClick={modOff}>CLOSE</Button>
      </Modal>
      <Modal show={mod1}>
        <Modal.Header>Enter items to be edit</Modal.Header>
        <Modal.Body>
        <input type="text" onChange={(e)=>{setven(e.target.value)}}/>
        <input type="text" onChange={(e)=>{setit(e.target.value)}}/>
        </Modal.Body>
        <Button onClick={edited} className="btn">Submit</Button>
        <Button onClick={modOff1}>CLOSE</Button>
      </Modal>
        <div className='row'>
            <div className='col-3'>
                <ProSidebarProvider>
                    <Slidebar/>
                </ProSidebarProvider>
            </div>
            <div className='col-9'>
      
          <div className='row'>
            <div className='col-6'>
              <h1>LIST OF VENDORS</h1>
            
            </div>
          </div>
          <div className='row r-ser'>
            <div className='col search'>
              <SearchIcon/>
              <input placeholder='Enter vendors to add.....' type="text"  className='inpt-catg'onChange={(e)=>{setcat(e.target.value)}} />
              <Button variant="success" onClick={modOn} className='btn-catg'>ADD</Button>
            </div>
          </div>
          <div className='row row-list'>
            <div className='col-12 lis-row'>
            
              {vendor.filter(i=>i.vendorName.includes(  cat)).map((i)=>{return(
                <div className='row list-catg'>
                  <div className='col-7 nam-i'>{i.vendorName} - - {i.category}</div> <Button variant="primary" className='btn-catg col-2' onClick={(e)=>{getedit(e.target.value)}} value={i.vendorName}>EDIT</Button> <Button variant="success" className='btn-catg col-3' onClick={(e)=>{getcatg(e.target.value)}}  value={i.vendorName}>DELETE</Button>
                  </div>
              )})}
            </div>
          </div>
        
        </div>
    </div>
    </div>
  
  )
}

export default Vendor
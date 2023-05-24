import React, { useEffect, useState } from 'react'
import Axios from 'axios';
import 'bootstrap/dist/css/bootstrap.css';
import { ProSidebarProvider } from 'react-pro-sidebar';
import Slidebar from './Slidebar';
import Button from 'react-bootstrap/Button';
import SearchIcon from '@mui/icons-material/Search';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import {Modal} from 'react-bootstrap';



function Test() {
  const[query,setquery] = useState("")
  const[catg,setcatg] = useState([]);
  const[c,setc] = useState([])
  const co = new Set();
  const[mod,setmod] = useState(false);
  const[val,setval] = useState([])
  const [cat,setcat] = useState("")
  const[items,setitems] = useState()

  useEffect(()=>{
    Axios.get("http://localhost:3002/catg").then((res)=>{
      setcatg(res.data);
    })
  })
  const getcatg = (i) =>{
    Axios.post("http://localhost:3002/delete",{
      cat:i
    }).then(()=>{
      console.log("success")
    })   
  }
  const handleadd = () =>  {
Axios.post("http://localhost:3002/itms",{
  cat:cat,
  items:items
}).then(()=>{
  console.log("success")
})
  }
  const modOn = () => {
    setmod(true);
  }
  
  const modOff = () => {
    setmod(false);
  }
 catg.map((i)=>{
  co.add(i.category)
 })
 const arr = Array.from(co)
 console.log(arr)
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
      <div className='row'>
        <div className='col-3'>
        <ProSidebarProvider>
      <Slidebar/>
</ProSidebarProvider>
        </div>
        <div className='col-9 cont'>
          <div className='row'>
            <div className='col-6'>
              <h1>LIST OF CATEGORY</h1>
            </div>
          </div>
          <div className='row r-ser'>
            <div className='col search'>
              <SearchIcon/>
              <input placeholder='Enter category to add.....' type="text" className='inpt-catg' onChange={(e)=>{console.log(e.target.value)}} value={query}/>
              
              <Button variant="success" className='btn-catg' onClick={modOn}>ADD</Button>
            </div>
          </div>
          <div className='row row-list'>
            <div className='col lis-row'>

              {arr.map((u)=>{return(
                <div className='row list-catg'>
                  <div className='col-7 nam-i'>{u}</div> <Button variant="primary" className='btn-catg col-2' onClick={getcatg}>EDIT</Button> <Button variant="success" className='btn-catg col-3' onClick={(e)=>{getcatg(e.target.value)}} value={u}>DELETE</Button>
                  </div>
              )})}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Test
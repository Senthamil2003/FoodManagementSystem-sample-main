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



function Category() {
  const[query,setquery] = useState("")
  const[catg,setcatg] = useState([]);
  const[c,setc] = useState([])
  const co = new Set();
  const[mod,setmod] = useState(false);
  const[mod1,setmod1] = useState(false);
  const[mod2,setmod2] = useState(false);
  const[val,setval] = useState([])
  const [cat,setcat] = useState("")
  const[items,setitems] = useState()
  const[del,setdel] = useState("")
  const[its,setits] = useState([])
  const[edit,setedit] = useState("");
  const[q,setq] = useState("");

  useEffect(()=>{
    Axios.get("http://localhost:3002/catg").then((res)=>{
      setcatg(res.data);
    })
  },[])
  
  const getcatg = (i) =>{
    Axios.post("http://localhost:3002/itemsd",{
      c:i
    }).then((res)=>{
      setits(res.data);
    })   
    setdel(i);
    setmod1(true);
  
  }
  const getcatg1 = (i) =>{
    Axios.post("http://localhost:3002/itemsd",{
      c:i
    }).then((res)=>{
      setits(res.data);
    })   
    setdel(i);

    setmod2(true);
  
  }
  const handleadd = () =>  {
Axios.post("http://localhost:3002/itms",{
  cat:query,
  items:items
}).then(()=>{
  console.log("success")
})
  }

  const delt = (i) => {
    
    Axios.post("http://localhost:3002/delete",{
      cat:i
    }).then(()=>{
      console.log("Deleted")
    })
    alert("Items Removed Refresh to see changes")
  }
  const modOn = () => {
    setmod(true);
  }
  
  const modOff = () => {
    setmod(false);
  }
  const modOff1 = () => {
    setmod1(false);
  }
  const modOff2 = () => {
    setmod2(false);
  }
 catg.map((i)=>{
  co.add(i.category)
 })

 const edt = (i) => {
  Axios.post("http://localhost:3002/edit",{
    edit:edit,
    i:i
  }).then(()=>{
    console.log("edited")
  })
 }
 const arr = Array.from(co)
 console.log(arr)
  return (
    <div className="container-fluid">
      <Modal show={mod}>
        <Modal.Header>Enter items to be added</Modal.Header>
        <Modal.Body>
        {/* {its.map((e)=>{return(<div>{e.item}</div>)})} */}
        </Modal.Body>
        <Button onClick={handleadd} className="btn-1">Submit</Button>
        <Button onClick={modOff} className="btn-2">CLOSE</Button>
      </Modal>
      <Modal show={mod1}>
      <Modal.Header>{del}</Modal.Header>
        <Modal.Body>
        <Modal.Header>Click items to be deleted</Modal.Header>
        {/* onClick={delt(e.item)} */}
        <input type="text" onChange={(e)=>{setq(e.target.value)}} placeholder="Enter item to search"/>
        {its.filter(e=>e.item.includes(q)).map((e)=>{return(<button className="btn-del btn btn-link" onClick={(e)=>{delt(e.target.value)}} value={e.item}>{e.item}</button>)})}
        </Modal.Body>
        <Button onClick={handleadd} className="btn-1">Submit</Button>
        <Button onClick={modOff1} className="btn-2">CLOSE</Button>
      </Modal>
      <Modal show={mod2} className="mod2">
      <Modal.Header>{del}</Modal.Header>
        <Modal.Body>
        <Modal.Header>Click items to be edited</Modal.Header>
        {/* onClick={delt(e.item)} */}
        <input type="text" placeholder='Enter item' className='inpt-mod'  onChange={(e)=>{setedit(e.target.value)}}/>
        <input type="text" onChange={(e)=>{setq(e.target.value)}} placeholder="Search for item"/>
        {its.filter(e=>e.item.includes(q)).map((e)=>{return(
          <div>
<button className="btn-del btn btn-link" onClick={(e)=>{edt(e.target.value)}} value={e.item}>{e.item}</button>

          </div>
        )})}
        </Modal.Body>
        <Button onClick={handleadd} className="btn-1">Submit</Button>
        <Button onClick={modOff2} className="btn-2">CLOSE</Button>
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
            <div className='col-12 search'>
              <SearchIcon/>
              <input placeholder='Enter category to add.....' type="text" className='inpt-catg' autoFocus onChange={(e)=>{setquery(e.target.value)}} value={query}/>
              
              <Button variant="success" className='btn-catg' onClick={modOn}>ADD</Button>
              
            </div>
          </div>
          <div className='row row-list'>
            <div className='col-12 lis-row'>
              {arr.filter(u=>u.includes(query)).map((u)=>{return(
                <div className='row list-catg'>
                  <div className='col-7 nam-i'>{u}</div> <Button variant="outline-success" className='btn-catg col-2' onClick={(e)=>{getcatg1(e.target.value)}} value={u}>EDIT</Button> <Button variant="success" className='btn-catg col-3' onClick={(e)=>{getcatg(e.target.value)}} value={u}>DELETE</Button>
                  </div>
              )})}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Category
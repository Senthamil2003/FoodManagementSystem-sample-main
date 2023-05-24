import React, { useState } from 'react'
import { Table } from 'react-bootstrap';
import { ProSidebarProvider } from 'react-pro-sidebar';
import Slidebar from './Slidebar';
import  Axios  from 'axios';
import { useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import SearchIcon from '@mui/icons-material/Search';

function Stock() {
    const[curr,setcurr] = useState([]);
    const[query,setquery] = useState([])

    useEffect(()=>{
        Axios.get("http://localhost:3002/stock").then((res)=>{
          setcurr(res.data);
          console.log(res.data)

        })
      },[])
      const sell = () => {
        curr.map((e)=>{console.log(e.quantity)})
      }
  return (
    <div className='container-fluid'>
        <div className='row'>
            <div className='col-3'>
                <ProSidebarProvider>
                    <Slidebar/>
                </ProSidebarProvider>
            </div>
            <div className='col-9'>
                <h1 className='stock'>AVAILABLE   STOCK</h1>
<br></br>
<div className='ser-ava'>
<SearchIcon/>
              <input placeholder='Enter item name to check.....' type="text" className='inpt-catg' autoFocus onChange={(e)=>{setquery(e.target.value)}} value={query}/>
              
              <Button variant="success" className='btn-catg'>Search</Button>
              </div>
                <Table>
                    <thead>
                        <tr>
                            <th>ITEMS</th>
                            <th>CATEGORY</th>
                            <th>QUANTITY</th>
                        </tr>
                    </thead>
                    <tbody>
                        {curr.filter((e)=>(e.item + e.category).includes(query)).map((e)=>{
                            return(
                            <tr>
                                <td>{e.item}</td>
                                <td>{e.category}</td>
                                <td>{e.quantity}</td>
                            </tr>
                            )
                        })}
                        
                    </tbody>

                </Table>
            </div>
        </div>
    </div>
  )
}

export default Stock
import React from 'react'
import axios from "axios";
import { useState,useEffect,useRef } from 'react';
import { Table } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import ReactToPrint from 'react-to-print';
export default function Average() {
    let fdate=localStorage.getItem('fdate')
    let tdate=localStorage.getItem('tdate')
    const [data,sdata]=useState('')
    const[query,setquery] = useState("")
    const componentRef = useRef();
    const[mon,setmon]=useState([])
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [months, setMonths] = useState([]);
    const[inputCount,setinputCount] = useState(0);
  

    useEffect(() => {
      
        axios.get("http://localhost:3002/monthly/MonthlyReport",{
            params: {
              fdate:fdate,
              tdate:tdate
            }
          }).then((response) => {
            sdata(response.data)
            setStartDate(fdate);
            setEndDate(tdate);
           
            
        });

    },[])
    
  
    useEffect(() => {
      calculateMonths();
    }, [startDate, endDate]);
  

  
    const calculateMonths = () => {
      const start = new Date(startDate);
      const end = new Date(endDate);
      const monthList = [];
      let currentDate = new Date(start);
  
      while ( currentDate.getFullYear() < end.getFullYear() ||
      (currentDate.getFullYear() === end.getFullYear() && currentDate.getMonth() <= end.getMonth())
    ) {
        const month = currentDate.toLocaleString('default', { month: 'long' });
        const year = currentDate.getFullYear();
        const formattedMonth = `${month}`;
  
        monthList.push(formattedMonth);
  
        currentDate.setMonth(currentDate.getMonth() + 1);
      }
  
      setMonths(monthList);
      setinputCount(monthList.length);
      console.log(monthList.length,"Nud")
    };
    function sortMonths(months) {
      const monthOrder = {
        January: 0,
        February: 1,
        March: 2,
        April: 3,
        May: 4,
        June: 5,
        July: 6,
        August: 7,
        September: 8,
        October: 9,
        November: 10,
        December: 11
      };
    
      months.sort((a, b) => monthOrder[a] - monthOrder[b]);
    }
    

    sortMonths(months);
    console.log(months);
    
console.log(months) 
console.log(data)
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
          <h1>Comparison</h1>
        </div>
      </div>
      <div className='row itm'>
        <div className='col-12 itm-c'>
        <input placeholder='Enter item to search.....' type="text" className='inpt-catg' onChange={(e)=>{setquery(e.target.value)}} value={query}/>
        <Button variant="success" className='btn-catg'>SEARCH</Button>
        </div>
      </div>
      <div className='row'>
        <div className='col-12 tab-it' ref={componentRef}>
          <Table >
            <thead>
              <tr> 
                <th scope="col"  rowspan="2">ITEM</th>
                {months.map((e)=>{return(
                  <th scope='col' colSpan="2">{e}</th>
                )})}
                {/* <th scope="col" colSpan="2">JAN</th>
                <th scope="col" colSpan="2">FEB</th>
                <th scope="col" colSpan="2">MAR</th>
                <th scope="col" colSpan="2">APR</th>
                <th scope="col" colSpan="2">MAY</th>
                <th scope="col" colSpan="2">JUN</th>
                <th scope="col" colSpan="2">JUL</th>
                <th scope="col" colSpan="2">AUG</th>
                <th scope="col" colSpan="2">SEP</th>
                <th scope="col" colSpan="2">OCT</th>
                <th scope="col" colSpan="2">NOV</th>
                <th scope="col" colSpan="2">DEC</th> */}




                
              </tr>
            {Array.from({ length: inputCount }, (_, index) => (
        <React.Fragment key={index}>
          <th scope="col">Qty</th>
          <th scope="col">amt</th> 
        </React.Fragment>
      ))}
            </thead>
            <tbody>
      
  {data.filter((e) => e.item.includes(query.toLocaleUpperCase())).map((e) => {
    return (
      <tr>
        <td>{e.item}</td>
        {   <td className={months.indexOf("January")+1==0 ? "dis":"active"} >{e.Jan_Quantity.toFixed(2)}</td>}
        { <td className={months.indexOf("January")+1==0? "dis":"active"}>{e.Jan_Amount.toFixed(2)}</td>}
        {  <td className={months.indexOf("February")+1==0? "dis":"active"} >{e.Feb_Quantity.toFixed(2)}</td>}
        { <td className={months.indexOf("February")+1==0? "dis":"active"}>{e.Feb_Amount.toFixed(2)}</td>} 
        { <td className={months.indexOf("March")+1==0? "dis":"active"}>{e.Mar_Quantity.toFixed(2)}</td>}
        { <td className={months.indexOf("March")+1==0? "dis":"active"}>{e.Mar_Amount.toFixed(2)}</td>}
        {<td className={months.indexOf("Apirl")+1==0? "dis":"active"}>{e.Apr_Quantity.toFixed(2)}</td>}
        { <td className={months.indexOf("Apirl")+1==0? "dis":"active"}>{e.Apr_Amount.toFixed(2)}</td>} 
        {<td className={months.indexOf("May")+1==0? "dis":"active"}>{e.May_Quantity.toFixed(2)}</td>}
        {<td className={months.indexOf("May")+1==0? "dis":"active"}>{e.May_Amount.toFixed(2)}</td>} 
        { <td className={months.indexOf("June")+1==0? "dis":"active"}>{e.Jun_Quantity.toFixed(2)}</td>}
        {<td className={months.indexOf("June")+1==0? "dis":"active"}>{e.Jun_Amount.toFixed(2)}</td>} 
        {<td className={months.indexOf("July")+1==0? "dis":"active"}>{e.Jul_Quantity.toFixed(2)}</td>}
        {<td className={months.indexOf("July")+1==0? "dis":"active"}>{e.Jul_Amount.toFixed(2)}</td>}
        { <td className={months.indexOf("August")+1==0? "dis":"active"}>{e.Aug_Quantity.toFixed(2)}</td>}  
        {<td className={months.indexOf("August")+1==0? "dis":"active"}>{e.Aug_Amount.toFixed(2)}</td>}
        {  <td className={months.indexOf("September")+1==0? "dis":"active"}>{e.Sep_Quantity.toFixed(2)}</td>}
        { <td className={months.indexOf("September")+1==0? "dis":"active"}>{e.Sep_Amount.toFixed(2)}</td>}
        { <td className={months.indexOf("October")+1==0? "dis":"active"}>{e.Oct_Quantity.toFixed(2)}</td>} 
        { <td className={months.indexOf("Obctober")+1==0? "dis":"active"}>{e.Oct_Amount.toFixed(2)}</td>}
        {  <td className={months.indexOf("November")+1==0? "dis":"active"}>{e.Nov_Quantity.toFixed(2)}</td>}
        {  <td className={months.indexOf("November")+1==0? "dis":"active"}>{e.Nov_Amount.toFixed(2)}</td>} 
        {  <td className={months.indexOf("December")+1==0? "dis":"active"}>{e.Dec_Quantity.toFixed(2)}</td>}
        {  <td className={months.indexOf("December")+1==0? "dis":"active"}>{e.Dec_Amount.toFixed(2)}</td>}
      </tr>
    ); 
  })}
</tbody>

          </Table>
        </div>
      </div>
    
      
        
    </div>
  )
}
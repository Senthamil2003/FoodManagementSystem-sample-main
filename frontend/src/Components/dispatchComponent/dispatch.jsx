import React from "react";
import Table from "react-bootstrap/Table";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import { ProSidebarProvider } from 'react-pro-sidebar';
import Slidebar from '../../Slidebar';
import "../tables.css";
import 'bootstrap/dist/css/bootstrap.css';
import Button from 'react-bootstrap/Button';

export default function Dispatch() {
  const [items, setItems] = useState([]);
  const [counter, setCounter] = useState(2);
 
  const handleClick=(e)=>{
    e.target.value='';
  }

  useEffect(() => {
    axios
      .get("http://localhost:3002/dispatch/retrive")
      .then(function (response) {
        // handle success
        setItems(response.data);
        console.log(response.data,"Hiiiiiiiiiiiiiii")
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
      .finally(function () {
        // always executed
      });
  }, []);

  const getQuantity = async (e) => {
    let itemName = e.target.value;
    let id = e.target.id;
    console.log(id);

    document.getElementById(id + " RMK").value = 0;
    document.getElementById(id + " RMD").value = 0;
    document.getElementById(id + " RMKCET").value = 0;

    console.log(itemName);
    let quantity = document.getElementById(id + " totquantity");
    let currentQuantity = document.getElementById(id + " currquantity");
    axios
      .post("http://localhost:3002/dispatch/getQuantity", {
        itemName: itemName,
      })
      .then(function (response) {
        console.log(response.data[0].quantity);
        quantity.value = response.data[0].quantity;
        currentQuantity.value = response.data[0].quantity;
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const addValue = (e) => {
    const element = e.target.id;
    const split = element.split(" ");
    const id = split[0];
    const place = split[1];
    // console.log(id,place)
    let quantity = document.getElementById(id + " totquantity");

    let totQuantity = Number(quantity.value);
    let currQuantity = document.getElementById(id + " currquantity");
    let rmk = Number(document.getElementById(id + " RMK").value);
    let rmd = Number(document.getElementById(id + " RMD").value);
    let rmkcet = Number(document.getElementById(id + " RMKCET").value);
    let school = Number(document.getElementById(id + " SCHOOL").value);

    let currentQuantity = totQuantity - (rmk + rmd + rmkcet + school);
    if(currentQuantity<0){
      window.alert("Item Quantity exceeded max limit")
      let x =document.getElementById(id+' '+place);
      currentQuantity+=Number(x.value);
      x.value=0;
    }

    currQuantity.value = currentQuantity;
  };

  const submit = () => {
    let arr = [];
    let date = document.getElementById("date").value;

 if(date ==""){
      alert("enter date pleas")
    }else{
    class Obj {
      constructor(item, currentQuantity,rmk,rmd,rmkcet,school) {
        this.ItemName = item.toLocaleUpperCase();
        this.CurrentQuantity = currentQuantity;
        this.RMK = rmk;
        this.RMD = rmd;
        this.RMKCET = rmkcet;
        this.SCHOOL = school;
        this.DATE = date;
      }
    }

    for (let i = 1; i < counter; i++) {
      
      let item = document.getElementById(i).value;
      console.log(item)
      console.log(i)
      if(item=="select"){
        break
      }
      let currentQuantity = document.getElementById(i + " currquantity").value;
      let rmk = document.getElementById(i + " RMK").value;
      let rmd = document.getElementById(i + " RMD").value;
      let rmkcet = document.getElementById(i + " RMKCET").value;
      let school = document.getElementById(i + " SCHOOL").value;

      

      let obj = new Obj(item, currentQuantity,rmk,rmd,rmkcet,school);

      arr.push(obj);
      
    }

    
    console.log(arr);


    axios.post('http://localhost:3002/dispatch/updateDispatch', {
      ItemArray : arr

    })
    .then(async function (response) {
      await console.log(response.data);
      alert("Items updated successfully")
      window.location.reload();

    })
    .catch(async function (error) {
      await console.log(error);
    });
  };  
    }

    

  const addRow = () => {
    let n=document.getElementById("num").value;
  let ctr=counter;
  for(let i=1;i<=n;i++){
    let x = document.getElementById("table");
    let row = x.insertRow();

    let cell1 = row.insertCell();
    let cell2 = row.insertCell();
    let cell3 = row.insertCell();
    let cell4 = row.insertCell();
    let cell5 = row.insertCell();
    let cell6 = row.insertCell();
    let cell7 = row.insertCell();
    let cell8 = row.insertCell();

    //select

    const select = document.createElement("select");
    select.setAttribute("class", "form-select");
    const option = document.createElement("option");
    const optionText = document.createTextNode("select");
    option.appendChild(optionText);
    option.setAttribute("value", "select");
    select.setAttribute("id", ctr);
    select.addEventListener("change", getQuantity, false);

    select.appendChild(option);

    for (let i = 1; i < items.length; i++) {
      const option = document.createElement("option");
      const optionText = document.createTextNode(items[i].item);
      option.appendChild(optionText);
      option.setAttribute("value", items[i].item);
      select.appendChild(option);
    }

    cell2.appendChild(select);

    // totquantity

    let input1 = document.createElement("input");
    input1.setAttribute("type", "number");
    input1.setAttribute("placeholder", "Total Quantity");
    input1.setAttribute("class", "form-control");
    input1.setAttribute("id", ctr + " totquantity");
    input1.defaultValue = 0;
    input1.disabled = true;
    input1.min=0;

    cell3.appendChild(input1);

    

    //RMK

    let input3 = document.createElement("input");
    input3.setAttribute("type", "number");
    input3.setAttribute("placeholder", "RMK");
    input3.setAttribute("class", "form-control");
    input3.setAttribute("id", ctr + " RMK");
    input3.setAttribute("min",0);
    input3.addEventListener("click",handleClick);
    input3.defaultValue = 0;
    input3.addEventListener("change", addValue, false);
    
    cell4.appendChild(input3);

    //RMD

    let input4 = document.createElement("input");
    input4.setAttribute("type", "number");
    input4.setAttribute("placeholder", "RMD");
    input4.setAttribute("class", "form-control");
    input4.setAttribute("id", ctr + " RMD");
    input4.defaultValue = 0;
    input4.setAttribute("min",0);
    input4.addEventListener("click",handleClick);
    input4.addEventListener("change", addValue, false);

    cell5.appendChild(input4);

    let input5 = document.createElement("input");
    input5.setAttribute("type", "number");
    input5.setAttribute("placeholder", "RMKCET");
    input5.setAttribute("class", "form-control");
    input5.setAttribute("id", ctr + " RMKCET");
    input5.addEventListener("click",handleClick);
    input5.defaultValue = 0;
    input5.addEventListener("change", addValue, false);
    input5.setAttribute("min",0);

    cell6.appendChild(input5);

    //school
    let input6 = document.createElement("input");
    input6.setAttribute("type", "number");
    input6.setAttribute("placeholder", "School");
    input6.setAttribute("class", "form-control");
    input6.setAttribute("id", ctr + " SCHOOL");
    input6.addEventListener("click",handleClick);
    input6.defaultValue = 0;
    input6.addEventListener("change", addValue, false);
    input6.setAttribute("min",0);
    cell7.appendChild(input6);

    //current Quantity

    let input2 = document.createElement("input");
    input2.setAttribute("type", "number");
    input2.setAttribute("placeholder", "Current Quantity");
    input2.setAttribute("class", "form-control");
    input2.setAttribute("id", ctr + " currquantity");
    input2.defaultValue = 0;
    input2.disabled = true;

    cell8.appendChild(input2);

    cell1.innerHTML = ctr;
    ctr+=1;
    
  }
  setCounter(ctr );


  };

  return (
    <div className="container-fluid">
    <div className="row">
      <div className='col-3 dis-side'>
      <ProSidebarProvider>
      <Slidebar/>
</ProSidebarProvider>
      </div>
    
<div className="col-9">
      <div className="container">
        
      <h1 className="h1-dis">FOOD MANAGMENT SYSTEM</h1>
          <h2 className="h2-dis">STOCK DISTRIBUTION</h2>
        <div className="row r-dis">
          <div className="col-3 dat-d">
          <label for="date"> <b>Date:</b></label>
 <input type="date" id="date" name="date" className="inpt-d" required/>
          </div>
           <div className="col-3"></div>
           <div className="col-3">
           <div class="div">
            <label for="number" id="row" className="lab-d"><b>Enter number of rows </b></label>
            <br></br>
            <br></br>
          <input type="number" id="num"  className="inpt-r" min="1" defaultValue={1}/>
          
          <button class="btn btn-primary btn-pur" id="add-btn" onClick={addRow}>Add</button>
          {/* <button onClick={()=>{setmod(true)}}>Add Item</button> */}
           </div>   </div>
        </div>
       <div className="row">
        <div className="col-12 tab-dis">
        <Table striped bordered hover id="table">
  <thead>
    <tr>
      <th>#</th>
      <th>Select Item</th>
      <th>Total Quantity</th>
      
      <th>RMK</th>
      <th>RMD</th>
      <th>RMKCET</th>
      <th>School</th>
      <th>Current Quantity</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>1</td>
      <td>
        <select
          class="form-select"
          aria-label="Default select example"
          onChange={getQuantity}
          id="1"
        >
          <option selected value="select">Select</option>

          {items.map((item, idx) => {
            return (
              <option key={idx} value={item.item}>
                {item.item}
              </option>
            );
          })}
        </select>
      </td>
      <td>
        <div class="input-group mb-3">
          <input
            type="number"
            class="form-control"
            placeholder="Total Quantity"
            aria-label="Recipient's username"
            aria-describedby="basic-addon2"
            id="1 totquantity"
            defaultValue={0}
            disabled
          />
        </div>
      </td>
      
      <td>
        <div class="input-group mb-3">
          <input
            type="number"
            class="form-control"
            placeholder="RMK"
            aria-label="Recipient's username"
            aria-describedby="basic-addon2"
            id="1 RMK"
            defaultValue={0}
            onChange={addValue}
            onClick={handleClick}
            min={0}
          />
        </div>
      </td>

      <td>
        <div class="input-group mb-3">
          <input
            type="number"
            class="form-control"
            placeholder="RMD"
            aria-label="Recipient's username"
            aria-describedby="basic-addon2"
            id="1 RMD"
            defaultValue={0}
            onChange={addValue}
            onClick={handleClick}
            min={0}
          />
        </div>
      </td>
      <td>
        <div class="input-group mb-3">
          <input
            type="number"
            class="form-control"
            placeholder="RMKCET"
            aria-label="Recipient's username"
            aria-describedby="basic-addon2"
            id="1 RMKCET"
            defaultValue={0}
            onChange={addValue}
            onClick={handleClick}
            min={0}
          />
        </div>
      </td>
      <td>
        <div class="input-group mb-3">
          <input
            type="number"
            class="form-control"
            placeholder="School"
            aria-label="Recipient's username"
            aria-describedby="basic-addon2"
            id="1 SCHOOL"
            defaultValue={0}
            onChange={addValue}
            onClick={handleClick}
            min={0}
          />
        </div>
      </td>

      <td>
        <div class="input-group mb-3">
          <input
            type="number"
            class="form-control"
            placeholder="Cureent Quantity"
            aria-label="Recipient's username"
            aria-describedby="basic-addon2"
            id="1 currquantity"
            defaultValue={0}
            disabled
          />
        </div>
      </td>
    </tr>
  </tbody>
</Table>

        </div>
       </div>
       <button onClick={submit} className="btn-dis2 btn btn-success">Submit</button>
      </div>
      </div>
    </div>

    

    </div>
  );
}





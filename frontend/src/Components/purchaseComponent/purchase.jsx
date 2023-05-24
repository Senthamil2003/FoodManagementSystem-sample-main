import React from "react";
import Table from "react-bootstrap/Table";
import axios from "axios";
import { useState ,useEffect} from "react";
import './purchase.css';
import { ProSidebarProvider } from 'react-pro-sidebar';
import Slidebar from '../../Slidebar';
import "../tables.css";
import {Modal} from 'react-bootstrap';
import Button from 'react-bootstrap/Button';

export default function Purchase() {
  
  const [items, setItems] = useState([]);
  const [counter, setCounter] = useState(2);
  const[mod,setmod]=useState(false);

  useEffect(() => {
    axios
      .get("http://localhost:3002/purchase/getItems")
      .then(function (response) {
        setItems(response.data);
      })
      .catch(function (error) {
        console.log(error);
      })
      .finally(function () {
      });
  }, []);

  
  const totAmount = (e) => {
    // let id=e.target.id;
    let element=e.target.id; 
    const split = element.split(" ");
    const id = split[0];
    let quantity=document.getElementById(id+" quantity");
    let amountkg=document.getElementById(id+" amount");
    let total=document.getElementById(id+" total");
    total.value=quantity.value*amountkg.value;
  };

  const getCategory=async (e)=>{
    let item=e.target.value; 
    let element=e.target.id; 
    const split = element.split(" ");
    const id = split[0];
    
    console.log(id)
    let category = document.getElementById(id+" category");
    // let vendor = document.getElementById(id[0]+" vendor"); 
    axios
      .post("http://localhost:3002/purchase/getCategoryVendor", {
        item:item,
      })
      .then(function (response) {
        console.log(response)
        console.log(response.data[0].category);
        category.value = response.data[0].category;
        // vendor.value = response.data[0].vendorName;
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  const submit = () => {
    let arr = [];
    let date = document.getElementById("date").value;
    if(date ==""){
      alert("enter date pleas")
    }else{
    class Obj {
      constructor(item,category,quantity,amount,total) {
        this.item = item.toLocaleUpperCase().trim();
        this.category = category.toLocaleUpperCase().trim();
        this.quantity = quantity;
        this.amount = amount;
        this.total = total;
        this.date = date;
        // this.vendor = vendor;
      }
    }
    for (let i = 1; i < counter; i++) {
      let item = document.getElementById(i+" item").value;
      if(item=="select"){
        break;
      }
      let category = document.getElementById(i+" category").value;
      let quantity=document.getElementById(i+" quantity").value;
      let amountkg=document.getElementById(i+" amount").value;
      let amount=document.getElementById(i+" total").value;
      // let vendor = document.getElementById(i+" vendor").value;
     
      let obj = new Obj(item,category,quantity,amountkg,amount);
      if(obj.item==""){
        continue;
      }
      arr.push(obj);
      console.log(arr,"SEE");
    
    }
    console.log(arr);
    axios.post('http://localhost:3002/purchase/add', {
      date:date,
      arr:arr
    })
    .then(async function (response) {
      await console.log(response.data);
      alert("Items added successfully")
      window.location.reload();

    })
    .catch(async function (error) {
      await console.log(error);
    });
  };
  
    }
    
  const generateRows = () => {

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
    

    const purchaseInput = document.createElement("input");
    purchaseInput.setAttribute("type","text");
    purchaseInput.setAttribute("list","item");
    purchaseInput.setAttribute("id", ctr +" item");
    purchaseInput.addEventListener("blur", getCategory);
    // purchaseInput.setAttribute("value", "select");
    const datalist = document.createElement("datalist");
    datalist.setAttribute("class", "form-select");
    
    datalist.setAttribute("id", "item");
    const option = document.createElement("option");
    const optionText = document.createTextNode("");
    option.appendChild(optionText);
    
  
    
    datalist.appendChild(option);

    for (let i = 1; i < items.length; i++) {
      const option = document.createElement("option");
      const optionText = document.createTextNode(items[i].item);
      option.appendChild(optionText);
      option.setAttribute("value", items[i].item);
      datalist.appendChild(option);
    }
 
    cell2.appendChild(purchaseInput);


    let input1 = document.createElement("input");
    input1.setAttribute("type", "text");
    input1.setAttribute("placeholder", "Category");
    input1.setAttribute("class", "form-control");
    input1.setAttribute("id", ctr + " category");
    cell3.appendChild(input1);


    // let input2 = document.createElement("input");
    // input2.setAttribute("type", "text");
    // input2.setAttribute("placeholder", "Vendor");
    // input2.setAttribute("class", "form-control");
    // input2.setAttribute("id", ctr + " vendor");
    // cell4.appendChild(input2);


    let input3 = document.createElement("input");
    input3.setAttribute("type", "number");
    input3.setAttribute("placeholder", "Quantity");
    input3.setAttribute("class", "form-control");
    input3.setAttribute("id", ctr + " quantity");
    input3.addEventListener("change",totAmount, false);
    cell4.appendChild(input3);


    let input4 = document.createElement("input");
    input4.setAttribute("type", "number");
    input4.setAttribute("placeholder", "Amount");
    input4.setAttribute("class", "form-control");
    input4.setAttribute("id", ctr + " amount");
    input4.addEventListener("change",totAmount, false);
    cell5.appendChild(input4);

    let input5 = document.createElement("input");
    input5.setAttribute("type", "number");
    input5.setAttribute("placeholder", "Total Amount");
    input5.setAttribute("class", "form-control");
    input5.setAttribute("id", ctr + " total");
    input5.disabled=true;
    cell6.appendChild(input5);

    cell1.innerHTML = ctr;
    ctr+=1;
    
}
setCounter(ctr);
}

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-3">
        <ProSidebarProvider>
      <Slidebar/>
</ProSidebarProvider>
        </div>
        <div className="col-9">
          <div className="container">
          <h1 className="h1-dis">FOOD MANAGEMENT SYSTEM</h1>
          <h2 className="h2-dis">PURCHASE</h2>
            <div className="row r-dis">
              <div className="col-3">
              <label for="date" id="date-label"><b >date:</b></label>
          <input type="date" id="date" name="date" className="inpt-d" />
              </div>
              <div className="col-3"></div>
              <div className="col-3">
              <label for="number" id="row"><b>enter number of rows :</b> </label>
              <div class="div">
          <input type="number" id="num"  className="inpt-r" min='0' defaultValue={1}/>
          <button class="btn btn-primary btn-pur" id="add-btn" onClick={generateRows}>Add</button>
          {/* <button onClick={()=>{setmod(true)}}>Add Item</button> */}
              </div></div>
            </div>
            <div className="row tab-dis">
            <Modal show={mod} className="modal-lg">
        {/* <Modal.Header>Enter items to be added</Modal.Header>
        <input type="text"/>
        <Modal.Header>Enter category to be added</Modal.Header>
        <input type="text"/>
        <Modal.Header>Enter vendor to be added</Modal.Header>
        <input type="text"/> */}
        <Table>
          <thead>
            <tr>
              <th>Items</th>
              <th>Category</th>
              {/* <th>Vendors</th> */}
              <th>Quantity</th>
              <th>Amount</th>
              </tr>
          </thead>
          <tbody>
            <tr>
              <td><input/></td>
              <td><input/></td>
              <td><input/></td>
            </tr>
          </tbody>
        </Table>
        <Modal.Body>
        {/* {its.map((e)=>{return(<div>{e.item}</div>)})} */}
        </Modal.Body>
        <Button >Submit</Button>
        <Button onClick={()=>{setmod(false)}}>CLOSE</Button>
      </Modal>
            <Table striped bordered hover id="table">
          <thead  className="t-pur">
            <tr>
              <th>SNo</th>
              <th>Select Item</th>
              <th>Category</th>
              {/* <th>Vendor</th> */}
              <th>Quantity</th>
              <th>Amount</th>
              <th>Total Amount</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>
                <input type="text" list="item" id="1 item" onBlur={getCategory}/>
                <datalist
                  className="form-select"
                  aria-label="Default select example"
                  id="item"
                  hidden
                >                  
                  {items.map((item, idx) => {
                    return (
                      <option key={idx} value={item.item} hidden>
                        {item.item}
                      </option>
                    );
                  })}
                </datalist>
              </td>
              <td>
                <div className="input-group mb-3">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Category"
                    id="1 category"
                    defaultValue=""
                  />
                </div>
              </td>
              {/* <td>
                <div className="input-group mb-3">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Vendor"
                    id="1 vendor"
                 
                    defaultValue=""
                  />
                </div>
              </td> */}
              <td>
                <div className="input-group mb-3">
                  <input
                    type="number"
                    className="form-control"
                    placeholder="Quantity"
                    onChange={totAmount}
                    id="1 quantity"
                  />
                </div>
              </td>

              <td>
                <div className="input-group mb-3">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Amount"
                    onChange={totAmount}
                    id="1 amount"
                  />
                </div>
              </td>
              <td>
                <div className="input-group mb-3">
                  <input
                    type="number"
                    className="form-control"
                    placeholder="Total Amount"
                    id="1 total"
                    disabled
                    defaultValue=""
                  />
                </div>
              </td>
            </tr>
          </tbody>
        </Table>
            </div>
            <button class="btn btn-primary btn-dis1" id="submit-btn" onClick={submit}>Submit</button>
          </div>

        </div>
      </div>

    </div>
  

);
}
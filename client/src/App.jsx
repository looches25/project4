import { useState } from 'react'
import './App.css'
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Login from './pages/Login';
import POSmain from './pages/POSmain';
import POS from './pages/POS';
import ADDmain from './pages/ADDmain';
import POSedit from './pages/POSedit';

function App() {
  const [cart, setCart]= useState([])
  const [edit, setEdit]= useState(false)
  const [edit2, setEdit2]= useState(false)
  const [order, setOrder] = useState([])

  const handleAdd =(item) =>{

    let newItem={
      Name: (item?.SKUname),
      Price:(item?.Price),
      _id:(item._id),
      Qty:1
    }

    const exist = cart.find((x) => (x._id === newItem._id))
    // console.log('e',exist)

    if (exist) {
      exist.Qty= exist.Qty+1
      let indx = cart.indexOf(exist)
      // console.log ('indx', indx)
      cart[indx]= exist
      let addCart = [...cart]
      setCart(addCart)
        } 
    else {
      let addCart = [...cart, newItem]
    setCart(addCart)
    }
}

const handleRemove =(item) => {
  const exist = cart.find((x) => (x._id === item._id))
  if (exist.Qty>1) {
    exist.Qty= exist.Qty-1
    let indx = cart.indexOf(exist)
    cart[indx]= exist
    let newCart = [...cart]
    setCart(newCart)
      } 
  else {
    let newCart = cart.filter((x) => (x._id !== item._id))
  setCart(newCart)
  }
}

const handleBin =(item) => {
    let newCart = cart.filter((x) => (x._id !== item._id))
  setCart(newCart)
  }


    // const orderObj = {
    //   tblNum: user.username,
    //   orders: [{ orderNum: 1, items: [] }],
    // };

    // for (let food of cart) {
    //   orderObj.orders[0].items.push({
    //     name: food.food.name,
    //     price: food.food.price,
    //     quantity: food.qty,
    //     foodPrepared: "off",
    //     foodSent: "off",
    //   });
    // }

    // fetch("/api/orders/new/", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //     Accept: "application/json",
    //   },
    //   body: JSON.stringify(orderObj),
    // });
    // setCart([]);
  

  const handleEdit =() => {
  setEdit(!edit)

  const newOrder = { 
  SKUid: item._id, 
  CartQty: item.Qty, 
  }
    fetch("/api/pos/new/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(newOrder),
    });
    // .catch(error => 
    //   window.alert(error))
    // .then((response) => response.json())
    // .then((data) => {
    //   console.log(data)})
    setOrder(newOrder);
  }

  const handlePay =() => {
console.log ("pay now")    }

console.log ('cart', cart)

let Subtotal= 0
for (let i=0; i<cart.length;i++) {
   Subtotal = Subtotal + (cart[i].Price*cart[i].Qty)
}

const handleQty =(event) => {
  // setEdit(!edit)
  console.log('e', event.target)
  // const exist = cart.find((x) => (x._id === item._id))
    // exist.Qty= 2
    // let indx = cart.indexOf(exist)
    // cart[indx]= exist
    // let addCart = [...cart]
    // setCart(addCart)
}

  return (
    <BrowserRouter>
    <Routes>
    <Route path="/" element={<Login/>} />
    <Route path="/pos" element={<POSmain cart={cart} setCart={setCart} handleAdd={handleAdd} handleRemove={handleRemove} handlePay= {handlePay} handleEdit={handleEdit} handleQty={handleQty} handleBin= {handleBin} Subtotal={Subtotal} edit={edit} setEdit={setEdit} edit2={edit2} setEdit2={setEdit2}/>} />
    <Route path="/add" element={<ADDmain/>} />
    <Route path="/test" element={<POSedit/>} />
    </Routes>
    </BrowserRouter>
  )}
export default App

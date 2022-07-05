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

function App() {
  const [cart, setCart]= useState([])

  const handleAdd =(item) =>{
    let addCart = [...cart,item]
    setCart(addCart)
}
console.log ('c', cart)

  return (
    <BrowserRouter>
    <Routes>
    <Route path="/" element={<Login/>} />
    <Route path="/pos" element={<POSmain cart={cart} setCart={setCart} handleAdd={handleAdd}/>} />
    <Route path="/add" element={<ADDmain/>} />
    <Route path="/test" element={<POS/>} />
    </Routes>
    </BrowserRouter>
  )}
export default App

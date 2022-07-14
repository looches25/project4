import { useState, useEffect } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route} from "react-router-dom";
import Login from "./pages/Login";
import POSmain from "./pages/POSmain";
import AdminMain from "./pages/AdminMain"
import RequireAuth from "./components/RequireAuth";
import AdminEdit from "./pages/AdminEdit";

const cartfromLStorage = JSON.parse(localStorage.getItem("cart")) || []

function App() {
  const [cart, setCart] = useState(cartfromLStorage);
  const [edit, setEdit] = useState(false);
  const [order, setOrder] = useState([]);
  const [user, setUser] = useState({});

  console.log("user", user);

  useEffect (()=> {
    localStorage.setItem("cart", JSON.stringify(cart)); [cart]
  })
  const handleAdd = (item) => {
    let newItem = {
      Name: item?.SKUname,
      Price: item?.Price,
      _id: item._id,
      Qty: 1,
    };

    const exist = cart.find((x) => x._id === newItem._id);

    if (exist) {
      exist.Qty = exist.Qty + 1;
      let indx = cart.indexOf(exist);
      cart[indx] = exist;
      let addCart = [...cart];
      setCart(addCart);
    } else {
      let addCart = [...cart, newItem];
      setCart(addCart);
    }
  };

  const handleRemove = (item) => {
    const exist = cart.find((x) => x._id === item._id);
    if (exist.Qty > 1) {
      exist.Qty = exist.Qty - 1;
      let indx = cart.indexOf(exist);
      cart[indx] = exist;
      let newCart = [...cart];
      setCart(newCart);
    } else {
      let newCart = cart.filter((x) => x._id !== item._id);
      setCart(newCart);
    }
  };

  const handleBin = (item) => {
    let newCart = cart.filter((x) => x._id !== item._id);
    setCart(newCart);
  };

  const handleEdit = () => {
    setEdit(!edit);
  };

  let Subtotal = 0;
  for (let i = 0; i < cart.length; i++) {
    Subtotal = Subtotal + cart[i].Price * cart[i].Qty;
  }
  let Discount = 0;
  if (Subtotal > 100) {
    Discount = 0.1 * Subtotal;
  } else {
    Discount = 0;
  }

  let Total = Subtotal - Discount;

  const handleQty = (event) => {
    console.log("e", event.target);
  };
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />

        <Route
          path="/pos"
          element={
            <POSmain
              cart={cart}
              setCart={setCart}
              user={user}
              setUser={setUser}
              handleAdd={handleAdd}
              handleRemove={handleRemove}
              handleEdit={handleEdit}
              handleQty={handleQty}
              handleBin={handleBin}
              Subtotal={Subtotal}
              Total={Total}
              Discount={Discount}
              edit={edit}
              setEdit={setEdit}
            />
          }
        />

        {/* <Route element={<RequireAuth />}> */}
          <Route path="/admin" element={<AdminMain />} />
          <Route path="/edit" element={<AdminEdit />} />
        {/* </Route> */}
      </Routes>
    </BrowserRouter>
  );
}
export default App;

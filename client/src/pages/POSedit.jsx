import {
  ChevronLeftIcon,
  ChevronRightIcon,
  DeleteIcon,
  EditIcon,
} from "@chakra-ui/icons";
import { IconButton } from "@chakra-ui/react";
import { useState } from "react";

const EditQty = ({ cart, setCart, item }) => {
  // const [qty, setQty] = useState(item.Qty)

  const handleQty2 = (event) => {
    const exist = cart.find((x) => x._id === item._id);

    if (exist) {
      exist.Qty = event.target.value;
      let indx = cart.indexOf(exist);
      cart[indx] = exist;
      let addCart = [...cart];
      setCart(addCart);
    }
  };
  return (
    <>
      <input
        className="change"
        name={item}
        defaultValue={item?.Qty}
        onChange={handleQty2}
      />
    </>
  );
};

export default function POSedit({
  cart,
  setCart,
  handleAdd,
  handleRemove,
  handleBin,
  handleQty,
  edit2,
  setEdit2,
}) {
  const [edit3, setEdit3] = useState("");

  const handleEdit3 = (_id) => {
    if (edit3 === "") {
      setEdit3(_id);
    } else {
      setEdit3("");
    }
  };

  return cart?.map((item, index) => (
    <tr key={index}>
      <td colSpan={2}>{item?.Name}</td>
      <td>${(item?.Price).toFixed(2)}</td>
      <td>
        <IconButton
          colorScheme="blue"
          aria-label="Add Item"
          icon={<ChevronLeftIcon />}
          onClick={() => handleRemove(item)}
        />

        {edit3 === item._id ? (
          <EditQty item={item} cart={cart} setCart={setCart} />
        ) : (
          <p> {item?.Qty} </p>
        )}

        <IconButton
          colorScheme="blue"
          aria-label="Add Item"
          icon={<ChevronRightIcon />}
          onClick={() => handleAdd(item)}
        />
        <IconButton
          colorScheme="blue"
          aria-label="Edit Item"
          icon={<EditIcon />}
          onClick={() => handleEdit3(item._id)}
        />
        <IconButton
          colorScheme="blue"
          aria-label="Delete Item"
          icon={<DeleteIcon />}
          onClick={() => handleBin(item)}
        />
      </td>
      <td>${(item?.Qty * item?.Price).toFixed(2)}</td>
    </tr>
  ));
}

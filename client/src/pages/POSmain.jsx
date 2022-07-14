import TabBox from "../components/TabBox";
import POStab from "./POStab";
import { Button } from "@chakra-ui/react";
import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";
import POSedit from "./POSedit";
import { useNavigate } from "react-router-dom";

export default function POSmain({
  cart,
  handleAdd,
  handleRemove,
  handleBin,
  handleEdit,
  handleQty,
  Subtotal,
  Discount,
  Total,
  edit,
  setCart,
  user,
  setUser,
}) {
  const keypadButtons = [
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "DEL",
    "ENTER",
  ];

  const nav = useNavigate();

  const handlePay = () => {
    const orders = [];
    for (let item of cart) {
      orders.push({
        SKUid: item._id,
        SKUname: item.Name,
        price: item.Price,
        quantity: item.Qty,
      });
    }

    fetch("/api/pos/new", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({ orders }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
        nav("/admin");
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };
  // const handleNumber = (event) => {
  //   console.log("click", event.target.innerHTML);
  // };

  return (
    <div className="container">
      <div className="left">
        <div className="runningtab">
          <table className="tab">
            <thead>
              <tr>
                <th colSpan={2}>Item</th>
                <th>Unit $</th>
                <th>Qty</th>
                <th>Line Total</th>
              </tr>
            </thead>
            <tbody>
              {edit === true ? (
                <POSedit
                  cart={cart}
                  handleAdd={handleAdd}
                  handleRemove={handleRemove}
                  handleBin={handleBin}
                  handleQty={handleQty}
                  setCart={setCart}
                />
              ) : (
                <POStab cart={cart} />
              )}{" "}
            </tbody>
          </table>
          <br />
          <table className="tallytab" align="right">
            <thead>
              <tr>
                <th> Subtotal:</th>

                <td> ${Subtotal.toFixed(2)} </td>
              </tr>
              <tr>
                <th>Discounts:</th>
                <td>${Discount.toFixed(2)}</td>
              </tr>
              <tr>
                <th>Amount Due:</th>
                <td>${Total.toFixed(2)}</td>
              </tr>
            </thead>
          </table>
        </div>
        <div className="keys">
          {/* <div className="keypad-box">
          {keypadButtons.map((key, index) => (
            <div
              className="keypad"
              key={index}
              id={key}
              onClick={() => {
                handleNumber(event);
              }}
            >
              {" "}
              {key}{" "}
            </div>
          ))}
        </div> */}
          {edit === true ? (
                        <Button
                        type="submit"
                        colorScheme="purple"
                        width="30%"
                        height="50%"
                        margin={5}
                        fontSize="50px"
            className="blinking" 
            onClick={handleEdit}>
              Confirm
            </Button>
          ) : (
            <Button
              type="submit"
              colorScheme="purple"
              width="30%"
              height="50%"
              margin={5}
              fontSize="50px"
              onClick={handleEdit}
            >
              Edit Order
            </Button>
          )}
          <Button
            type="submit"
            colorScheme="purple"
            width="30%"
            height="50%"
            margin={5}
            fontSize="50px"
            onClick={handlePay}
          >
            {" "}
            Pay Now{" "}
          </Button>
        </div>
      </div>

      <div className="right">
        <TabBox handleAdd={handleAdd} user={user} setUser={setUser} />
      </div>
    </div>
  );
}

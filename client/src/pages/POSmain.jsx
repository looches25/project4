import TabBox from "../components/TabBox";
import POStab from "./POStab";
import { IconButton } from "@chakra-ui/react";
import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";
import POSedit from "./POSedit";

export default function POSmain({
  cart,
  handleAdd,
  handleRemove,
  handleBin,
  handleEdit,
  handlePay,
  handleQty,
  Subtotal,
  edit,
  setCart
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

  const handleNumber = (event) => {
    console.log("click", event.target.innerHTML);
  };

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
                <th>Discounts</th>
              </tr>
            </thead>
            <tbody>{edit === true ? (<POSedit cart={cart} handleAdd={handleAdd} handleRemove={handleRemove} handleBin={handleBin} handleQty={handleQty} setCart={setCart}/>) : (<POStab cart={cart}/>)} </tbody>

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
                <td>$$1.00</td>
              </tr>
              <tr>
                <th>Amount Due:</th>
                <td>$$18.50</td>
              </tr>
            </thead>
          </table>
        </div>
<div className = "keys">
        <div className="keypad-box">
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
        </div>
        {edit === true ? 
        (
          <div className="blinking" onClick={handleEdit}>Confirm Order</div>
        )
        : (
          <div className="other-keys" onClick={handleEdit}>Edit Order</div>
        )}
          <div className="other-keys" onClick={handlePay}> Cash </div>
          <div className="other-keys" onClick={handlePay}> Stripe </div>
          <div className="other-keys" onClick={handlePay}> Voucher </div>

        
      </div>
      </div>

      <div className="right">
        <TabBox handleAdd={handleAdd} />
      </div>
    </div>
  );
}

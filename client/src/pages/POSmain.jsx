// import { Helmet } from "react-helmet";
import TabBox from "../components/TabBox";
import POStab from "./POSedit";

export default function POSmain({ cart, setCart, handleAdd }) {
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
                <th>Item</th>
                <th>Unit $</th>
                <th>Qty</th>
                <th>Line Total</th>
                <th>Discounts</th>
              </tr>
            </thead>
            <tbody>
              {/* <POStab cart={cart} setCart={setCart}/> */}
              {cart?.map((item) => (
                <tr>
                  <td>{item?.SKUname}</td>
                  <td>${(item?.Price).toFixed(2)}</td>

                  <td>3</td>
                  <td>$10.50</td>
                  <td></td>
                </tr>
              ))}
            </tbody>
          </table>
          <br />
          <table className="tallytab" align="right">
            <thead>
              <tr>
                <th> Subtotal:</th>

                <td>$$19.50</td>
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
      </div>
      <div className="right">
        <TabBox handleAdd={handleAdd} />
      </div>
    </div>
  );
}

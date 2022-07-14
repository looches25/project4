import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { EditIcon } from "@chakra-ui/icons";
import {
  Heading,
  IconButton,
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  FormHelperText,
  Button,
  ButtonGroup,
} from "@chakra-ui/react";

export default function AdminEdit() {
  const [edit2, setEdit2] = useState(false);
  const [sku, setSKU] = useState();
  const [query, setQuery] = useState("");
  const [skuName, setSKUname] = useState("");
  const [unit, setUnit] = useState("");
  const [qty, setQty] = useState(0);
  const [price, setPrice] = useState(0);
  const [skuID, setskuID]= useState('')
  const nav= useNavigate()

//   console.log("deets", skuName, unit, qty, price);

// const isError = skuName === ''|| price === 0 || qty ===0 

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log("handleSubmit now")
    fetch("/api/sku/new", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        //   authorization: "Bearer " + localStorage.getItem("accessToken")
        // Authorization: Bearer + token
      },
      body: JSON.stringify({
        SKUname: skuName,
        Unit: unit,
        SKUQty: qty,
        Price: price,
      }),
    })
      .then((response) => response.json())
      .then((data) => console.log(data.data));

    // setSKUname("");
    // setUnit("");
    // setQty(0);
    // setPrice(0);

    // let newSKU= [...sku]
    // setSKU(newSKU)

    alert('Item added successfully!')
    window.location.reload();

  };

  useEffect(() => {
    console.log("fetching");
    fetch("/api/sku")
      .then((response) => response.json())
      // .then((data) => {console.log(data)});
      .then((data) => {
        setSKU(data.data);
      });
  }, []);

  const getFilteredSearch = (item) => {
    let itemName = item.SKUname.toUpperCase();
    let itemID = item._id.toUpperCase();
    return itemName.includes(query) || itemID.includes(query);
  };

  const filteredSearch = sku?.filter(getFilteredSearch);

  const handleEdit2 = (item) => {
    setEdit2(true);
    console.log("item", item)
    setSKUname(item.SKUname);
    setUnit(item.Unit);
    setQty(item.SKUQty);
    setPrice(item.Price);
    setskuID(item._id)
  };

  const handleUpdate = () => {
//   useEffect(() => {
    fetch(`/api/sku/${skuID}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          //   authorization: "Bearer " + localStorage.getItem("accessToken")
          // Authorization: Bearer + token
        },
        body: JSON.stringify({
          SKUname: skuName,
          Unit: unit,
          SKUQty: qty,
          Price: price,
        }),
      });
//   }, []);

//   setEdit2(false);
//   let newSKU= [...sku]
//   setSKU(newSKU)


alert("Item updated successfully")  
window.location.reload();
}

const handleAddOption = () => {
    setEdit2(false)
      setSKUname("");
      setUnit("");
      setQty(0);
      setPrice(0);
  }

  return (
    <>
      <div className="edit-box">
        {edit2 ? (
          <FormControl className="form-box">
          <Heading>Edit Item</Heading>
          <FormLabel htmlFor="email"> Item ID</FormLabel>
          <Input
            className="edit"
            type="text"
            disabled={true}
            value={skuID}
          />
          <FormLabel htmlFor="email"> Item Name</FormLabel>
          <Input
            className="edit"
            type="text"
            onChange={(e) => setSKUname(e.target.value)}
            value={skuName}
          />
          <FormLabel htmlFor="email">Unit Size:</FormLabel>
          <Input
            className="edit"
            type="text"
            onChange={(e) => setUnit(e.target.value)}
            value={unit}
          />
          <FormLabel htmlFor="email">Inventory/ SKU Quantity:</FormLabel>
          <Input
            className="edit"
            type="number"
            onChange={(e) => setQty(e.target.value)}
            value={qty}
          />
          <FormLabel htmlFor="email">Unit Price:</FormLabel>
          <Input
            className="edit"
            type="number"
            onChange={(e) => setPrice(e.target.value)}
            value={price}
          />
          <br />
          <br />
          <Button colorScheme="blue" onClick={handleUpdate}>
            Update item listing
          </Button>
          <Button onClick={handleAddOption}>
            Click here to add new item

          </Button>
          <br/><br/>
          {/* <p className="Link" onClick={()=> nav(-1)}> Click here to go back to POS system </p> */}
          <Link to= "/pos" className="Link"> Click here to go back to POS system </Link>

        </FormControl>
        ) : (
          <FormControl className="form-box">
            <Heading>Add New Item</Heading>
            <FormLabel htmlFor="email">New Item Name</FormLabel>
            <Input
              className="edit"
              type="text"
              onChange={(e) => setSKUname(e.target.value)}
              value={skuName}
            />
            <FormLabel htmlFor="email">Unit Size:</FormLabel>
            <Input
              className="edit"
              type="text"
              onChange={(e) => setUnit(e.target.value)}
              value={unit}
            />
            <FormLabel htmlFor="email">Inventory/ SKU Quantity:</FormLabel>
            <Input
              className="edit"
              type="number"
              onChange={(e) => setQty(e.target.value)}
              value={qty}
            />
            <FormLabel htmlFor="email">Unit Price:</FormLabel>
            <Input
              className="edit"
              type="number"
              onChange={(e) => setPrice(e.target.value)}
              value={price}
            />
            <br />
            <br />
            <Button colorScheme="blue" onClick={handleSubmit}>
              Add new item listing
            </Button>
            <br/><br/>
            <Link to= "/pos" className="Link"> Click here to go back to POS system </Link>
                      </FormControl>
        )}


        <div className="form-box">
          <Heading> Inventory Listing</Heading>

          <input
            className="search-edit"
            type="text"
            onChange={(e) => setQuery(e.target.value.toUpperCase())}
            placeholder="Click here to start a search"
            variant="filled"
          />

          <table className="listing">
            <thead>
              <tr>
                <th>Item ID</th>

                <th colSpan={2}>Item</th>
                <th>Unit Price</th>
              </tr>
            </thead>
            <tbody>
              {filteredSearch?.map((item, index) => (
                <tr key={index}>
                  <td>{item._id}</td>
                  <td colSpan={2}> {item?.SKUname} </td>
                  <td> ${(item?.Price).toFixed(2)}</td>
                  <td>
                    <IconButton
                      colorScheme="blue"
                      aria-label="Add Item"
                      icon={<EditIcon />}
                      onClick={() => handleEdit2(item)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

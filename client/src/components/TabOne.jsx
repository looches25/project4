import { useState, useEffect } from "react";
import { AddIcon } from "@chakra-ui/icons";
import {
  IconButton,
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  FormHelperText,
  Button,
  ButtonGroup
} from '@chakra-ui/react'

export default function TabOne({ handleAdd }) {
  const [tabOne, setTabOne] = useState();
const [skuName, setSKUname]= useState('')
const [unit, setUnit]= useState('')
const [qty, setQty]= useState(0)
const [price, setPrice]= useState(0)

console.log("deets", skuName, unit, qty, price)

const handleSubmit= (e) => {
  
  // console.log("handleSubmit now")
  fetch("/api/sku/new", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      SKUname:skuName,
      Unit:unit,
      SKUQty:qty,
      Price:price
    }),
  })
    .then((response) => response.json())
    .then((data) => {console.log(data.data)});
    // .then((data) => {
    //   setTabOne(data.data);
    // });
}


  useEffect(() => {
    console.log("fetching");
    fetch("/api/sku")
      .then((response) => response.json())
      // .then((data) => {console.log(data)});
      .then((data) => {
        setTabOne(data.data);
      });
  }, []);

  console.log("t", tabOne);

  return (
    <>

<FormControl>
  <FormLabel htmlFor='email'>New Item Name</FormLabel>
  <Input id='email' type='text' onChange={(e)=>setSKUname(e.target.value)}/>
  <FormLabel htmlFor='email'>Unit Size:</FormLabel>
  <Input id='email' type='text' onChange={(e)=>setUnit(e.target.value)}/>
  <FormLabel htmlFor='email'>Inventory/ SKU Quantity:</FormLabel>
  <Input id='email' type='number' onChange={(e)=>setQty(e.target.value)}/>
  <FormLabel htmlFor='email'>Unit Price:</FormLabel>
  <Input id='email' type='number' onChange={(e)=>setPrice(e.target.value)}/>

  <Button 
  colorScheme='blue'
  onClick = {handleSubmit}>
    
    Add new item listing
    
    </Button>
  
</FormControl>

<p> Latest Items Listed:</p>
    <table className="listing">
      <thead>
        <tr>
          <th></th>

          <th colSpan={5}>Item</th>
          <th>Unit $</th>
        </tr>
      </thead>
      <tbody>
        {tabOne?.map((item, index) => (
          <tr key={index}>
            <th>
              <IconButton
                colorScheme="blue"
                aria-label="Add Item"
                icon={<AddIcon />}
                onClick={() => handleAdd(item)}
              />
            </th>
            <td colSpan={5}> {item?.SKUname} </td>
            <td> ${(item?.Price).toFixed(2)}</td>
          </tr>
        ))}
      </tbody>
    </table>
    </>
  );
}

import { useState, useEffect } from "react";
import { IconButton } from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";

export default function TabThree({ handleAdd }) {
  const [query, setQuery] = useState("");
  const [tabTwo, setTabTwo] = useState();

  useEffect(() => {
    console.log("fetching");
    fetch("/api/sku")
      .then((response) => response.json())
      // .then((data) => {console.log(data)});
      .then((data) => {
        setTabTwo(data.data);
      });
  }, []);

//   console.log("t2", tabTwo);


  const getFilteredSearch = (item) => {
    let itemName = item._id.toUpperCase()
    return itemName.includes(query)
  }

  const filteredSearch = tabTwo?.filter(getFilteredSearch)

  console.log('filteredsearch', query, filteredSearch)

  return (
    <>
      <input 
      className="search"
      type="text" 
      onChange={(e) => setQuery(e.target.value.toUpperCase())} 
      placeholder='Click here to start a search'
      variant="filled"
      />
      <br/>       <br/>

      <p> Possible Results:</p><br/>

      <table className="listing">
      <thead>
        <tr>
          <th></th>

          <th colSpan={5}>Item</th>
          <th>Unit $</th>
        </tr>
      </thead>
      <tbody>
        {filteredSearch?.map((item, index) => (
          <tr key={index}>
            <th>
              <IconButton
                colorScheme="blue"
                aria-label="Add Item"
                icon={<AddIcon />}
                onClick={() => handleAdd(item)}
              />
            </th>
            <td colSpan={5}> {item?._id} </td>
            <td> ${(item?.Price).toFixed(2)}</td>
          </tr>
        ))}
      </tbody>
    </table>

  
    </>
  );
}

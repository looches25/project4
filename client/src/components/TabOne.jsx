import { useState, useEffect } from "react";
import { IconButton } from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";

export default function TabOne({ handleAdd }) {
  const [tabOne, setTabOne] = useState();

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
    <table className="listing">
      <thead>
        <tr>
          <th></th>

          <th>Item</th>
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
            <td> {item?.SKUname} </td>
            <td> ${(item?.Price).toFixed(2)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

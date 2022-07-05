import { ChevronUpIcon, ChevronDownIcon } from "@chakra-ui/icons";
import { IconButton } from "@chakra-ui/react";

export default function POSedit({cart, setCart}) {
  return (
    
    cart?.map((item)=> (

      <tr>
        <td>{item?.SKUname}</td>
        <td>{item?.Price}</td>

        <td>3</td>
        <td>$$10.50</td>
        <td></td>
      </tr>
    ))
    
  );
}

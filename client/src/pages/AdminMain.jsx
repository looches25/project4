import { Text } from "@chakra-ui/react";
import { useEffect, useState } from "react"
export default function AdminMain () {

    const [orders, setOrders]= useState()
    useEffect(() => {
        console.log("fetching");
        fetch("/api/pos")
          .then((response) => response.json())
          // .then((data) => {console.log(data)});
          .then((data) => {
            setOrders(data.data);
          });
      }, []);

      console.log('o', orders)
    
    return (
        <div className="listing">
        
      <Text fontSize='50px' color='tomato'> Thanks for a great 12 weeks! </Text>
      <br/>
      <Text fontSize='50px' color='tomato'> All the best!</Text>
        </div>
    )
}
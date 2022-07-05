import { useEffect, useState } from "react";
import { Tabs, TabList, TabPanels, Tab, TabPanel} from '@chakra-ui/react'
import TabOne from "./TabOne";

export default function TabBox({handleAdd}) {

  return (

 <Tabs isFitted variant='enclosed' size='md'>
  <TabList mb='1em'>
    <Tab fontSize='2xl'>One</Tab>
    <Tab fontSize='2xl'>Two</Tab>
    <Tab fontSize='2xl'>Three</Tab>
  </TabList>
  <TabPanels>
    <TabPanel>
      <TabOne handleAdd={handleAdd}/>
    </TabPanel>
    <TabPanel>
      <p>two!</p>
    </TabPanel>
    <TabPanel>
      <p>three!</p>
    </TabPanel>
  </TabPanels>
</Tabs>
  )
}


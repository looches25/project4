import { useEffect, useState } from "react";
import { Tabs, TabList, TabPanels, Tab, TabPanel, Heading } from "@chakra-ui/react";
import TabOne from "./TabOne";
import TabTwo from "./TabTwo";
import TabThree from "./TabThree";

export default function TabBox({ handleAdd, user, setUser}) {
  return (
    <>
    <Heading> Search Products</Heading>
    <Tabs isFitted variant="enclosed" size="md">
      <TabList mb="1em">
        <Tab fontSize="2xl">Listing</Tab>
        <Tab fontSize="2xl">By Name</Tab>
        <Tab fontSize="2xl">By ID</Tab>
      </TabList>


      <TabPanels>
        <TabPanel>
          <TabOne handleAdd={handleAdd, user, setUser} />
        </TabPanel>
        <TabPanel>
          <TabTwo handleAdd={handleAdd} />
        </TabPanel>
        <TabPanel>
        <TabThree handleAdd={handleAdd} />
        </TabPanel>
      </TabPanels>
    </Tabs>
    </>
  );
}

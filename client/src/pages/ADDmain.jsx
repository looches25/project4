import TabBox from "../components/TabBox";
import { useFormik } from "formik";
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  VStack
} from "@chakra-ui/react";
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react'

export default function ADDmain() {

    const formik = useFormik({
        initialValues: {
          skuname: "",
          unit: "",
          price: ""
        },
        onSubmit: (values) => {
          alert(JSON.stringify(values, null, 2));
        }
      });

  return (
    <div className="container">
    <div className="left">
<Flex bg="gray.100" align="center" justify="center" h="100vh" >
      {/* <Box bg="white" p={6} rounded="lg" w='md'> */}
      <Box className="box">
        <form onSubmit={formik.handleSubmit}>
          <VStack spacing={4} align="flex-start">
            <FormControl>
              <FormLabel htmlFor="skuname" fontSize='xl'>SKU name</FormLabel>
              <Input
                id="skuname"
                name="skuname"
                type="skuname"
                variant="filled"
                onChange={formik.handleChange}
                value={formik.values.skuname}
              />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="unit" fontSize='xl'>Unit</FormLabel>
              <Input  
                id="unit"
                name="unit"
                type="unit"
                variant="filled"
                onChange={formik.handleChange}
                value={formik.values.unit}
              />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="price" fontSize='xl'>Price</FormLabel>
              <Input
                id="price"
                name="price"
                type="price"
                variant="filled"
                onChange={formik.handleChange}
                value={formik.values.price}
              />
            </FormControl>
           
            <Button type="submit" colorScheme="purple" width="full" fontSize='xl'>
              Update
            </Button>
          </VStack>
        </form>
      </Box>
    </Flex>

</div>
<div className="right">
<TabBox/>

{/* <TabBox Tabs={Tabs} TabList={TabList} TabPanels={TabPanels} Tab={Tab} TabPanel={TabPanel}/> */}
</div>
</div>
  );
}

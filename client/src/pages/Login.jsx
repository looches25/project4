import { useFormik } from "formik";
import {
  Box,
  Button,
  Checkbox,
  Flex,
  FormControl,
  FormLabel,
  Input,
  VStack
} from "@chakra-ui/react";

export default function Login() {

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
      rememberMe: false
    },
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    }
  });

  return (
    <Flex bg="gray.100" align="center" justify="center" h="100vh">
      {/* <Box bg="white" p={6} rounded="md"> */}
      <Box className="box" style={{ 
        maxWidth: '40rem'}}>
        <form onSubmit={formik.handleSubmit}>
          <VStack spacing={4} align="flex-start">
            <FormControl>
              <FormLabel htmlFor="username" fontSize='xl'>Username</FormLabel>
              <Input
                id="username"
                name="username"
                type="username"
                variant="filled"
                onChange={formik.handleChange}
                value={formik.values.username}
              />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="password" fontSize='xl'>Password</FormLabel>
              <Input
                id="password"
                name="password"
                type="password"
                variant="filled"
                onChange={formik.handleChange}
                value={formik.values.password}
              />
            </FormControl>
            <Checkbox
              id="rememberMe"
              name="rememberMe"
              onChange={formik.handleChange}
              isChecked={formik.values.rememberMe}
              colorScheme="purple"
            >
              Remember me?
            </Checkbox>
            <Button type="submit" colorScheme="purple" width="full" fontSize='xl'>
              Login
            </Button>
          </VStack>
        </form>
      </Box>
    </Flex>
  );
}

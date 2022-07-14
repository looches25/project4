import { useRef, useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";

import axios from "../api/axios";
const LOGIN_URL = "/auth";
import useAuth from "../hooks/useAuth";

import { useFormik } from "formik";
import {
  Box,
  Button,
  Checkbox,
  Flex,
  FormControl,
  FormLabel,
  Input,
  VStack,
} from "@chakra-ui/react";

export default function Login() {

  const {setAuth} = useAuth()

  const [user, setUser] = useState("");

  const navigate = useNavigate();


  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
      rememberMe: false,
    },

    onSubmit: (values) => {
      fetch("/api/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        withCredentials: true,
        body: JSON.stringify({
          name: values.username,
          password: values.password,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          // const accessToken= data.accessToken
          const role= data.category
          console.log(data.data, role)
          // setAuth({accessToken, role})
          // if (role === "manager") {
          if (data.status === "success") {
            navigate("/pos");
          } else if (data.status === "failed") {
          // } else if (role === "cashier") {
            alert(data.data);
            // alert('Please call your manager')
          }
        })
        .catch((error) => {
          alert("There's some other error")
        });
    },
  });

 
  return (
    // (success === true ? (
    //   <p> Login success, loading... </p>
    // ) : (
    <Flex bg="gray.100" align="center" justify="center" h="100vh">
      {/* <Box bg="white" p={6} rounded="md"> */}
      <Box
        className="box"
        style={{
          maxWidth: "40rem",
        }}
      >
        <form onSubmit={formik.handleSubmit}>
          {/* <form onSubmit={handleSubmit}> */}
          <VStack spacing={4} align="flex-start">
            <FormControl>
              <FormLabel htmlFor="username" fontSize="xl">
                Username
              </FormLabel>
              <Input
                type="text"
                id="username"
                // name="username"
                // ref= {userRef}
                variant="filled"
                // onChange={(e)=> setUser(e.target.value)}
                onChange={formik.handleChange}
                value={formik.values.username}
                // value={user}
                required
              />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="password" fontSize="xl">
                Password
              </FormLabel>
              <Input
                id="password"
                // name="password"
                type="password"
                variant="filled"
                // onChange={(e)=> setPwd(e.target.value)}
                onChange={formik.handleChange}
                // value={pwd}
                value={formik.values.password}
                required
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
            <Button
              type="submit"
              colorScheme="purple"
              width="full"
              fontSize="xl"
            >
              Login
            </Button>
          </VStack>
        </form>
      </Box>
    </Flex>
  );
}

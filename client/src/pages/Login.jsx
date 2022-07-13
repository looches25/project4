import {useRef, useEffect, useState, useContext} from 'react'
import { Navigate, useNavigate } from "react-router-dom";

import AuthContext from '../context/AuthProvider';
import axios from '../api/axios';
const LOGIN_URL= '/auth'

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

//   const{setAuth} = useContext(AuthContext)

//   const userRef= useRef()
//   const errRef= useRef()

  const [user, setUser]= useState('')
//   const [pwd, setPwd] = useState('')
  const [errMsg, setErrMsg]= useState('')
//   const [success, setSuccess]= useState(false)
const navigate = useNavigate()


//   useEffect(()=>{
//     userRef.current.focus();
//   },[])

//   useEffect(()=>{
//     setErrMsg('');
//   },[user, pwd])

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
      rememberMe: false
    },
    // onSubmit: (values) => {
    //   alert(JSON.stringify(values, null, 2));
    // }

    onSubmit: (values) => {
// console.log(values.username, values.password)
      fetch("/api/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({name: values.username, password: values.password}),
      })
      .then(response => response.json())
      .then(data => {
        console.log('Success:', data);
        navigate("/pos")
      })
      .catch((error) => {
        console.error('Error:', error);
        setErrMsg("Too bad you can't login")
      });
 
          }
  });


//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {

//       const response = await axios.post(
//         LOGIN_URL, 
//         JSON.stringify({user, pwd}),
//         {

//           headers:{'Content-Type': 'application/json'},
//           withCredentials: true

//         }
//         );
//         console.log(JSON.stringify(response?.data))
//         const accessToken = response?.data.accessToken
//         const roles = response?.data?.roles
//         setAuth({user, pwd, roles, accessToken})
// setUser('')
//     setPwd('')
//     setSuccess(true)
//     } catch (err) {
//       setErrMsg("Too bad you can't login")
//     }
//     errRef.current.focus()

//     console.log(user, pwd)
    
//   }
  return (

// (success === true ? (
//   <p> Login success, loading... </p>
// ) : (
    <Flex bg="gray.100" align="center" justify="center" h="100vh">
      {/* <Box bg="white" p={6} rounded="md"> */}
      <Box className="box" style={{ 
        maxWidth: '40rem'}}>
        <form onSubmit={formik.handleSubmit}>
        {/* <form onSubmit={handleSubmit}> */}
          <VStack spacing={4} align="flex-start">
            <FormControl>
              <FormLabel htmlFor="username" fontSize='xl'>Username</FormLabel>
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
              <FormLabel htmlFor="password" fontSize='xl'>Password</FormLabel>
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
            <Button type="submit" colorScheme="purple" width="full" fontSize='xl'>
              Login
            </Button>
          </VStack>
        </form>
      </Box>
    </Flex>
  )
}

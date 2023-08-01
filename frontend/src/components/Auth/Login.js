import React, { useState } from "react";
import { VStack, Box, FormControl, FormLabel, Input, InputGroup, InputRightElement, Button } from "@chakra-ui/react";
import { useToast } from '@chakra-ui/react'
import axios from 'axios';
import {useNavigate} from "react-router-dom";

const Login = ()=>{
    const [show, setShow] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loding, setLoding] = useState(false);
    const toast = useToast(); //jnvjkfnvjkfnvjkn
    const history = useNavigate();

    const handleClick = () => setShow(!show);

    const submitHandler = async(e) => {
        e.preventDefault();
        setLoding(true);
        if(!email || !password){
             toast({
                title: 'Please fill all the fields carefully',
                status: 'warning',
                duration: 5000,
                isClosable: true,
                position: "bottom-left"
              });
               setLoding(false);
              return;
        }

        try {
            const config = {
                headers : {
                    'Content-type' : 'application/json',   
                }
            };

            const data = await axios.post('/api/user/login', {email, password}, config);
            if(data.data.length === 0){
                toast({
                    title: 'UserName and password are incorrect',
                    status: 'Error',
                    duration: 5000,
                    isClosable: true,
                    position: "bottom-left"
                  });
                  setLoding(false);
                  return ;
            } else {
                toast({
                    title: 'Login successfull',
                    status: 'success',
                    duration: 5000,
                    isClosable: true,
                    position: "bottom-left"
                  });
    
                  localStorage.setItem('userInfo', JSON.stringify(data));
    
                  setLoding(false);
                  history('/chats');
            }
           

            
        } catch (error) {
            toast({
                title: 'Error Occured !',
                description : error.response.data.message,
                status: 'Error',
                duration: 5000,
                isClosable: true,
                position: "bottom-left"
              });
        }
    
    }

    return <VStack spacing={4}>
    <FormControl id="frist-email" isRequired>
        <FormLabel>Email</FormLabel>
        <Input placeholder="Enter Email" onChange={(e)=>setEmail(e.target.value)} />
    </FormControl>
    <FormControl id="frist-password" isRequired>
        <FormLabel>Password</FormLabel>
        <InputGroup>
        <Input type={show ? "text" : "password"} placeholder="Enter Password" onChange={(e)=>setPassword(e.target.value)} />
        <InputRightElement width="4.5rem">
            <Button h="1.75rem" size="sm" onClick={handleClick}>{show ? "Hide":"Show"}</Button>
        </InputRightElement>
        </InputGroup>
    </FormControl>

    <Button colorScheme={"blue"} width="100%" style={{ marginTop:15 }} onClick={submitHandler} isLoading={loding}>
        Sign-in
    </Button>

    <Button variant={"solid"} colorScheme={"red"} width="100%" style={{ marginTop:15 }} onClick={()=>{
        setEmail("guest@exmple.com");
        setPassword("123456");
    }}>
        Guest Cradential Login
    </Button>
  
</VStack>
}

export default Login;
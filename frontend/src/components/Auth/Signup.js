import React, { useState } from "react";
import { VStack, FormControl, FormLabel, Input, InputGroup, InputRightElement, Button, Toast } from "@chakra-ui/react";
import { useToast } from '@chakra-ui/react'
import axios from 'axios';
import {useNavigate} from "react-router-dom";

const Signup = () => {
    const [show, setShow] = useState(false);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmpassword, setConfirmpassword] = useState("");
    const [pic, setPic] = useState("");
    const [loding, setLoding] = useState(false);
    const toast = useToast();
    const history = useNavigate();
    const [errormsg, setError] = useState({name : "", email: "", password:"", confirmpassword:""});
    const handleClick = () => setShow(!show);

    const postDetail = (pics) => {
        setLoding(true);
        if(pics == undefined){
            toast({
                title: 'Please select an Image',
                status: 'warning',
                duration: 5000,
                isClosable: true,
                position: "bottom-left"
              });

              return;
        }

        if(pics.type === 'image/jpeg' || pics.type === 'image/png'){
            console.log(pics);
            const data = new FormData();
            data.append("file", pics);   
             setLoding(false);
            console.log(data);
        }
    }

    function isEmail(emailAdress){
        let regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    
      if (emailAdress.match(regex)) 
        return true; 
    
       else 
        return false; 
    }

    function checkValid(e){
        let fname = e.target.name;
        let value = e.target.value;

        if(fname === "name" && !value) { setError({name: "Name is required"}) } else { null } 
        if(fname === "email" && !value) { setError({email: "Please Enter a valid email !"}); return; } else {null} 
        if(fname === "password" && !value) { setError({password: "Please Enter a valid password !"}); return; } else {null} 
        if(fname === "cpass" && !value) { setError({confirmpassword: "Please Enter a valid password !"}); return;} else {null} 
        
    }

    const submitHandler = async() => {
        setLoding(true);
        if(!name || !email || !password || !confirmpassword){
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
        
        if(isEmail(email)){
            try {
                const config = {
                    headers : {
                        'Content-type' : 'application/json',   
                    }
                };
    
                const data = await axios.post('/api/user', {name, email, password}, config);
                toast({
                    title: 'register successfull',
                    status: 'success',
                    duration: 5000,
                    isClosable: true,
                    position: "bottom-left"
                  });
    
                  localStorage.setItem('userInfo', JSON.stringify(data));
    
                  setLoding(false);
                  history('/chats');
    
                
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
        } else {

        }


    }

    return <VStack spacing={4}>
        <FormControl id="frist-name" isRequired>
            <FormLabel>Name</FormLabel>
            <Input name="name" placeholder="Enter Name" onChange={(e)=>setName(e.target.value)} onBlur={checkValid} />
            { errormsg && errormsg.name ? errormsg.name : null }
        </FormControl>
        <FormControl id="frist-email" isRequired>
            <FormLabel>Email</FormLabel>
            <Input name="email" placeholder="Enter Email" onChange={(e)=>setEmail(e.target.value)} onBlur={checkValid} />
            { errormsg && errormsg.email ? errormsg.email : null }
        </FormControl>
        <FormControl id="frist-password" isRequired>
            <FormLabel>Password</FormLabel>
            <InputGroup>
            <Input name="password" type={show ? "text" : "password"} placeholder="Enter Password" onBlur={checkValid} onChange={(e)=>setPassword(e.target.value)} />
            { errormsg && errormsg.password ? errormsg.password : null }
            <InputRightElement width="4.5rem">
                <Button h="1.75rem" size="sm" onClick={handleClick}>{show ? "Hide":"Show"}</Button>
            </InputRightElement>
            </InputGroup>
        </FormControl>
        <FormControl id="confirm-password" isRequired>
            <FormLabel>Password</FormLabel>
            <InputGroup>
            <Input name="cpass" type={show ? "text" : "password"} placeholder="Confirm Password" onBlur={checkValid} onChange={(e)=>setConfirmpassword(e.target.value)} />
            { errormsg && errormsg.confirmpassword ? errormsg.confirmpassword : null }
            <InputRightElement width="4.5rem">
                <Button h="1.75rem" size="sm" onClick={handleClick}>{show ? "Hide":"Show"}</Button>
            </InputRightElement>
            </InputGroup>
        </FormControl>
        <FormControl id="frist-email" isRequired>
            <FormLabel>Profile Image</FormLabel>
            <Input type="file" p={1.5} accept="image/*" onChange={(e)=>postDetail(e.target.files[0])} />
        </FormControl>
        <Button colorScheme={"blue"} width="100%" style={{ marginTop:15 }} onClick={submitHandler} isLoading={loding}>
            Signup
        </Button>
      
    </VStack>
}

export default Signup;
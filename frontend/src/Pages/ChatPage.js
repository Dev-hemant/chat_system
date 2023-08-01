import React, { useEffect } from "react";
import axios from 'axios';
const ChatPage  = () =>{

    const fetchChat = async ()=>{
       const {data} = await axios.get('https://jsonplaceholder.typicode.com/todos');

       console.log(data);
    }

    useEffect(()=>{
        fetchChat();
    },[])

    return ( 
        <div>
            <h1>Chat</h1>
        </div>
    )
}

export default ChatPage;
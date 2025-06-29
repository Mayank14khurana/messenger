'use client';

import useConversation from "@/hooks/useConversation";
import { FullMessageType } from "@/types";
import { useEffect, useRef, useState } from "react";
import MessageBox from "./MessageBox";
import axios from "axios";

interface BodyProps {
  initialMessages: FullMessageType[]
}

const Body: React.FC<BodyProps> = ({initialMessages}) => {
  
  const [messages,setMessages]=useState(initialMessages);
  const bottomRef =useRef<HTMLDivElement>(null);
  const {conversationId} =useConversation();

  useEffect(()=>{
    axios.post(`/api/conversations/${conversationId}/seen`)
  },[conversationId]);

  return (
    <div className="flex-1 overflow-y-auto">
     {
      messages.map((msg,i)=>(
        <MessageBox isLast={i===messages.length-1} key={msg.id} data={msg} />
      ))
     }
     <div ref={bottomRef} className="pt-24" />
    </div>
  )
}

export default Body

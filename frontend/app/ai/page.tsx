"use client"

import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";
import { useState } from "react";
import axios from "axios";

export default function AI() {
  const [answer, setAnswer]= useState("")
  const [question, setQuestion] = useState("")
  const [ask, setAsk]= useState("")
  const [isLoading, setIsLoading] = useState(false);

  const fetchaianswer = async()=>{
    setQuestion(ask)
    setAnswer("")
    setIsLoading(true)
    try{
        const response= await axios.post('https://stockpilot.todoapplication.tech/api/v1/ai/query',{
            userQuery: ask
        });
        if(response){
            setAnswer(response.data.answer)
        }
    }
    catch(e){
        setAnswer("Please try again!")
    }
    finally{
        setIsLoading(false)
        setAsk("")
    }
  }

  return (
    <div className="w-full h-screen flex flex-col bg-slate-950 text-white overflow-hidden">
      <div className="flex-1 overflow-y-auto p-4 space-y-6 w-10/12 mx-auto hide-scrollbar pt-24">
        {question==="" ? null : 
        <div className="flex justify-end">
            <div className="max-w-3xl rounded-lg p-4 bg-blue-600 rounded-br-none">
                <p className="whitespace-pre-wrap">{question}</p>
            </div>
        </div>}
        {answer==="" ? null :
        <div className="flex justify-start">
            <div className="max-w-3xl rounded-lg p-4 bg-slate-800 rounded-bl-none">
                <p className="whitespace-pre-wrap">{answer}</p>
            </div>
        </div>}   
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-slate-800 rounded-lg rounded-bl-none p-4 max-w-3xl">
              <div className="flex space-x-2">
                <div className="w-2 h-2 rounded-full bg-slate-400 animate-bounce"></div>
                <div className="w-2 h-2 rounded-full bg-slate-400 animate-bounce delay-100"></div>
                <div className="w-2 h-2 rounded-full bg-slate-400 animate-bounce delay-200"></div>
              </div>
            </div>
          </div>
        )}
      </div>
      <div className="p-2 border-t border-slate-800 flex-shrink-0 bg-slate-950">
        <div className="flex justify-center w-10/12 items-center mx-auto gap-2">
          <Textarea
            value={ask}
            onChange={(e) => setAsk(e.target.value)}
            className="resize-none h-[60px] bg-slate-900 border-slate-700 focus:border-blue-500"
            placeholder="Type your message here..."
          />
          <Button onClick={()=>{
            fetchaianswer()
          }}
            disabled={!ask.trim() || isLoading}
            className="h-12 w-12 bg-blue-600 hover:bg-blue-700 disabled:opacity-50">
            <Send className="h-5 w-5" />
          </Button>
        </div>
      </div>
      <style jsx global>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
}
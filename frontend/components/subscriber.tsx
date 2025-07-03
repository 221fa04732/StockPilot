"use client"

import { toast } from "sonner"
import { Input } from "./ui/input"
import { Button } from "./ui/button"
import { useState } from "react"

export default function Subscribe(){
    const [email, setEmail]= useState<string>("")
    return(<div className="w-full flex items-center gap-2">
        <Input className="w-full text-white" value={email} onChange={(e)=>setEmail(e.target.value)} type="email" placeholder="example@gmail.com"/>
        <Button onClick={()=>{
            if(email===""){
                toast.error("Provide valid email")
            }else{
                toast.message("Subscribed sucessfully!")
                setEmail("")
            }
        }} type="submit" variant="outline" className="cursor-pointer">Subscribe</Button>
    </div>)
}
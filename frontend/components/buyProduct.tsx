"use client"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogHeader,
  DialogTitle,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState } from "react"
import axios from 'axios'
import { BACKEND_URL } from "@/config"
import { toast } from "sonner"
import { mutate } from "swr"

export function BuyProduct({id, page, searchWord} : {id: string, page: number, searchWord: string}) {
    const [loader, setLoader]= useState<number>(1)
    const [quantity, setQuantity]= useState<number>(0)
    const buyproduct = async()=>{
        setLoader(0)
        try {
            const response = await axios.post(`${BACKEND_URL}/api/v1/product/buy`,{
                quantity : quantity,
                id: id
            })
            if (response) {
                toast.message("Congratulations! Purchase successful")
                mutate(`${BACKEND_URL}/api/v1/product?page=${page}&search=${searchWord}`)
            }
        } 
        catch(e){
            toast.error("Failed to Purchase product")
        }
        finally{
            setLoader(1)
        }
    }

    return (<Dialog>
      <div>
        <DialogTrigger asChild>
          <button className="w-full flex-1 py-2 px-3 bg-green-900/60 hover:bg-green-800/60 text-green-500 text-xs font-medium rounded transition-colors cursor-pointer">Buy</button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px] bg-gray-950 text-white">
          <DialogHeader>
            <DialogTitle className="flex justify-center">Buy Product</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 mt-2">
            <div className="grid gap-3">
              <Label>Quantity</Label>
              <Input required value={quantity} onChange={(e)=> setQuantity(Number(e.target.value))}/>
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button className="bg-red-500 hover:bg-red-400 hover:text-white shadow-red-950 cursor-pointer">cancel</Button>
            </DialogClose>
            <Button className="bg-gray-900 hover:bg-gray-800 hover:text-white shadow-gray-950 cursor-pointer" onClick={()=>{
                buyproduct()
            }}>{loader===0 ? "loading..." : "buy product"}</Button>
          </DialogFooter>
        </DialogContent>
      </div>
    </Dialog>
  )
}
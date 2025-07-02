"use client"

import { Button } from "@/components/ui/button"
import {
  Dialog,
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

export function ProductDialogDemo() {
    const [loader, setLoader]= useState<number>(1)
    const [name, setName]= useState<string>("")
    const [category, setCategory]= useState<string>("")
    const [price, setPrice]= useState<number>(0)
    const [quantity, setQuantity]= useState<number>(0)
    const addproduct = async()=>{
        setLoader(0)
        try {
            const response = await axios.post(`${BACKEND_URL}/api/v1/product/add`,{
                name : name,
                category : category,
                quantity : quantity,
                price : price
            })
            if (response) {
                toast.message("product added successfully!")
            }
        } 
        catch(e){
            toast.error("Failed to add product")
        }
        finally{
            setLoader(1)
        }
    }

    return (<Dialog>
      <div>
        <DialogTrigger asChild>
          <Button className="bg-gray-900 hover:bg-gray-800 hover:text-white shadow-gray-950">add product</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px] bg-gray-950 text-white">
          <div className="grid gap-4 mt-2">
            <div className="grid gap-3">
              <Label>Name</Label>
              <Input required value={name} onChange={(e)=> setName(e.target.value)}/>
            </div>
            <div className="grid gap-3">
              <Label>Category</Label>
              <Input required value={category} onChange={(e)=> setCategory(e.target.value)}/>
            </div>
            <div className="grid gap-3">
              <Label>Unit Price</Label>
              <Input required value={price} onChange={(e)=> setPrice(Number(e.target.value))}/>
            </div>
            <div className="grid gap-3">
              <Label>Quantity</Label>
              <Input required value={quantity} onChange={(e)=> setQuantity(Number(e.target.value))}/>
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button className="bg-red-500 hover:bg-red-400 hover:text-white shadow-red-950">cancel</Button>
            </DialogClose>
            <Button className="bg-gray-900 hover:bg-gray-800 hover:text-white shadow-gray-950" onClick={()=>{
                addproduct()
            }}>{loader===0 ? "loading..." : "add product"}</Button>
          </DialogFooter>
        </DialogContent>
      </div>
    </Dialog>
  )
}
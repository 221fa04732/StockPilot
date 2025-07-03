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
import { toast } from "sonner"
import { ProductType } from "./productCard"
import { mutate } from "swr"

export function EditProduct({product, page, searchWord} : {product : ProductType, page: number, searchWord: string}) {
    const [loader, setLoader]= useState<number>(1)
    const [name, setName]= useState<string>(product.name)
    const [category, setCategory]= useState<string>(product.category)
    const [price, setPrice]= useState<number>(product.price)
    const updateproduct = async()=>{
        setLoader(0)
        try {
            const response = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/product/update`,{
                id : product.id,
                name : name,
                category : category,
                price : price
            })
            if (response) {
                toast.message("Congratulations! updated successful")
                mutate(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/product?page=${page}&search=${searchWord}`)
            }
        } 
        catch(e){
            toast.error("Failed to update product")
        }
        finally{
            setLoader(1)
        }
    }

    return (<Dialog>
      <div>
        <DialogTrigger asChild>
          <button className="w-full flex-1 py-2 px-3 bg-cyan-900/60 hover:bg-cyan-800/60 text-cyan-400 text-xs font-medium rounded transition-colors cursor-pointer">Update</button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px] bg-gray-950 text-white">
          <DialogHeader>
            <DialogTitle className="flex justify-center">Update Product</DialogTitle>
          </DialogHeader>
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
            </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button className="bg-red-500 hover:bg-red-400 hover:text-white shadow-red-950 cursor-pointer">cancel</Button>
            </DialogClose>
            <Button className="bg-gray-900 hover:bg-gray-800 hover:text-white shadow-gray-950 cursor-pointer" onClick={()=>{
                updateproduct()
            }}>{loader===0 ? "loading..." : "update product"}</Button>
          </DialogFooter>
        </DialogContent>
      </div>
    </Dialog>
  )
}
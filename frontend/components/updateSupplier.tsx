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
import { SupplierType } from "@/app/supplier/page"
import { Edit2 } from "lucide-react"
import { mutate } from "swr"

export function EditSupplier({supplier, page, searchWord} : {supplier : SupplierType, page:number, searchWord:string}) {
    const [loader, setLoader]= useState<number>(1)
    const [name, setName]= useState<string>(supplier.name)
    const [product, setProduct]= useState<string>(supplier.product)
    const [email, setEmail]= useState<string>(supplier.email)
    const [phone, setPhone]= useState<string>(supplier.phone)
    const updatesupplier = async()=>{
        setLoader(0)
        try {
            const response = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/supplier/update`,{
                id : supplier.id,
                name : name,
                email : email,
                phone : phone,
                product : product
            })
            if (response) {
                toast.message("Congratulations! updated successful")
                mutate(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/supplier?page=${page}&search=${searchWord}`)
            }
        } 
        catch(e){
            toast.error("Failed to update supplier")
        }
        finally{
            setLoader(1)
        }
    }

    return (<Dialog>
      <div>
        <DialogTrigger asChild>
          <button className="p-1.5 rounded hover:bg-gray-700 text-blue-400 transition-colors">
            <Edit2 className="w-4 h-4" />
          </button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px] bg-gray-950 text-white">
          <DialogHeader>
            <DialogTitle className="flex justify-center">Update Supplier</DialogTitle>
          </DialogHeader>
            <div className="grid gap-4 mt-2">
                <div className="grid gap-3">
                    <Label>Name</Label>
                    <Input required value={name} onChange={(e)=> setName(e.target.value)}/>
                </div>
                <div className="grid gap-3">
                    <Label>Product name</Label>
                    <Input required value={product} onChange={(e)=> setProduct(e.target.value)}/>
                </div>
                <div className="grid gap-3">
                    <Label>Email</Label>
                    <Input required value={email} onChange={(e)=> setEmail(e.target.value)}/>
                </div>
                <div className="grid gap-3">
                    <Label>Phone</Label>
                    <Input required value={phone} onChange={(e)=> setPhone(e.target.value)}/>
                </div>
            </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button className="bg-red-500 hover:bg-red-400 hover:text-white shadow-red-950 cursor-pointer">cancel</Button>
            </DialogClose>
            <Button className="bg-gray-900 hover:bg-gray-800 hover:text-white shadow-gray-950 cursor-pointer" onClick={()=>{
                updatesupplier()
            }}>{loader===0 ? "loading..." : "update supplier"}</Button>
          </DialogFooter>
        </DialogContent>
      </div>
    </Dialog>
  )
}
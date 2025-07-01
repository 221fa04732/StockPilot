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

export function SupplierDialogDemo() {
    const [loader, setLoader]= useState<number>(1)
    const [name, setName]= useState<string>("")
    const [email, setEmail]= useState<string>("")
    const [phone, setPhone]= useState<string>("")
    const [product, setProduct]= useState<string>("")
    const addsupplier = async()=>{
        setLoader(0)
        try {
            const response = await axios.post(`${BACKEND_URL}/api/v1/supplier/add`,{
                name : name,
                email : email,
                phone : phone,
                product : product
            })
            if (response) {
                toast.message("supplier added successfully!")
            }
        } 
        catch(e){
            toast.error("Failed to add supplier")
        }
        finally{
            setLoader(1)
        }
    }

    return (<Dialog>
      <div>
        <DialogTrigger asChild>
          <Button variant="outline" className="bg-gray-900 hover:bg-gray-800 hover:text-white">add supplier</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px] bg-gray-950 text-white">
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
              <Button variant="outline" className="bg-red-500 hover:bg-red-400 hover:text-white">cancel</Button>
            </DialogClose>
            <Button variant="outline" className="bg-gray-900 hover:bg-gray-800 hover:text-white" onClick={()=>{
                addsupplier()
            }}>{loader===0 ? "loading..." : "add supplier"}</Button>
          </DialogFooter>
        </DialogContent>
      </div>
    </Dialog>
  )
}
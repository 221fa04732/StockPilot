"use client"

import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import axios from 'axios'
import { toast } from "sonner"
import { mutate } from "swr"

export function DeleteProduct({id, page, searchWord} : {id: string, page: number, searchWord: string}) {
    const [loader, setLoader]= useState<number>(1)
    const deleteproduct = async()=>{
        setLoader(0)
        try {
            const response = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/product/delete`,{
                id: id
            })
            if (response) {
                toast.message("Product Deleted successful")
                mutate(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/product?page=${page}&search=${searchWord}`)
            }
        } 
        catch(e){
            toast.error("Failed to delete product")
        }
        finally{
            setLoader(1)
        }
    }
    return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <button className="w-full flex-1 py-2 px-3 bg-red-900/60 hover:bg-red-800/60 text-red-400 text-xs font-medium rounded transition-colors cursor-pointer">Delete</button>
      </AlertDialogTrigger>
      <AlertDialogContent className="bg-red-400 border-red-300">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-white">Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription className="text-white">
            This action cannot be undone. This will permanently delete your
            product and remove your data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="bg-gray-900 hover:bg-gray-800 text-white hover:text-white shadow-gray-950 border-none cursor-pointer">Cancel</AlertDialogCancel>
          <Button className="bg-red-600 hover:bg-red-500 hover:text-white shadow-red-950 cursor-pointer" onClick={()=>{
            deleteproduct()
          }}>{loader===0 ? "loading..." : "delete product"}</Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>  
)}
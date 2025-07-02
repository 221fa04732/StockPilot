"use client"

import {
  AlertDialog,
  AlertDialogAction,
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
import { BACKEND_URL } from "@/config"
import { toast } from "sonner"
import { Trash2 } from "lucide-react"

export function DeleteSupplier({id} : {id: string}) {
    const [loader, setLoader]= useState<number>(1)
    const deletesupplier = async()=>{
        setLoader(0)
        try {
            const response = await axios.post(`${BACKEND_URL}/api/v1/supplier/delete`,{
                id: id
            })
            if (response) {
                toast.message("Supplier Deleted successful")
            }
        } 
        catch(e){
            toast.error("Failed to delete supplier")
        }
        finally{
            setLoader(1)
        }
    }
    return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <button className="p-1.5 rounded hover:bg-gray-700 text-red-400 transition-colors">
            <Trash2 className="w-4 h-4" />
        </button>
      </AlertDialogTrigger>
      <AlertDialogContent className="bg-red-400 border-red-300">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-white">Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription className="text-white">
            This action cannot be undone. This will permanently delete supplier info and remove supplier data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="bg-gray-900 hover:bg-gray-800 text-white hover:text-white shadow-gray-950 border-none cursor-pointer">Cancel</AlertDialogCancel>
          <Button className="bg-red-600 hover:bg-red-500 hover:text-white shadow-red-950 cursor-pointer" onClick={()=>{
            deletesupplier()
          }}>{loader===0 ? "loading..." : "delete supplier"}</Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>  
)}
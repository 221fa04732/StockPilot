"use client"

import Error from '@/components/error'
import { BACKEND_URL } from '@/config'
import axios from 'axios'
import { useState, useEffect } from 'react'
import { toast } from 'sonner'
import { useDebounce } from '@/hooks/debounce'
import { Input } from '@/components/ui/input'
import { SupplierDialogDemo } from '@/components/addSupplier'
import PaginationBtn from '@/components/paginationBtn'
import { SupplierLoader } from '@/components/supplierLoader'
import SupplierCard from '@/components/supplierCard'
import useSWR from 'swr'

export interface SupplierType {
  id: string;
  name: string;
  phone: string;
  email: string;
  delete: boolean;
  product: string;
  createdAt: string;
}
export interface SupplierResponse {
  supplier: SupplierType[];
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}
const fetcher= (url: string) => axios.get(url).then(res => res.data)

export default function Product() {
  const [page, setPage] = useState<number>(0)
  const [word, setWord]= useState<string>("")
  const searchWord= useDebounce(word)
  const {data, error, isLoading} : {data: SupplierResponse, error: any, isLoading : boolean}= useSWR(`${BACKEND_URL}/api/v1/supplier?page=${page}&search=${searchWord}`, fetcher)

  if(error){
    toast.error("An unexpected error occurred!")
    return <Error />
  }

  return (<div className='w-full min-h-screen flex flex-col justify-center items-center bg-slate-950 text-white pt-48 md:pt-36 pb-40'>
    <div className='fixed top-20 z-40 w-10/12 grid grid-cols-1 md:grid-cols-3 place-items-center md:place-items-end gap-2 p-2 backdrop-blur-sm bg-white/10 border border-gray-600/30 rounded-lg'>
      <Input 
        value={word} 
        onChange={(e) => setWord(e.target.value)} 
        placeholder='Search supplier' 
        className='bg-white/20 text-white placeholder:text-gray-300 md:col-span-2 focus:bg-white/30 focus:ring-2 focus:ring-blue-400/50 border-transparent'
      />
      <SupplierDialogDemo page={page} searchWord={searchWord}/>
    </div>
    {isLoading ? <SupplierLoader /> : 
    <div className='w-full flex flex-col justify-center items-center'>
      <div className='w-10/12 flex flex-col gap-4'>
        {data?.supplier.map((item)=>(
          <SupplierCard supplier={item} page={page} searchWord={searchWord} />
        ))}
      </div>
      <div className="flex gap-4 mt-6">
          <PaginationBtn onClick={()=> setPage(page-1)} name={"Previous"} enable={data?.hasPreviousPage || false}/>
          <PaginationBtn onClick={()=> setPage(page+1)} name={"Next"} enable={data?.hasNextPage || false} />
      </div>
    </div>}
  </div>)
}
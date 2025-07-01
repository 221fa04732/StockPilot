"use client"

import Error from '@/components/error'
import { BACKEND_URL } from '@/config'
import axios from 'axios'
import { useState, useEffect } from 'react'
import { toast } from 'sonner'
import { useDebounce } from '@/hooks/debounce'
import { Input } from '@/components/ui/input'
import { SupplierDialogDemo } from '@/components/addSupplier'

export interface Supplier {
  id: string;
  name: string;
  phone: string;
  email: string;
  delete: boolean;
  product: string;
  createdAt: string;
}
export interface SupplierResponse {
  supplier: Supplier[];
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

export default function Product() {
  const [supplierData, setSupplierData] = useState<SupplierResponse>()
  const [loading, setLoading] = useState<number>(0)
  const [page, setPage] = useState<number>(0)
  const [word, setWord]= useState<string>("")
  const searchWord= useDebounce(word)
  useEffect(() => {
    setLoading(0)
    const fetchSupplier = async () => {
      try {
        const response = await axios.get(`${BACKEND_URL}/api/v1/supplier?page=${page}&search=${searchWord}`)
        if (response) {
          setSupplierData(response.data)
        }
        setLoading(2);
      } catch (e) {
        setLoading(1)
        toast.error("Failed to load supplier")
      }
    }
    fetchSupplier()
    const interval = setInterval(fetchSupplier, 60000)
    return () => clearInterval(interval)
  }, [searchWord, page])

  if (loading === 1) {
    return <Error />
  }

  return (<div className='w-full min-h-screen flex flex-col justify-center items-center bg-slate-950 text-white pt-32 pb-40'>
    <div className='fixed top-20 z-40 w-10/12 md:w-8/12 grid grid-cols-1 md:grid-cols-3 place-items-center md:place-items-end gap-4 p-2 backdrop-blur-sm bg-white/10 border border-gray-600/30 rounded-lg'>
      <Input 
        value={word} 
        onChange={(e) => setWord(e.target.value)} 
        placeholder='Search product' 
        className='bg-white/20 text-white placeholder:text-gray-300 md:col-span-2 focus:bg-white/30 focus:ring-2 focus:ring-blue-400/50 border-transparent'
      />
      <SupplierDialogDemo />
    </div>
  </div>)
}
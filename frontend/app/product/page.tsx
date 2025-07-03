"use client"

import Error from '@/components/error'
import { BACKEND_URL } from '@/config'
import axios from 'axios'
import { useState, useEffect } from 'react'
import { toast } from 'sonner'
import { useDebounce } from '@/hooks/debounce'
import { Input } from '@/components/ui/input'
import { ProductDialogDemo } from '@/components/addProduct'
import ProductCard from '@/components/productCard'
import PaginationBtn from '@/components/paginationBtn'
import { ProductLoader } from '@/components/productLoader'
import useSWR from 'swr'

interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  quantity: number;
  delete: boolean;
  createdAt: string;
}
interface ProductResponse {
  product: Product[];
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}
const fetcher= (url: string)=> axios.get(url).then(res=> res.data)

export default function Product() {
  const [page, setPage] = useState<number>(0)
  const [word, setWord]= useState<string>("")
  const searchWord= useDebounce(word)
  const {data, error, isLoading} : {data : ProductResponse, error : any, isLoading : boolean}= useSWR(`${BACKEND_URL}/api/v1/product?page=${page}&search=${searchWord}`, fetcher)

  if(error) {
    toast.error("An unexpected error occurred!");
    return <Error />
  }

  return (<div className='w-full min-h-screen flex flex-col justify-center items-center bg-slate-950 text-white pt-48 md:pt-36 pb-40'>
    <div className='fixed top-20 z-40 w-10/12 grid grid-cols-1 md:grid-cols-3 place-items-center md:place-items-end gap-2 p-2 backdrop-blur-sm bg-white/10 border border-gray-600/30 rounded-lg'>
      <Input 
        value={word} 
        onChange={(e) => setWord(e.target.value)} 
        placeholder='Search product' 
        className='bg-white/20 text-white placeholder:text-gray-300 md:col-span-2 focus:bg-white/30 focus:ring-2 focus:ring-blue-400/50 border-transparent'
      />
      <ProductDialogDemo page={page} searchWord={searchWord} />
    </div>
    {isLoading ? <ProductLoader /> : 
    <div className='w-full flex flex-col justify-center items-center'>
      <div className='w-10/12 grid gap-4 grid-col-1 md:grid-cols-2'>
        {data?.product.toReversed().map((item)=>(
          <ProductCard product={item} page={page} searchWord={searchWord}/>
        ))}
      </div>
      <div className="flex gap-4 mt-6">
          <PaginationBtn onClick={()=> setPage(page-1)} name={"Previous"} enable={data?.hasPreviousPage || false}/>
          <PaginationBtn onClick={()=> setPage(page+1)} name={"Next"} enable={data?.hasNextPage || false} />
      </div>
    </div>}
  </div>)
}
"use client"

import Error from '@/components/error'
import { BACKEND_URL } from '@/config'
import axios from 'axios'
import { useState, useEffect } from 'react'
import { toast } from 'sonner'
import TransactionLoader from '@/components/transactionLoader'
import TransactionCard from '@/components/transactionCard'
import PaginationBtn from '@/components/paginationBtn'
import useSWR from 'swr'

export interface TransactionInfoType {
    id: string;
    quantity: number;
    price: number;
    transactionType: "buy" | "sell";
    productId: string;
    createdAt: string;
    productName: string
}
export interface TransactionType {
    transaction: TransactionInfoType[];
    hasNextPage: boolean;
    hasPreviousPage: boolean;
}
const fetcher= (url: string)=> axios.get(url).then(res=> res.data)

export default function Transaction() {
    const [page, setPage] = useState<number>(0)
    const {data, error, isLoading} : {data: TransactionType, error: any, isLoading: boolean} = useSWR(`${BACKEND_URL}/api/v1/transcation?page=${page}`, fetcher)

    if(isLoading) return <TransactionLoader />
    if(error){ 
        toast.error("An unexpected error occurred!");
        return <Error />
    }

    return (
        <div className="w-full min-h-screen flex flex-col justify-center items-center bg-slate-950 text-white pt-24 pb-40">
            <div className="w-full flex flex-col justify-center items-center">
                {data?.transaction.map((item) => (
                    <TransactionCard key={item.id} transaction={item} />
                ))}
            </div>

            <div className="flex gap-4 mt-6">
                <PaginationBtn onClick={()=> setPage(page-1)} name={"Previous"} enable={data?.hasPreviousPage || false}/>
                <PaginationBtn onClick={()=> setPage(page+1)} name={"Next"} enable={data?.hasNextPage || false} />
            </div>
        </div>
    )
}
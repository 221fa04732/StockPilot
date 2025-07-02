"use client"

import Error from '@/components/error'
import { BACKEND_URL } from '@/config'
import axios from 'axios'
import { useState, useEffect } from 'react'
import { toast } from 'sonner'
import TransactionLoader from '@/components/transactionLoader'
import TransactionCard from '@/components/transactionCard'
import PaginationBtn from '@/components/paginationBtn'

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

export default function Transaction() {
    const [transactionData, setTransactionData] = useState<TransactionType>()
    const [loading, setLoading] = useState<number>(0)
    const [page, setPage] = useState<number>(0)
    useEffect(() => {
        setLoading(0)
        const fetchTransaction = async () => {
            try {
                const response = await axios.get(`${BACKEND_URL}/api/v1/transcation?page=${page}`)
                if (response) {
                    setTransactionData(response.data)
                }
                setLoading(2);
            } catch (e) {
                setLoading(1)
                toast.error("Failed to load transactions")
            }
        }
        fetchTransaction()
        const interval = setInterval(fetchTransaction, 60000)
        return () => clearInterval(interval)
    }, [page])

    if (loading === 0) {
        return (<div className="w-full min-h-screen flex flex-col justify-center items-center bg-slate-950 text-white pt-32 pb-40">
            <TransactionLoader />
        </div>)
    }

    if (loading === 1) {
        return <Error />
    }

    return (
        <div className="w-full min-h-screen flex flex-col justify-center items-center bg-slate-950 text-white pt-24 pb-40">
            <div className="w-full flex flex-col justify-center items-center">
                {transactionData?.transaction.map((item) => (
                    <TransactionCard key={item.id} transaction={item} />
                ))}
            </div>

            <div className="flex gap-4 mt-6">
                <PaginationBtn onClick={()=> setPage(page-1)} name={"Previous"} enable={transactionData?.hasPreviousPage || false}/>
                <PaginationBtn onClick={()=> setPage(page+1)} name={"Next"} enable={transactionData?.hasNextPage || false} />
            </div>
        </div>
    )
}
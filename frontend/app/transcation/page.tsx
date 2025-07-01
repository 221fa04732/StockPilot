"use client"

import Error from '@/components/error'
import { BACKEND_URL } from '@/config'
import axios from 'axios'
import { useState, useEffect } from 'react'
import { toast } from 'sonner'
import TransactionLoader from '@/components/transactionLoader'
import TransactionCard from '@/components/transactionCard'

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
        const fetchTransaction = async () => {
            setLoading(0)
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
        const timeout = setTimeout(fetchTransaction, 60000)
        return () => clearTimeout(timeout)
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
        <div className="w-full min-h-screen flex flex-col justify-center items-center bg-slate-950 text-white pt-32 pb-40">
            <div className="w-full flex flex-col justify-center items-center">
                {transactionData?.transaction.map((item) => (
                    <TransactionCard key={item.id} transaction={item} />
                ))}
            </div>

            <div className="flex gap-4 mt-6">
                <button
                    onClick={() => setPage(page - 1)}
                    disabled={!transactionData?.hasPreviousPage}
                    className={`px-4 py-2 rounded-md text-sm ${transactionData?.hasPreviousPage ? 'bg-blue-600 hover:bg-blue-700' : 'bg-slate-800 text-slate-500 cursor-not-allowed'}`}>Previous
                </button>
                <button
                    onClick={() => setPage(page + 1)}
                    disabled={!transactionData?.hasNextPage}
                    className={`px-4 py-2 rounded-md text-sm ${transactionData?.hasNextPage ? 'bg-blue-600 hover:bg-blue-700' : 'bg-slate-800 text-slate-500 cursor-not-allowed'}`}>Next
                </button>
            </div>
        </div>
    )
}
import axios from 'axios'
import { BACKEND_URL } from '@/config'
import { Package, Users, Box, TrendingUp, TrendingDown, AlertTriangle, ShoppingCart, Wallet } from 'lucide-react'
import StatCard from './statCard'
import TransactionItem from './recentTransferCard'
import LowStockItem from './lowStockCard'
import Error from './error'

export interface DashboardDataType {
    productCnt: number;
    supplierCnt: number;
    totalInventoryValue: number;
    lowStockItems: {
        id: string;
        name: string;
        category: string;
        price: number;
        quantity: number;
        createdAt: string;
    }[];
    transaction: {
        id: string;
        quantity: number;
        price: number;
        transactionType: 'buy' | 'sell';
        productName: string;
        createdAt: string;
    }[];
    totalBuy: number;
    totalSell: number;
}

export default async function Dashboard() {
    try{
        const response = await axios.get<DashboardDataType>(`${BACKEND_URL}/api/v1/dashboard`)
        const data = response.data
        const netProfit = data.totalSell - data.totalBuy
        return (<div className="w-full flex flex-col justify-center items-center min-h-screen bg-slate-950 text-white pt-12">
            <div className="w-10/12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                    <StatCard
                        icon={<Package size={20} />}
                        title="Total Products"
                        value={data.productCnt}
                        delta={"Product"}/>
                    <StatCard
                        icon={<Box size={20} />}
                        title="Inventory Value"
                        value={`$${data.totalInventoryValue.toLocaleString()}`}
                        delta={"Money"}/>
                    <StatCard
                        icon={<Users size={20} />}
                        title="Suppliers"
                        value={data.supplierCnt}
                        delta={"Supplier"}/>
                    <StatCard
                        icon={<TrendingUp size={20} />}
                        title="Total Buy"
                        value={`$${data.totalBuy.toLocaleString()}`}
                        delta={"Money"}/>
                    <StatCard
                        icon={<TrendingDown size={20} />}
                        title="Total Sell"
                        value={`$${data.totalSell.toLocaleString()}`}
                        delta={"Money"}/>
                    <StatCard
                        icon={<Wallet  size={20} />}
                        title="Net Profit"
                        value={`$${netProfit.toLocaleString()}`}
                        delta={"Money"}/>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div className="bg-slate-900 rounded-xl p-6">
                        <div className="flex items-center gap-2 mb-6">
                            <AlertTriangle className="text-yellow-400" size={20} />
                            <h2 className="text-xl font-semibold">Low Stock Alerts</h2>
                            <span className="ml-auto text-sm px-3 py-1 rounded-full bg-red-900/30 text-red-400">
                                {data.lowStockItems.length} items
                            </span>
                        </div>
                        <div className="divide-y divide-slate-800">
                            {data.lowStockItems.map((item) => (
                                <LowStockItem key={item.id} item={item} />
                            ))}
                        </div>
                    </div>
                    <div className="bg-slate-900 rounded-xl p-6">
                        <div className="flex items-center gap-2 mb-6">
                            <ShoppingCart size={20} />
                            <h2 className="text-xl font-semibold ">Recent Transactions</h2>
                            <span className="ml-auto text-sm px-3 py-1 rounded-full bg-green-900/30 text-green-400">
                                {data.transaction.length} transactions
                            </span>
                        </div>
                        <div className="divide-y divide-slate-800">
                            {data.transaction.slice(0, 5).map(transaction => (
                                <TransactionItem key={transaction.id} transaction={transaction} />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )}
    catch(e){
        return <Error />
    }
}
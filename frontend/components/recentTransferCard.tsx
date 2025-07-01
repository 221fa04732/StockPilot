import { DashboardDataType } from './dashboard'
import { TrendingUp, TrendingDown } from 'lucide-react'
import { format } from 'date-fns'

export default function TransactionItem({ transaction }: { transaction: DashboardDataType['transaction'][0] }) {
    const isBuy = transaction.transactionType === 'buy'
    return (<div className="flex justify-between items-center py-3 border-b border-slate-800 last:border-0">
        <div className="flex items-center gap-3">
            <div className={`p-2 rounded-lg ${isBuy ? 'bg-green-900/30 text-green-400' : 'bg-red-900/30 text-red-400'}`}>
                {isBuy ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
            </div>
            <div>
                <h4 className="font-medium">{transaction.productName}</h4>
                <p className="text-slate-400 text-sm">{format(new Date(transaction.createdAt), 'MMM d, h:mm a')}</p>
            </div>
        </div>
        <div className="text-right">
            <p className={`font-medium ${isBuy ? 'text-green-400' : 'text-red-400'}`}>
                ${(transaction.price * transaction.quantity).toFixed(2)}
            </p>
            <p className="text-slate-400 text-sm">{transaction.quantity} × ${transaction.price.toFixed(2)}</p>
        </div>
    </div>
)}
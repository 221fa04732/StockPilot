import { DashboardDataType } from "./dashboard"
import { AlertTriangle } from 'lucide-react'

export default function LowStockItem({ item }: { item: DashboardDataType['lowStockItems'][0] }){
    return(<div className="flex justify-between items-center py-3 border-b border-slate-800 last:border-0">
        <div className="flex items-center gap-3">
            <div className={`p-2 rounded-lg ${item.quantity === 0 ? 'bg-red-900/30 text-red-400' : 'bg-yellow-900/30 text-yellow-400'}`}>
                <AlertTriangle size={16} />
            </div>
            <div>
                <h4 className="font-medium">{item.name}</h4>
                <p className="text-slate-400 text-sm capitalize">{item.category}</p>
            </div>
        </div>
        <div className="text-right">
            <p className={`font-medium ${item.quantity === 0 ? 'text-red-400' : 'text-yellow-400'}`}>
                {item.quantity === 0 ? 'Out of stock' : `Only ${item.quantity} left`}
            </p>
            <p className="text-slate-400 text-sm">${item.price.toFixed(2)}</p>
        </div>
    </div>
)}
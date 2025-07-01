import { format } from 'date-fns'
import { ArrowDownCircle, ArrowUpCircle, Package, Copy } from 'lucide-react'
import { TransactionInfoType } from '@/app/transcation/page';
import { toast } from 'sonner';

export default function TransactionCard({ transaction }: { transaction: TransactionInfoType }) {
    const isBuy = transaction.transactionType === 'buy';
    const total = transaction.price * transaction.quantity;
    const Icon = isBuy ? ArrowUpCircle : ArrowDownCircle;

    return (
        <div className={`w-10/12 md:w-8/12 p-0 mb-3 rounded-lg overflow-hidden backdrop-blur-sm ${isBuy
                ? 'bg-green-900/10 border border-green-800/50 hover:bg-green-900/20'
                : 'bg-red-900/10 border border-red-800/50 hover:bg-red-900/20'
            } transition-colors duration-200 shadow-sm`}>
            {/* Main Card Content */}
            <div className="p-4">
                <div className="flex items-start gap-3">
                    <div className={`p-2 rounded-full ${isBuy ? 'bg-green-900/30' : 'bg-red-900/30'}`}>
                        <Icon className={`w-5 h-5 ${isBuy ? 'text-green-400' : 'text-red-400'}`} />
                    </div>

                    <div className="flex-1">
                        <div className="flex justify-between items-start">
                            <div>
                                <h3 className="font-medium text-white flex items-center gap-2">
                                    <Package className="w-4 h-4 text-gray-400" />
                                    {transaction.productName || 'Unnamed Product'}
                                </h3>
                                <p className="text-xs text-gray-400 mt-1">
                                    {format(new Date(transaction.createdAt), 'MMM d, h:mm a')}
                                </p>
                            </div>
                            <span className={`text-xs font-medium px-2 py-1 rounded-md ${isBuy ? 'bg-green-900/40 text-green-300' : 'bg-red-900/40 text-red-300'
                                }`}>
                                {isBuy ? 'Purchase' : 'Sale'}
                            </span>
                        </div>

                        <div className="flex justify-between items-center mt-3">
                            <div>
                                <p className="text-sm text-gray-300">Quantity</p>
                                <p className="text-white">{transaction.quantity} units</p>
                            </div>
                            <div className="text-right">
                                <p className="text-sm text-gray-300">Unit Price</p>
                                <p className="text-white">${transaction.price.toFixed(2)}</p>
                            </div>
                            <div className="text-right">
                                <p className="text-sm text-gray-300">Total</p>
                                <p className={`font-medium ${isBuy ? 'text-green-300' : 'text-red-300'}`}>
                                    ${total.toFixed(2)}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className={`px-4 py-2 text-xs font-mono flex items-center ${isBuy
                    ? 'bg-green-900/20 border-t border-green-800/30 text-green-300'
                    : 'bg-red-900/20 border-t border-red-800/30 text-red-300'
                }`}>
                <span className="opacity-70 mr-2">ID:</span>
                <span className="truncate">{transaction.id}</span>
                <button
                    onClick={() => {
                        navigator.clipboard.writeText(transaction.id);
                        toast.success('Transaction ID copied!');
                    }}
                    className="ml-auto opacity-70 hover:opacity-100 transition-opacity"
                    aria-label="Copy transaction ID"
                >
                    <Copy className="w-3.5 h-3.5" />
                </button>
            </div>
        </div>
    );
};
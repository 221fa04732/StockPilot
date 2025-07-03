import { format } from 'date-fns';
import { User, Mail, Phone, Box, Edit2, Trash2, Copy } from 'lucide-react';
import { SupplierType } from '@/app/supplier/page';
import { toast } from 'sonner';
import { EditSupplier } from './updateSupplier';
import { DeleteSupplier } from './deleteSupplier';

export default function SupplierCard({ supplier, page, searchWord }: { supplier: SupplierType, page:number, searchWord: string }) {
  return (
    <div key={supplier.id} className="w-full p-0 rounded-lg overflow-hidden bg-gray-900/50 border border-gray-800 hover:bg-gray-800/30 transition-colors duration-200">
      <div className="p-4">
        <div className="flex justify-between items-start">
          <div className="flex items-start gap-3">
            <div className="p-2 rounded-full bg-blue-900/30">
              <User className="w-5 h-5 text-blue-400" />
            </div>
            <div className="space-y-2">
              <h3 className="font-medium text-white">{supplier.name}</h3>
              <div className="flex items-center gap-2 text-sm text-gray-300">
                <Mail className="w-4 h-4 text-gray-400" />
                <span>{supplier.email}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-300">
                <Phone className="w-4 h-4 text-gray-400" />
                <span>{supplier.phone}</span>
              </div>
            </div>
          </div>
          <div className="flex flex-col items-end space-y-3">
            <div className="flex items-center gap-2 text-blue-300">
              <Box className="w-4 h-4" />
              <span>{supplier.product}</span>
            </div>
            <span className="text-xs text-gray-400">
              {format(new Date(supplier.createdAt), 'MMM d, yyyy')}
            </span>
            <div className="flex space-x-2">
              <EditSupplier supplier={supplier} page={page} searchWord={searchWord}/>
              <DeleteSupplier id={supplier.id} page={page} searchWord={searchWord}/>
            </div>
          </div>
        </div>
      </div>
      <div className="px-4 py-2 text-xs flex items-center bg-gray-800/40 border-t border-gray-700/30 text-gray-300">
        <span className="mr-2">ID:</span>
        <span className="truncate font-mono">{supplier.id}</span>
        <button
          onClick={() => {
              navigator.clipboard.writeText(supplier.id);
              toast.success('Supplier ID copied!');
          }}
          className="ml-auto opacity-70 hover:opacity-100 transition-opacity"
          aria-label="Copy supplier ID">
          <Copy className="w-3.5 h-3.5" />
      </button>
      </div>
    </div>
  );
}
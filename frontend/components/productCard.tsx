import React from 'react';
import { DeleteProduct } from './deleteProduct';
import { EditProduct } from './editProduct';
import { SellProduct } from './sellProduct';
import { BuyProduct } from './buyProduct';

export interface ProductType {
  id: string;
  name: string;
  category: string;
  price: number;
  quantity: number;
  createdAt: string;
}

export default function ProductCard({product} : {product: ProductType}){
  const formattedDate = new Date(product.createdAt).toLocaleDateString();
  const isOutOfStock = product.quantity <= 0;
  return (
    <div className="bg-gray-900 rounded-lg shadow-lg overflow-hidden border border-gray-800 transition-all hover:border-gray-600 hover:scale-101">
      <div className="p-5">
        <div className="flex justify-between items-start mb-3">
          <div>
            <h3 className="text-xl font-semibold text-white mb-2">{product.name}</h3>
            <span className="text-xs px-4 py-1 rounded-full bg-blue-900/30 text-blue-500">
              {product.category}
            </span>
          </div>
          <span className="text-2xl font-bold text-white">${product.price}</span>
        </div>
        <div className="text-sm text-gray-400 space-y-1 mb-4">
          <div className="flex justify-between">
            <span>Quantity:</span>
            <span className={`font-medium ${isOutOfStock ? 'text-red-500' : 'text-green-500'}`}>
              {product.quantity}
            </span>
          </div>
          <div className="flex justify-between">
            <span>Added:</span>
            <span>{formattedDate}</span>
          </div>
        </div>
        <div className="grid grid-cols-4 gap-2 pt-3 border-t border-gray-800">
          <BuyProduct id={product.id} />
          <SellProduct id={product.id} initialQuantity={product.quantity} />
          <EditProduct product={product}/>
          <DeleteProduct id={product.id}/>
        </div>
      </div>
    </div>
  );
};
import React from "react";
import { Timeline } from "@/components/ui/timeline";

export function ServiceCard() {
  const data = [
    {
      title: "/dashboard.png",
      content: (
        <div className="flex flex-col items-start justify-center gap-4">
          <div className="text-2xl lg:xl font-bold text-white">Dashboard Overview</div>
          <div className="text-gray-500 text-sm">
            The dashboard provides a comprehensive overview where users can see key reports like low stock alerts, last transactions, supplier count, product count, total inventory value, total buy and sell, and net profit. It serves as the central hub for operational insights.
          </div>
        </div>
      ),
      navigateURL: "/",
    },
    {
      title: "/product.png",
      content: (
        <div className="flex flex-col items-start justify-center gap-4">
          <div className="text-2xl lg:xl font-bold text-white">Product Management</div>
          <div className="text-gray-500 text-sm">
            All products are listed with full access to add new ones, edit existing entries, and delete outdated or incorrect products. This module ensures the inventory stays updated and manageable.
          </div>
        </div>
      ),
      navigateURL: "/product",
    },
    {
      title: "/supplier.png",
      content: (
        <div className="flex flex-col items-start justify-center gap-4">
          <div className="text-2xl lg:xl font-bold text-white">Supplier Directory</div>
          <div className="text-gray-500 text-sm">
            The supplier module displays all listed suppliers along with their associated products. Users can easily add new suppliers, update existing details, or remove obsolete ones.
          </div>
        </div>
      ),
      navigateURL: "/supplier",
    },
    {
      title: "/transcation.png",
      content: (
        <div className="flex flex-col items-start justify-center gap-4">
          <div className="text-2xl lg:xl font-bold text-white">Transaction Records</div>
          <div className="text-gray-500 text-sm">
            View all recent transactions including purchases and sales. This section keeps track of every transaction made, ensuring financial transparency and traceability.
          </div>
        </div>
      ),
      navigateURL: "/transcation",
    },
  ];

  return (
    <div className="relative w-full overflow-clip">
      <Timeline data={data} />
    </div>
  );
}

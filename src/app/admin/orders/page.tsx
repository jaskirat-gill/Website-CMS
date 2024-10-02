"use client"
import * as React from "react";
import OrdersTable from "@/components/admin/OrdersTable";
import OrderDetails from "@/components/admin/OrderDetails";
import { OrderDisplay } from "../../../../types/types";

export default function Orders() {
  const [activeOrder, setActiveOrder] = React.useState<OrderDisplay | null>(null)
  return (
    <div className="flex h-full w-full flex-col bg-muted/40">
      <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-0">
        <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 lg:grid-cols-3 xl:grid-cols-3">
          <div className="grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-2" >
            <OrdersTable setActiveOrder={setActiveOrder}/>
          </div>
          <div>
            <OrderDetails activeOrder={activeOrder}/>
          </div>
        </main>
      </div>
    </div>
  );
}

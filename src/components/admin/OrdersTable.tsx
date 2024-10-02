"use client";
import { useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableHeader, TableHead, TableRow, TableCell } from "@/components/ui/table";
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuCheckboxItem } from "@/components/ui/dropdown-menu";
import { ListFilter, File } from "lucide-react";
import { OrderDisplay, rawOrder } from "../../../types/types";

interface OrdersTableProps {
  setActiveOrder: (newOrder: OrderDisplay) => void
}
function OrdersTable({setActiveOrder}: OrdersTableProps) {
  const [orders, setOrders] = useState<OrderDisplay[]>([]);
  const [selectedView, setSelectedView] = useState<string>("last_week");
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const fetchOrders = async (period: string) => {
    setIsLoading(true);
    try {
      const response = await fetch(`/api/orders?period=${period}`);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      console.log(data)
      const formattedOrders: OrderDisplay[] = data.map((order: rawOrder) => ({
        _id: order._id,
        customerName: order.customerName,
        date: new Date(order.createdAt),
        status: order.status,
        amount: order.totalAmount,
      }));
      setOrders(formattedOrders);
      setActiveOrder(formattedOrders[0])
    } catch (error) {
      console.error(`Error fetching orders for ${period}:`, error);
    } finally {
      setIsLoading(false);
    }
  };

  const getNextOrder = (order: OrderDisplay, orders: OrderDisplay[]): OrderDisplay | null => {
    // Find the index of the current order based on _id
    const currentIndex = orders.findIndex(o => o._id === order._id);
    
    // If the order is not found or if the array is empty, return null
    if (currentIndex === -1 || orders.length === 0) {
      return null;
    }
    
    // Calculate the next index (loop back to 0 if at the last element)
    const nextIndex = (currentIndex + 1) % orders.length;
    
    // Return the next order
    return orders[nextIndex];
  }

  useEffect(() => {
    fetchOrders(selectedView);
  }, [selectedView]);

  return (
    <Tabs value={selectedView} onValueChange={setSelectedView}>
      <div className="flex items-center">
        <TabsList>
          <TabsTrigger value="last_week" disabled={isLoading}>
            Week
          </TabsTrigger>
          <TabsTrigger value="last_month" disabled={isLoading}>
            Month
          </TabsTrigger>
          <TabsTrigger value="last_year" disabled={isLoading}>
            Year
          </TabsTrigger>
          <TabsTrigger value="all" disabled={isLoading}>
            All
          </TabsTrigger>
        </TabsList>
        <div className="ml-auto flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="h-7 gap-1 text-sm">
                <ListFilter className="h-3.5 w-3.5" />
                <span className="sr-only sm:not-sr-only">Filter</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Filter by</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuCheckboxItem checked>Fulfilled</DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem>Declined</DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem>Refunded</DropdownMenuCheckboxItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Button size="sm" variant="outline" className="h-7 gap-1 text-sm">
            <File className="h-3.5 w-3.5" />
            <span className="sr-only sm:not-sr-only">Export</span>
          </Button>
        </div>
      </div>
      <TabsContent value={selectedView}>
        <Card x-chunk="dashboard-05-chunk-3" className="h-full">
          <CardHeader className="px-7">
            <CardTitle>Orders</CardTitle>
            <CardDescription>Recent orders from your store.</CardDescription>
          </CardHeader>
          <CardContent className="flex-1 flex h-full">
            {isLoading ? (
              <div className="text-center py-4">Loading orders...</div>
            ) : (
              <div className="max-h-[55vh] w-full overflow-y-auto"> {/* Set max height for scroll */}
                <Table className="w-full">
                  <TableHeader>
                    <TableRow>
                      <TableHead>Customer</TableHead>
                      <TableHead className="hidden sm:table-cell">Status</TableHead>
                      <TableHead className="hidden md:table-cell">Date</TableHead>
                      <TableHead className="text-right">Amount</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {orders.map((order) => (
                      <TableRow key={order.customerName} onClick={() => setActiveOrder(order)}>
                        <TableCell>{order.customerName}</TableCell>
                        <TableCell className="hidden sm:table-cell">{order.status}</TableCell>
                        <TableCell className="hidden md:table-cell">{order.date.toDateString()}</TableCell>
                        <TableCell className="text-right">${order.amount?.toFixed(2)}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
}

export default OrdersTable;

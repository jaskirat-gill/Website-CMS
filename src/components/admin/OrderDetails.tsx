"use client";
import { ChevronLeft, ChevronRight, Copy } from "lucide-react";
import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Separator } from "../ui/separator";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
} from "../ui/pagination";
import { useEffect, useState } from "react";
import { OrderDetailsDisplay, OrderDisplay } from "../../../types/types";

interface OrderDetailsProps {
    activeOrder: OrderDisplay | null
}
function OrderDetails({activeOrder}: OrderDetailsProps) {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [orderDetails, setOrderDetails] = useState<OrderDetailsDisplay | null>(
    null
  );

  useEffect(() => {
    if(!activeOrder) {
        return
    }
    setIsLoading(true);
    fetch(`/api/orders/${activeOrder._id}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data: OrderDetailsDisplay) => {
        if (!data) {
          setOrderDetails(null);
        } else {
          setOrderDetails(data);
        }
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching order:", error);
        setIsLoading(false);
      });
  }, [activeOrder]);

  return (
    <Card className="overflow-hidden" x-chunk="dashboard-05-chunk-4">
      {isLoading ? (
        <div className="text-center py-4">Loading orders...</div>
      ) : (
        <>
          <CardHeader className="flex flex-row items-start bg-muted/50">
            <div className="grid gap-0.5">
              <CardTitle className="group flex items-center gap-2 text-lg">
                Order {orderDetails?.id ? orderDetails.id : "Unknown"}
                <Button
                  size="icon"
                  variant="outline"
                  className="h-6 w-6 opacity-0 transition-opacity group-hover:opacity-100"
                >
                  <Copy className="h-3 w-3" />
                  <span className="sr-only">Copy Order ID</span>
                </Button>
              </CardTitle>
              <CardDescription>
                Date:{" "}
                {orderDetails?.createdAt
                  ? new Date(orderDetails.createdAt).toLocaleDateString()
                  : "Unknown"}
              </CardDescription>
            </div>
          </CardHeader>
          <CardContent className="p-6 text-sm overflow-y-auto">
            <div className="grid gap-3">
              <div className="font-semibold">Order Details</div>
              <ul className="grid gap-3">
                {/* Map through order items */}
                {orderDetails?.items?.map((item, index) => (
                  <li key={index} className="flex items-center justify-between">
                    <span className="text-muted-foreground">
                      Product {item.productId} x <span>{item.quantity}</span>
                    </span>
                    <span>${(item.price * item.quantity).toFixed(2)}</span>
                  </li>
                ))}
              </ul>
              <Separator className="my-2" />
              <ul className="grid gap-3">
                <li className="flex items-center justify-between">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>${orderDetails?.subtotal?.toFixed(2)}</span>
                </li>
                <li className="flex items-center justify-between">
                  <span className="text-muted-foreground">Shipping</span>
                  <span>${orderDetails?.shippingCost?.toFixed(2)}</span>
                </li>
                <li className="flex items-center justify-between">
                  <span className="text-muted-foreground">Tax</span>
                  <span>${orderDetails?.tax?.toFixed(2)}</span>
                </li>
                <li className="flex items-center justify-between font-semibold">
                  <span className="text-muted-foreground">Total</span>
                  <span>${orderDetails?.totalAmount?.toFixed(2)}</span>
                </li>
              </ul>
            </div>
            <Separator className="my-4" />
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-3">
                <div className="font-semibold">Shipping Information</div>
                <address className="grid gap-0.5 not-italic text-muted-foreground">
                  <span>
                    {orderDetails?.shippingInformation?.name || "Unknown"}
                  </span>
                  <span>
                    {orderDetails?.shippingInformation?.address || "Unknown"}
                  </span>
                  <span>
                    {orderDetails?.shippingInformation?.city || "Unknown"},{" "}
                    {orderDetails?.shippingInformation?.province || "Unknown"}{" "}
                    {orderDetails?.shippingInformation?.postalCode || "Unknown"}
                  </span>
                </address>
              </div>
              <div className="grid auto-rows-max gap-3">
                <div className="font-semibold">Billing Information</div>
                <div className="text-muted-foreground">
                  {orderDetails?.billingInformation
                    ? `${orderDetails.billingInformation.details?.name}, ${
                        orderDetails?.shippingInformation?.city || "Unknown"
                      }, ${
                        orderDetails?.shippingInformation?.province || "Unknown"
                      } ${
                        orderDetails?.shippingInformation?.postalCode ||
                        "Unknown"
                      }`
                    : "Same as shipping address"}
                </div>
              </div>
            </div>
            <Separator className="my-4" />
            <div className="grid gap-3">
              <div className="font-semibold">Customer Information</div>
              <dl className="grid gap-3">
                <div className="flex items-center justify-between">
                  <dt className="text-muted-foreground">Customer</dt>
                  <dd>{orderDetails?.customerName || "Unknown"}</dd>
                </div>
                <div className="flex items-center justify-between">
                  <dt className="text-muted-foreground">Email</dt>
                  <dd>
                    <a href={`mailto:${orderDetails?.email}`}>
                      {orderDetails?.email || "Unknown"}
                    </a>
                  </dd>
                </div>
                <div className="flex items-center justify-between">
                  <dt className="text-muted-foreground">Phone</dt>
                  <dd>
                    <a href={`tel:${orderDetails?.phone}`}>
                      {orderDetails?.phone || "Unknown"}
                    </a>
                  </dd>
                </div>
              </dl>
            </div>
          </CardContent>
        </>
      )}
      {/* <div className="grid gap-0.5">
          <CardTitle className="group flex items-center gap-2 text-lg">
            Order {orderDetails?.id ? orderDetails.id : 'Unknown'}
            <Button
              size="icon"
              variant="outline"
              className="h-6 w-6 opacity-0 transition-opacity group-hover:opacity-100"
            >
              <Copy className="h-3 w-3" />
              <span className="sr-only">Copy Order ID</span>
            </Button>
          </CardTitle>
          <CardDescription>Date: {orderDetails?.createdAt ? orderDetails.createdAt.toString() : 'Unknown'}</CardDescription>
        </div>
      </CardHeader>
      <CardContent className="p-6 text-sm">
        <div className="grid gap-3">
          <div className="font-semibold">Order Details</div>
          <ul className="grid gap-3">
            <li className="flex items-center justify-between">
              <span className="text-muted-foreground">
                Glimmer Lamps x <span>2</span>
              </span>
              <span>$250.00</span>
            </li>
            <li className="flex items-center justify-between">
              <span className="text-muted-foreground">
                Aqua Filters x <span>1</span>
              </span>
              <span>$49.00</span>
            </li>
          </ul>
          <Separator className="my-2" />
          <ul className="grid gap-3">
            <li className="flex items-center justify-between">
              <span className="text-muted-foreground">Subtotal</span>
              <span>$299.00</span>
            </li>
            <li className="flex items-center justify-between">
              <span className="text-muted-foreground">Shipping</span>
              <span>$5.00</span>
            </li>
            <li className="flex items-center justify-between">
              <span className="text-muted-foreground">Tax</span>
              <span>$25.00</span>
            </li>
            <li className="flex items-center justify-between font-semibold">
              <span className="text-muted-foreground">Total</span>
              <span>$329.00</span>
            </li>
          </ul>
        </div>
        <Separator className="my-4" />
        <div className="grid grid-cols-2 gap-4">
          <div className="grid gap-3">
            <div className="font-semibold">Shipping Information</div>
            <address className="grid gap-0.5 not-italic text-muted-foreground">
              <span>Liam Johnson</span>
              <span>1234 Main St.</span>
              <span>Anytown, CA 12345</span>
            </address>
          </div>
          <div className="grid auto-rows-max gap-3">
            <div className="font-semibold">Billing Information</div>
            <div className="text-muted-foreground">
              Same as shipping address
            </div>
          </div>
        </div>
        <Separator className="my-4" />
        <div className="grid gap-3">
          <div className="font-semibold">Customer Information</div>
          <dl className="grid gap-3">
            <div className="flex items-center justify-between">
              <dt className="text-muted-foreground">Customer</dt>
              <dd>Liam Johnson</dd>
            </div>
            <div className="flex items-center justify-between">
              <dt className="text-muted-foreground">Email</dt>
              <dd>
                <a href="mailto:">liam@acme.com</a>
              </dd>
            </div>
            <div className="flex items-center justify-between">
              <dt className="text-muted-foreground">Phone</dt>
              <dd>
                <a href="tel:">+1 234 567 890</a>
              </dd>
            </div>
          </dl>
        </div>
      </CardContent> */}
      <CardFooter className="flex flex-row items-center border-t bg-muted/50 px-6 py-3">
        <Pagination className="ml-auto mr-0 w-auto">
          <PaginationContent>
            <PaginationItem>
              <Button size="icon" variant="outline" className="h-6 w-6">
                <ChevronLeft className="h-3.5 w-3.5" />
                <span className="sr-only">Previous Order</span>
              </Button>
            </PaginationItem>
            <PaginationItem>
              <Button size="icon" variant="outline" className="h-6 w-6">
                <ChevronRight className="h-3.5 w-3.5" />
                <span className="sr-only">Next Order</span>
              </Button>
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </CardFooter>
    </Card>
  );
}

export default OrderDetails;

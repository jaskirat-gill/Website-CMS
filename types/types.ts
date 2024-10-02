import { IOrder } from "@/models/Order";

export interface OrderDisplay {
  _id: string;
  customerName: string;
  status: "pending" | "completed" | "canceled";
  date: Date;
  amount: number;
}

export interface shippingDetails {
  name: string;
  address: string;
  city: string;
  province: string;
  postalCode: string;
}

export interface billingDetails {
  details?: shippingDetails;
}

export interface OrderDetailsDisplay {
  id: string;
  customerName: string;
  items: Array<{
    productId: string;
    quantity: number;
    price: number;
  }>;
  shippingCost: number;
  tax: number;
  subtotal: number;
  totalAmount: number;
  shippingInformation: shippingDetails;
  billingInformation: billingDetails;
  email: string;
  phone: string;
  status: "pending" | "completed" | "canceled";
  createdAt: Date;
  updatedAt: Date;
}

export interface rawOrder extends IOrder {
    _id: string
}
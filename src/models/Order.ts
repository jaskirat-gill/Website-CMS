import { Schema, model, models } from 'mongoose';
import { billingDetails, shippingDetails } from '../../types/types';

export interface IOrder {
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
  phone: string
  status: 'pending' | 'completed' | 'canceled';
  createdAt: Date;
  updatedAt: Date;
}

const orderSchema = new Schema<IOrder>({
  id: { type: String, required: true},
  customerName: { type: String, required: true },
  items: [
    {
      productId: { type: String, required: true },
      quantity: { type: Number, required: true },
      price: { type: Number, required: true },
    },
  ],
  shippingCost: { type: Number, required: true},
  tax: { type: Number, required: true},
  subtotal: { type: Number, required: true},
  totalAmount: { type: Number, required: true },
  status: { type: String, enum: ['pending', 'completed', 'canceled'], required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  shippingInformation: {
    name: { type: String, required: true },
    address: { type: String, required: true },
    city: { type: String, required: true },
    province: { type: String, required: true },
    postalCode: { type: String, required: true },
  },
  billingInformation: {
    name: { type: String, required: false },
    address: { type: String, required: false },
    city: { type: String, required: false },
    province: { type: String, required: false },
    postalCode: { type: String, required: false },
  }
}, { timestamps: true });

const Order = models.Order || model<IOrder>('Order', orderSchema);
export default Order;

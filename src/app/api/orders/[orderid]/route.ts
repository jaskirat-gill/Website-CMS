import { NextResponse } from 'next/server';
import Order from '@/models/Order';
import { connectDB } from '@/lib/mongodb';
import { ObjectId } from 'mongodb';

export async function GET(req: Request, { params }: { params: { orderid: string } }) {
  await connectDB();
  const order = await Order.findById(new ObjectId(params.orderid));
  if (!order) {
    return NextResponse.json({ error: 'Order not found' }, { status: 404 });
  }
  return NextResponse.json(order);
}

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  await connectDB();
  const body = await req.json();
  const updatedOrder = await Order.findByIdAndUpdate(params.id, body, { new: true });
  
  if (!updatedOrder) {
    return NextResponse.json({ error: 'Order not found' }, { status: 404 });
  }
  return NextResponse.json(updatedOrder);
}

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  await connectDB();
  const deletedOrder = await Order.findByIdAndDelete(params.id);
  
  if (!deletedOrder) {
    return NextResponse.json({ error: 'Order not found' }, { status: 404 });
  }
  return NextResponse.json({ message: 'Order deleted' });
}

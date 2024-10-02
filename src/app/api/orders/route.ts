import { NextResponse } from 'next/server';
import Order from '@/models/Order';
import { connectDB } from '@/lib/mongodb';

export async function GET(req: Request) {
  await connectDB();

  const { searchParams } = new URL(req.url);
  const period = searchParams.get('period');
  
  // Fetching orders based on the period
  let dateFilter = {};
  const now = new Date();
  if (period === 'last_week') {
    dateFilter = { createdAt: { $gte: new Date(now.setDate(now.getDate() - 7)) } };
  } else if (period === 'last_month') {
    dateFilter = { createdAt: { $gte: new Date(now.setMonth(now.getMonth() - 1)) } };
  } else if (period === 'last_year') {
    dateFilter = { createdAt: { $gte: new Date(now.setFullYear(now.getFullYear() - 1)) } };
  }

  const orders = await Order.find(dateFilter);
  return NextResponse.json(orders);
}

export async function POST(req: Request) {
  await connectDB();
  const body = await req.json();
  
  const newOrder = new Order(body);
  await newOrder.save();

  return NextResponse.json(newOrder, { status: 201 });
}

import connectMongoDB from '@/libs/mongobd';
import Order from '@/models/Order';
import { NextRequest, NextResponse } from 'next/server';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

export async function GET() {
  try {
    await connectMongoDB();
    const orders = await Order.find();

    return NextResponse.json({ status: 'success', data: { orders } });
  } catch (error) {
    return NextResponse.json({ status: 'failed', message: (error as Error).message }, { status: 400 });
  }
}

export async function POST(request: NextRequest) {
  const { name, address, phone, email, products, coupon } = await request.json();

  try {
    await connectMongoDB();
    const order = await Order.create({ name, email, phone, address, products, coupon: coupon });

    return NextResponse.json({ status: 'success', data: { order } }, { status: 201, headers: corsHeaders });
  } catch (err) {
    console.log((err as Error).message);
    return NextResponse.json({ status: 'failed', message: (err as Error).message }, { status: 400 });
  }
}

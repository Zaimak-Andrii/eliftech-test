import connectMongoDB from '@/libs/mongobd';
import Order from '@/models/Order';
import { NextRequest, NextResponse } from 'next/server';

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

    return NextResponse.json({ status: 'success', data: { order } }, { status: 201 });
  } catch (err) {
    console.log((err as Error).message);
    return NextResponse.json({ status: 'failed', message: (err as Error).message }, { status: 400 });
  }
}

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

    const res = NextResponse.json({ status: 'success', data: { order } }, { status: 201 });

    res.headers.set('Access-Control-Allow-Credentials', 'true');
    res.headers.set('Access-Control-Allow-Origin', '*');
    res.headers.set('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
    res.headers.set(
      'Access-Control-Allow-Headers',
      'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
    );

    return res;
  } catch (err) {
    return NextResponse.json({ status: 'failed', message: (err as Error).message }, { status: 400 });
  }
}

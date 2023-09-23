import { NextResponse } from 'next/server';
import connectMongoDB from '@/libs/mongobd';
import Shop from '@/models/Shop';

export async function GET() {
  try {
    await connectMongoDB();
    const shops = await Shop.find();

    return NextResponse.json({ status: 'success', data: { shops } });
  } catch (error) {
    return NextResponse.json({ status: 'failed', message: (error as Error).message }, { status: 400 });
  }
}

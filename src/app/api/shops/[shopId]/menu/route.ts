import { NextRequest, NextResponse } from 'next/server';
import connectMongoDB from '@/libs/mongobd';
import Product from '@/models/Product';

export async function GET(_request: NextRequest, { params }: { params: { shopId: string } }) {
  const { shopId } = params;

  try {
    await connectMongoDB();
    const menu = await Product.find({ shop: shopId }).populate('shop');

    return NextResponse.json({ status: 'success', data: { menu } });
  } catch (error) {
    return NextResponse.json({ status: 'failed', message: (error as Error).message }, { status: 400 });
  }
}

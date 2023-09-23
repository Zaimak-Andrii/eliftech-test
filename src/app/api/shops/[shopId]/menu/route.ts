import { NextRequest, NextResponse } from 'next/server';
import connectMongoDB from '@/libs/mongobd';
import Product from '@/models/Product';

export async function GET(_request: NextRequest, { params }: { params: { shopId: string } }) {
  const { shopId } = params;
  await connectMongoDB();
  const menu = await Product.find({ shop: shopId }).populate('shop');

  return NextResponse.json({ menu });
}

export async function POST(request: NextRequest, { params }: { params: { shopId: string } }) {
  const { shopId } = params;
  const { imageUrl, name, price } = await request.json();
  await connectMongoDB();
  const product = await Product.create({ name, imageUrl, price, shop: shopId });

  return NextResponse.json({ product });
}

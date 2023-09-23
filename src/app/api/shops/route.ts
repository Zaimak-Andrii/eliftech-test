import connectMongoDB from '@/libs/mongobd';
import Shop from '@/models/Shop';
import { NextRequest, NextResponse } from 'next/server';

export async function GET() {
  await connectMongoDB();
  const shops = await Shop.find();

  return NextResponse.json({ shops });
}

export async function POST(request: NextRequest) {
  const { name } = await request.json();

  await connectMongoDB();
  await Shop.create({ name });

  return NextResponse.json({ message: 'Shop created' }, { status: 201 });
}

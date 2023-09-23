import { NextRequest, NextResponse } from 'next/server';
import connectMongoDB from '@/libs/mongobd';
import Shop from '@/models/Shop';

export async function GET(_request: NextRequest, { params }: { params: { shopId: string } }) {
  const { shopId } = params;

  try {
    await connectMongoDB();
    const shop = await Shop.findById({ _id: shopId });

    return NextResponse.json({ status: 'success', data: { shop } });
  } catch (error) {
    return NextResponse.json({ status: 'failed', message: (error as Error).message }, { status: 400 });
  }
}

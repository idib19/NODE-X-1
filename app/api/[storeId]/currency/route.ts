import { NextResponse } from 'next/server';
import prismadb from '@/lib/prismadb';


export async function GET(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  console.log("REQUETTE RECU")
};


  

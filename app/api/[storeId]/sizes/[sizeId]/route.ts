import { NextResponse } from "next/server";

import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { isAuthorised } from "@/permissions/checkStorePermission";

export async function GET(
  req: Request,
  { params }: { params: { sizeId: string } }
) {
  try {
    if (!params.sizeId) {
      return new NextResponse("Size id is required", { status: 400 });
    }

    const size = await prismadb.size.findUnique({
      where: {
        id: params.sizeId
      }
    });

    return NextResponse.json(size);
  } catch (error) {
    console.log('[SIZE_GET]', error);
    return new NextResponse("Internal error", { status: 500 });
  }
};

export async function DELETE(
  req: Request,
  { params }: { params: { sizeId: string, storeId: string } }
) {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 403 });
    }

    const havePermission = await isAuthorised(params.storeId, userId)

    if (!havePermission) {
      return new NextResponse("Unauthorized", { status: 401 });
    }


    if (!params.sizeId) {
      return new NextResponse("Size id is required", { status: 400 });
    }

    const size = await prismadb.size.delete({
      where: {
        id: params.sizeId
      }
    });

    return NextResponse.json(size);
  } catch (error) {
    console.log('[SIZE_DELETE]', error);
    return new NextResponse("Internal error", { status: 500 });
  }
};


export async function PATCH(
  req: Request,
  { params }: { params: { sizeId: string, storeId: string } }
) {
  try {
    // Authentication check
    const { userId } = auth();
    if (!userId) {
      return NextResponse.json({ error: "Unauthenticated" }, { status: 403 });
    }

    // Early authorization check
    const havePermission = await isAuthorised(params.storeId, userId);
    if (!havePermission) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Validate and sanitize input ! for more server security in the future !!! front end validation is already done with a library called zodresolver 
    if (!params.sizeId) {
      return NextResponse.json({ error: "Size id is required" }, { status: 400 });
    }

    const body = await req.json();
    const { name, value } = body;

    if (!name) {
      return NextResponse.json({ error: "Name is required" }, { status: 400 });
    }

    if (!value) {
      return NextResponse.json({ error: "Value is required" }, { status: 400 });
    }

    // Proceed with the update operation
    const size = await prismadb.size.update({
      where: { id: params.sizeId },
      data: { name, value }
    });

    return NextResponse.json(size);
  } catch (error) {
    console.error('[SIZE_PATCH]', error);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
};


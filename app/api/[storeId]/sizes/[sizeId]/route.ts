import { NextResponse } from "next/server";

import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { validateRequestAndAuthorize } from "@/permissions/checkStorePermission";
import validator from 'validator';

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
    // Authentication check
    const { userId } = auth();

    const validateRequest = await validateRequestAndAuthorize(params.storeId, userId!, params.sizeId)

    if (validateRequest.error) {
      return NextResponse.json({ error: validateRequest.error }, { status: validateRequest.status });
    }

    // Sanitization
    const sanitizedSizeId = validator.trim(validator.escape(params.sizeId));

    // Validation
    if (typeof sanitizedSizeId !== "string" || !validator.isUUID(sanitizedSizeId)) {
      return new NextResponse("Invalid size id format", { status: 400 });
    }

    // Check if sizeId exists in the database (optional, depending on your use case)

    // Perform deletion
    const size = await prismadb.size.delete({
      where: {
        id: sanitizedSizeId
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

    const validateRequest = await validateRequestAndAuthorize(params.storeId, userId!, params.sizeId)

    if (validateRequest.error) {
      return NextResponse.json({ error: validateRequest.error }, { status: validateRequest.status });
    }

    // Sanitize and Validate sizeId
    const sanitizedSizeId = validator.trim(validator.escape(params.sizeId));
    if (!validator.isUUID(sanitizedSizeId)) {
      return NextResponse.json({ error: "Invalid size id format" }, { status: 400 });
    }

    const body = await req.json();
    let { name, value } = body;

    // Validate and Sanitize name
    if (typeof name !== "string") {
      return NextResponse.json({ error: "Name is required and must be a string" }, { status: 400 });
    }
    name = validator.trim(validator.escape(name));

    // Validate and Sanitize value
    if (typeof value !== "string") {
      return NextResponse.json({ error: "Value is required and must be a string" }, { status: 400 });
    }
    value = validator.trim(validator.escape(value));

    // Proceed with the update operation
    const size = await prismadb.size.update({
      where: { id: sanitizedSizeId },
      data: { name, value }
    });

    return NextResponse.json(size);
  } catch (error) {
    console.error('[SIZE_PATCH]', error);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
};

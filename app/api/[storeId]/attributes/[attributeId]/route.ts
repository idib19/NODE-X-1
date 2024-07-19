import { NextResponse } from "next/server";

import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { validateRequestAndAuthorize } from "@/permissions/checkStorePermission";
import validator from 'validator';

export async function GET(
  req: Request,
  { params }: { params: { attributeId: string } }
) {
  try {
    if (!params.attributeId) {
      return new NextResponse("attribute id is required", { status: 400 });
    }

    const attribute = await prismadb.attribute.findUnique({
      where: {
        id: params.attributeId
      }
    });

    return NextResponse.json(attribute);

  } catch (error) {
    console.log('[attribute_GET]', error);
    return new NextResponse("Internal error", { status: 500 });
  }
  
};

export async function DELETE(
  req: Request,
  { params }: { params: { attributeId: string, storeId: string } }
) {
  try {
    // Authentication check
    const { userId } = auth();

    const validateRequest = await validateRequestAndAuthorize(params.storeId, userId!, params.attributeId)

    if (validateRequest.error) {
      return NextResponse.json({ error: validateRequest.error }, { status: validateRequest.status });
    }

    // Sanitization
    const sanitizedattributeId = validator.trim(validator.escape(params.attributeId));

    // Validation
    if (typeof sanitizedattributeId !== "string" || !validator.isUUID(sanitizedattributeId)) {
      return new NextResponse("Invalid attribute id format", { status: 400 });
    }

    // Check if attributeId exists in the database (optional, depending on your use case)

    // Perform deletion
    const attribute = await prismadb.attribute.delete({
      where: {
        id: sanitizedattributeId
      }
    });

    return NextResponse.json(attribute);
  } catch (error) {
    console.log('[attribute_DELETE]', error);
    return new NextResponse("Internal error", { status: 500 });
  }
};

// export async function PATCH(
//   req: Request,
//   { params }: { params: { attributeId: string, storeId: string } }
// ) {
//   try {
//     // Authentication check
//     const { userId } = auth();

//     const validateRequest = await validateRequestAndAuthorize(params.storeId, userId!, params.attributeId)

//     if (validateRequest.error) {
//       return NextResponse.json({ error: validateRequest.error }, { status: validateRequest.status });
//     }

//     // Sanitize and Validate attributeId
//     const sanitizedattributeId = validator.trim(validator.escape(params.attributeId));
//     if (!validator.isUUID(sanitizedattributeId)) {
//       return NextResponse.json({ error: "Invalid attribute id format" }, { status: 400 });
//     }

//     const body = await req.json();
//     let { name, value } = body;

//     // Validate and Sanitize name
//     if (typeof name !== "string") {
//       return NextResponse.json({ error: "Name is required and must be a string" }, { status: 400 });
//     }
//     name = validator.trim(validator.escape(name));

//     // Validate and Sanitize value
//     if (typeof value !== "string") {
//       return NextResponse.json({ error: "Value is required and must be a string" }, { status: 400 });
//     }
//     value = validator.trim(validator.escape(value));

//     // Proceed with the update operation
//     const attribute = await prismadb.attribute.update({
//       where: { id: sanitizedattributeId },
//       data: { name, value }
//     });

//     return NextResponse.json(attribute);
//   } catch (error) {
//     console.error('[attribute_PATCH]', error);
//     return NextResponse.json({ error: "Internal error" }, { status: 500 });
//   }
// };

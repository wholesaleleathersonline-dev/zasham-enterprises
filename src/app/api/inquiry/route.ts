import { Resend } from "resend";
import { NextResponse } from "next/server";

//const resend = new Resend(process.env.RESEND_API_KEY);
const resend = null;


console.log("ALL ENV KEYS:", Object.keys(process.env).filter(key =>
  key.includes("RESEND")
));


console.log("API KEY:", process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {



    const apiKey = process.env.RESEND_API_KEY;

if (!apiKey) {
  return NextResponse.json(
    {
      success: false,
      message: "RESEND_API_KEY is missing.",
    },
    {
      status: 500,
    }
  );
}

const resend = new Resend(apiKey);





    const body = await request.json();

    const {
      product,
      customerName,
      organization,
      quantity,
      productType,
      contactNumber,
      email,
      notes,
    } = body;

    const { error } = await resend.emails.send({
      from: "Zasham Enterprises <onboarding@resend.dev>",
      to: ["wholesaleleathersonline@gmail.com"],
      replyTo: email,
      subject: `New Wholesale Inquiry - ${product}`,
      html: `
      <div style="font-family:Arial,sans-serif;padding:30px;background:#f7f7f7">
        <div style="max-width:700px;margin:auto;background:white;padding:30px;border-radius:10px">

          <h2 style="color:#D4AF37;">
            New Wholesale Inquiry
          </h2>

          <table style="width:100%;border-collapse:collapse">

            <tr>
              <td><strong>Product</strong></td>
              <td>${product}</td>
            </tr>

            <tr>
              <td><strong>Customer Name</strong></td>
              <td>${customerName}</td>
            </tr>

            <tr>
              <td><strong>Organization</strong></td>
              <td>${organization || "-"}</td>
            </tr>

            <tr>
              <td><strong>Quantity</strong></td>
              <td>${quantity}</td>
            </tr>

            <tr>
              <td><strong>Product Type</strong></td>
              <td>${productType}</td>
            </tr>

            <tr>
              <td><strong>Contact Number</strong></td>
              <td>${contactNumber}</td>
            </tr>

            <tr>
              <td><strong>Email</strong></td>
              <td>${email}</td>
            </tr>

            <tr>
              <td><strong>Additional Notes</strong></td>
              <td>${notes || "-"}</td>
            </tr>

          </table>

        </div>
      </div>
      `,
    });

if (error) {
  console.error("RESEND ERROR:", error);

  return NextResponse.json(
    {
      success: false,
      error,
    },
    {
      status: 500,
    }
  );
}

    return NextResponse.json({
      success: true,
    });

  } catch (error) {

  console.error("API ERROR:", error);

  return NextResponse.json(
    {
      success: false,
      error: String(error),
    },
    {
      status: 500,
    }
    );

  }
}
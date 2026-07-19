import { NextResponse } from "next/server";
import { Resend } from "resend";

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
  invoiceNumber,
  customerName,
  company,
  invoiceDate,
  dueDate,
  total,
  currency,
  email,
} = body;

    const { error } = await resend.emails.send({
      from: "Zasham Enterprises <onboarding@resend.dev>",
      to: [email],
      subject: `Invoice ${invoiceNumber}`,
    html: `
<div style="margin:0;padding:40px;background:#f4f4f5;font-family:Arial,sans-serif;">
  <div style="max-width:700px;margin:auto;background:#ffffff;border-radius:16px;overflow:hidden;border:1px solid #e5e7eb;">

    <div style="background:#111827;padding:30px;text-align:center;">
      <h1 style="margin:0;color:#D4AF37;font-size:28px;">
        ZASHAM ENTERPRISES
      </h1>

      <p style="margin-top:10px;color:#d1d5db;">
        Professional Custom Sportswear Manufacturer
      </p>
    </div>

    <div style="padding:35px;">

      <h2 style="margin-top:0;color:#111827;">
        Invoice Ready
      </h2>

      <p style="font-size:16px;color:#374151;">
        Hello <strong>${customerName}</strong>,
      </p>

      <p style="color:#4b5563;line-height:1.7;">
        Thank you for choosing Zasham Enterprises.
        Your invoice has been generated successfully.
      </p>

      <table style="width:100%;border-collapse:collapse;margin-top:25px;">

        <tr>
          <td style="padding:10px;border-bottom:1px solid #eee;"><strong>Invoice Number</strong></td>
          <td style="padding:10px;border-bottom:1px solid #eee;">${invoiceNumber}</td>
        </tr>

        <tr>
          <td style="padding:10px;border-bottom:1px solid #eee;"><strong>Company</strong></td>
          <td style="padding:10px;border-bottom:1px solid #eee;">${company || "-"}</td>
        </tr>

        <tr>
          <td style="padding:10px;border-bottom:1px solid #eee;"><strong>Invoice Date</strong></td>
          <td style="padding:10px;border-bottom:1px solid #eee;">${invoiceDate}</td>
        </tr>

        <tr>
          <td style="padding:10px;border-bottom:1px solid #eee;"><strong>Due Date</strong></td>
          <td style="padding:10px;border-bottom:1px solid #eee;">${dueDate}</td>
        </tr>

        <tr>
          <td style="padding:10px;"><strong>Total</strong></td>
          <td style="padding:10px;font-size:20px;font-weight:bold;color:#D4AF37;">
            ${currency} ${Number(total).toFixed(2)}
          </td>
        </tr>

      </table>

      <p style="margin-top:35px;color:#6b7280;line-height:1.7;">
        If you have any questions regarding this invoice,
        simply reply to this email and our team will assist you.
      </p>

    </div>

    <div style="background:#111827;padding:20px;text-align:center;color:#9ca3af;font-size:13px;">
      © ${new Date().getFullYear()} Zasham Enterprises • Pakistan
    </div>

  </div>
</div>
`,
    });

if (error) {
  console.error("RESEND ERROR:", error);

  return NextResponse.json(
    {
      success: false,
      message:
        "Email service is currently in testing mode. Customer emails will work after a verified domain is connected to Resend.",
      error,
    },
    {
      status: 403,
    }
  );
}
    return NextResponse.json({
      success: true,
    });
} catch (error) {
  console.error("SEND EMAIL CATCH:", error);

  return NextResponse.json(
    {
      success: false,
      error:
        error instanceof Error ? error.message : String(error),
    },
    {
      status: 500,
    }
  );
}
}
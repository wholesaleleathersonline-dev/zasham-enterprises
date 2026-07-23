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
  inquiryType = "product",

  product,
  customerName,
  organization,

  uniformCategory,

  quantity,

  productType,

  country,

  contactNumber,

  email,

  message,

  notes,
  newsletterEmail,
  teamName,
captainName,
captainEmail,
playerLink,
captainLink,
} = body;

    const { error } = await resend.emails.send({
      from: "Zasham Enterprises <info@zashamenterprises.com>",
    to:
  inquiryType === "order-sheet"
    ? [captainEmail]
    : ["wholesaleleathersonline@gmail.com"],
      replyTo: email,
     subject:
  inquiryType === "order-sheet"
    ? `Captain Dashboard | ${teamName} | Zasham Enterprises`
    : inquiryType === "newsletter"
    ? "🎁 New Gift Popup Subscriber"
    : inquiryType === "contact"
    ? `New Contact Inquiry - ${customerName}`
    : `New Wholesale Inquiry - ${product}`,
 html:
  inquiryType === "order-sheet"
    ? `
<div style="font-family:Arial,sans-serif;background:#f4f4f4;padding:40px">
  <div style="max-width:700px;margin:auto;background:#fff;padding:40px;border-radius:12px">

    <h1 style="color:#D4AF37;margin-top:0">
      Your Order Sheet is Ready 🎉
    </h1>

    <p>Hi <strong>${captainName}</strong>,</p>

    <p>
      Your team <strong>${teamName}</strong> has been created successfully.
    </p>

    <hr style="margin:30px 0;border:none;border-top:1px solid #ddd">

    <h3>Player Order Form</h3>

    <p>
      <a href="${playerLink}">
        ${playerLink}
      </a>
    </p>

    <h3>Captain Dashboard</h3>

    <p>
      <a href="${captainLink}">
        ${captainLink}
      </a>
    </p>

    <p style="margin-top:30px">
      Please save this email for future access.
    </p>

    <p>
      Regards,<br>
      <strong>Zasham Enterprises</strong>
    </p>

  </div>
</div>
`
    : `
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
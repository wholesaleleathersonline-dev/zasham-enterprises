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

    const { email } = body;

    if (!email) {
      return NextResponse.json(
        {
          success: false,
          message: "Email is required.",
        },
        {
          status: 400,
        }
      );
    }

    const { error } = await resend.emails.send({
      from: "Zasham Enterprises <onboarding@resend.dev>",
      to: ["wholesaleleathersonline@gmail.com"],
      replyTo: email,
      subject: "🎁 New Gift Popup Subscriber",
      html: `
        <div style="font-family:Arial,sans-serif;padding:30px;background:#f7f7f7">
          <div style="max-width:700px;margin:auto;background:#fff;padding:30px;border-radius:12px">

            <h2 style="color:#D4AF37;">
              🎁 New Gift Popup Subscriber
            </h2>

            <p>
              A new visitor subscribed from the homepage popup.
            </p>

            <table style="width:100%;border-collapse:collapse">

              <tr>
                <td><strong>Email</strong></td>
                <td>${email}</td>
              </tr>

            </table>

          </div>
        </div>
      `,
    });

    if (error) {
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
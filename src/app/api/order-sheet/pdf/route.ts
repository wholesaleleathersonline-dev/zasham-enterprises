import { NextResponse } from "next/server";
import { Resend } from "resend";

export async function POST(request: Request) {
  try {
    const apiKey = process.env.RESEND_API_KEY;

    if (!apiKey) {
      return NextResponse.json(
        {
          success: false,
          message: "RESEND_API_KEY missing",
        },
        {
          status: 500,
        }
      );
    }

    const resend = new Resend(apiKey);

    const formData = await request.formData();

    const file = formData.get("file") as File;
    const teamName = formData.get("teamName") as string;


    if (!file) {
      return NextResponse.json(
        {
          success: false,
          message: "PDF file missing",
        },
        {
          status: 400,
        }
      );
    }


    const buffer = Buffer.from(
      await file.arrayBuffer()
    );


    const { error } = await resend.emails.send({

      from:
        "Zasham Enterprises <onboarding@resend.dev>",

      to:[
        "wholesaleleathersonline@gmail.com"
      ],

      subject:
        `📄 New Order Sheet - ${teamName}`,

      html:`
        <div style="font-family:Arial;padding:30px">
          <h2 style="color:#D4AF37">
            New Order Sheet Submitted
          </h2>

          <p>
            Team Name:
            <strong>${teamName}</strong>
          </p>

          <p>
            PDF attached.
          </p>
        </div>
      `,

      attachments:[
        {
          filename:file.name,
          content:buffer,
        }
      ]

    });


    if(error){
      return NextResponse.json(
        {
          success:false,
          error,
        },
        {
          status:500,
        }
      );
    }


    return NextResponse.json({
      success:true,
    });


  } catch(error){

    console.error(error);

    return NextResponse.json(
      {
        success:false,
        error:String(error),
      },
      {
        status:500,
      }
    );
  }
}
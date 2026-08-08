import OpenAI from "openai";
import { toFile } from "openai/uploads";
import { NextResponse } from "next/server";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const TEXTURE_PROMPT = `
Create a premium, high-end sports sublimation background texture inspired strictly by the uploaded sports uniform.

Analyze the uploaded front, back, and shorts together and extract ONLY the visual design language:

- color palette
- gradients
- geometric shapes
- patterns
- linework
- grunge intensity
- contrast
- depth
- overall athletic aesthetic

Create a completely original background texture that feels like it belongs to the same uniform collection.

IMPORTANT RESTRICTIONS:

- Do NOT recreate any logo.
- Do NOT modify any logo.
- Do NOT generate company branding.
- Do NOT generate team branding.
- Do NOT generate team names.
- Do NOT generate player names.
- Do NOT generate numbers.
- Do NOT generate slogans.
- Do NOT generate badges.
- Do NOT generate typography.
- Do NOT reproduce the exact artwork from the uniform.
- Do NOT create another uniform.
- Do NOT create clothing.
- Do NOT include people.
- Do NOT include mannequins.
- Do NOT include products.

Generate ONLY an original flat sublimation-ready background texture.

The texture should preserve the visual language of the uploaded uniform while being completely original.

Make it:
- bold
- modern
- aggressive
- premium
- professional
- athletic
- visually striking

Use sophisticated abstract geometry, controlled gradients, layered shapes, subtle depth, dynamic movement and professional sportswear sublimation aesthetics.

The generated image must contain NO text, NO logos, NO numbers and NO branding.

ONLY BACKGROUND TEXTURE.
`;

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const { mockupUrl } = body;

    if (!mockupUrl) {
      return NextResponse.json(
        {
          error: "Mockup URL is required.",
        },
        {
          status: 400,
        }
      );
    }

    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json(
        {
          error: "OPENAI_API_KEY is not configured.",
        },
        {
          status: 500,
        }
      );
    }

    // Download the uploaded Supabase image
    const imageResponse = await fetch(mockupUrl);

    if (!imageResponse.ok) {
      throw new Error(
        `Could not download mockup image. Status: ${imageResponse.status}`
      );
    }

    const imageBuffer = Buffer.from(
      await imageResponse.arrayBuffer()
    );

    // Convert downloaded image into an actual file
    const imageFile = await toFile(
      imageBuffer,
      "uniform-mockup.png",
      {
        type:
          imageResponse.headers.get("content-type") ||
          "image/png",
      }
    );

    // Send actual file to OpenAI
    const result = await openai.images.edit({
      model: "gpt-image-2",
      image: imageFile,
      prompt: TEXTURE_PROMPT,
      size: "1536x1024",
      quality: "medium",
    });

    const imageBase64 = result.data?.[0]?.b64_json;

    if (!imageBase64) {
      throw new Error(
        "AI did not return an image."
      );
    }

    return NextResponse.json({
      success: true,
      imageBase64,
    });
  } catch (error) {
    console.error(
      "AI texture generation failed:",
      error
    );

    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "AI texture generation failed.",
      },
      {
        status: 500,
      }
    );
  }
}
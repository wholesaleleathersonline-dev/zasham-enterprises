"use client";

import { useState } from "react";
import {
  ArrowLeft,
  Sparkles,
  Upload,
  Image as ImageIcon,
  WandSparkles,
  ShieldCheck,
  Download,
} from "lucide-react";
import Link from "next/link";
import { uploadTextureMockup } from "../../../services/admin/storage.service";

import { useRef } from "react";


export default function AITexturePage(): React.JSX.Element {
  const [mockupPreview, setMockupPreview] = useState<string | null>(null);
const [mockupUrl, setMockupUrl] = useState<string | null>(null);
const [isUploading, setIsUploading] = useState(false);
const [uploadError, setUploadError] = useState<string | null>(null);
const presentationRef = useRef<HTMLDivElement>(null);
const [isGenerating, setIsGenerating] = useState(false);
const [generatedTexture, setGeneratedTexture] = useState<string | null>(null);
const [generationError, setGenerationError] = useState<string | null>(null);

const handleExportPNG = async () => {
  if (!mockupPreview) return;

  try {
    const canvas = document.createElement("canvas");

    // High-resolution final PNG
    canvas.width = 1800;
    canvas.height = 2250;

    const ctx = canvas.getContext("2d");

    if (!ctx) {
      throw new Error("Could not create canvas context.");
    }

    // =========================
    // BACKGROUND
    // =========================

    ctx.fillStyle = "#080808";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Gold radial glow
    const glow = ctx.createRadialGradient(
      900,
      900,
      100,
      900,
      900,
      1000
    );

    glow.addColorStop(0, "rgba(234,179,8,0.14)");
    glow.addColorStop(1, "rgba(234,179,8,0)");

    ctx.fillStyle = glow;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // =========================
    // DECORATIVE GOLD LINES
    // =========================

    ctx.strokeStyle = "rgba(234,179,8,0.55)";
    ctx.lineWidth = 3;

    ctx.beginPath();
    ctx.moveTo(40, 40);
    ctx.lineTo(180, 40);
    ctx.moveTo(40, 40);
    ctx.lineTo(40, 180);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(1760, 40);
    ctx.lineTo(1620, 40);
    ctx.moveTo(1760, 40);
    ctx.lineTo(1760, 180);
    ctx.stroke();

    // =========================
    // TOP BRANDING
    // =========================

    ctx.textAlign = "left";

    ctx.fillStyle = "#EAB308";
    ctx.font = "bold 26px Arial";
    ctx.letterSpacing = "8px";
    ctx.fillText(
      "ZASHAM ENTERPRISES",
      100,
      105
    );

    ctx.fillStyle = "#FFFFFF";
    ctx.font = "bold 58px Arial";
    ctx.fillText(
      "CUSTOM SPORTSWEAR",
      100,
      175
    );

    ctx.fillStyle = "#737373";
    ctx.font = "16px Arial";
    ctx.fillText(
      "PREMIUM UNIFORM COLLECTION",
      100,
      215
    );

    // =========================
    // LOGO
    // =========================

    const logo = new Image();

    await new Promise<void>((resolve, reject) => {
      logo.onload = () => resolve();
      logo.onerror = () =>
        reject(new Error("Failed to load Zasham logo."));

      logo.src = "/logo/ze-logo.png";
    });

    const logoSize = 150;

    ctx.drawImage(
      logo,
      1530,
      70,
      logoSize,
      logoSize
    );

    // =========================
    // MOCKUP
    // =========================

    const mockup = new Image();

    await new Promise<void>((resolve, reject) => {
      mockup.onload = () => resolve();
      mockup.onerror = () =>
        reject(new Error("Failed to load mockup image."));

      mockup.src = mockupPreview;
    });

    /*
      IMPORTANT:
      Fit the COMPLETE uploaded image inside
      the available area.

      No transform.
      No crop.
      No max-width.
      No CSS.
    */

    const areaX = 120;
    const areaY = 300;
    const areaWidth = 1560;
    const areaHeight = 1550;

    const imageRatio =
      mockup.width / mockup.height;

    const areaRatio =
      areaWidth / areaHeight;

    let drawWidth;
    let drawHeight;

    if (imageRatio > areaRatio) {
      drawWidth = areaWidth;
      drawHeight = drawWidth / imageRatio;
    } else {
      drawHeight = areaHeight;
      drawWidth = drawHeight * imageRatio;
    }

    const drawX =
      areaX + (areaWidth - drawWidth) / 2;

    const drawY =
      areaY + (areaHeight - drawHeight) / 2;

    // subtle shadow
    ctx.save();

    ctx.shadowColor = "rgba(0,0,0,0.75)";
    ctx.shadowBlur = 45;
    ctx.shadowOffsetY = 25;

    ctx.drawImage(
      mockup,
      drawX,
      drawY,
      drawWidth,
      drawHeight
    );

    ctx.restore();

    // =========================
    // BOTTOM BRANDING
    // =========================

    ctx.fillStyle = "rgba(0,0,0,0.85)";
    ctx.fillRect(
      0,
      2030,
      1800,
      220
    );

    ctx.strokeStyle =
      "rgba(234,179,8,0.25)";
    ctx.lineWidth = 2;

    ctx.beginPath();
    ctx.moveTo(100, 2030);
    ctx.lineTo(1700, 2030);
    ctx.stroke();

    ctx.fillStyle = "#737373";
    ctx.font = "16px Arial";
    ctx.fillText(
      "DESIGNED & MANUFACTURED BY",
      100,
      2110
    );

    ctx.fillStyle = "#FFFFFF";
    ctx.font = "bold 30px Arial";
    ctx.fillText(
      "ZASHAM ENTERPRISES",
      100,
      2160
    );

    ctx.fillStyle = "#EAB308";
    ctx.font = "16px Arial";

    ctx.textAlign = "right";

    ctx.fillText(
      "PREMIUM CUSTOM SPORTSWEAR",
      1700,
      2140
    );

    ctx.fillStyle = "#737373";
    ctx.font = "14px Arial";

    ctx.fillText(
      "ZASHAM ENTERPRISES",
      1700,
      2170
    );

    // =========================
    // EXPORT
    // =========================

    const dataUrl = canvas.toDataURL(
      "image/png",
      1
    );

    const link =
      document.createElement("a");

    link.download =
      `zasham-uniform-presentation-${Date.now()}.png`;

    link.href = dataUrl;

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

  } catch (error) {
    console.error(
      "PNG export failed:",
      error
    );
  }
};


const handleMockupUpload = async (
  event: React.ChangeEvent<HTMLInputElement>
) => {
  const file = event.target.files?.[0];

  if (!file) return;

  setUploadError(null);
  setIsUploading(true);

  try {
    // Create a stable Data URL for preview + PNG export
    const reader = new FileReader();

    const previewUrl = await new Promise<string>((resolve, reject) => {
      reader.onload = () => {
        if (typeof reader.result === "string") {
          resolve(reader.result);
        } else {
          reject(new Error("Failed to create image preview."));
        }
      };

      reader.onerror = () => {
        reject(new Error("Failed to read image file."));
      };

      reader.readAsDataURL(file);
    });

    // Show preview
    setMockupPreview(previewUrl);

    // Upload original file to Supabase
    const uploadedUrl = await uploadTextureMockup(file);

    setMockupUrl(uploadedUrl);
  } catch (error) {
    console.error("Mockup upload failed:", error);

    setMockupPreview(null);
    setMockupUrl(null);

    setUploadError(
      error instanceof Error
        ? error.message
        : "Failed to upload mockup."
    );
  } finally {
    setIsUploading(false);
  }
};

const handleGenerateTexture = async () => {
  if (!mockupUrl) return;

  setIsGenerating(true);
  setGenerationError(null);
  setGeneratedTexture(null);

  try {
    console.log("Sending mockup to AI:", mockupUrl);

    const response = await fetch("/api/ai-texture/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        mockupUrl,
      }),
    });

    const data = await response.json();

    console.log("AI response:", data);

    if (!response.ok) {
      throw new Error(
        data.error || "Failed to generate AI texture."
      );
    }

    if (!data.imageBase64) {
      console.error("AI response has no image:", data);

      throw new Error(
        "AI generated a response, but no image was returned."
      );
    }

    const textureUrl = `data:image/png;base64,${data.imageBase64}`;

    console.log(
      "Texture received:",
      textureUrl.substring(0, 50)
    );

    setGeneratedTexture(textureUrl);
  } catch (error) {
    console.error("Texture generation failed:", error);

    setGenerationError(
      error instanceof Error
        ? error.message
        : "Failed to generate AI texture."
    );
  } finally {
    setIsGenerating(false);
  }
};

  return (
    <div className="min-h-full space-y-8">
      {/* Header */}
      <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <Link
            href="/admin/dashboard"
            className="mb-4 inline-flex items-center gap-2 text-sm text-gray-400 transition hover:text-yellow-400"
          >
            <ArrowLeft size={16} />
            Back to Dashboard
          </Link>

          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-yellow-500/20 bg-yellow-500/10 text-yellow-400">
              <Sparkles size={24} />
            </div>

            <div>
              <h1 className="text-3xl font-bold text-white">
                AI Texture Studio
              </h1>

              <p className="mt-1 text-gray-400">
                Create premium sublimation textures from your uniform mockup.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
        {/* Upload Section */}
        <div className="xl:col-span-2">
          <div className="rounded-2xl border border-yellow-500/10 bg-[#1A1A1A] p-6">
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-white">
                Upload Mockup
              </h2>

              <p className="mt-1 text-sm text-gray-400">
                Upload one image containing the front, back and shorts.
              </p>
            </div>

            <label
              htmlFor="mockup-upload"
              className="group relative flex min-h-[420px] cursor-pointer items-center justify-center overflow-hidden rounded-2xl border border-dashed border-yellow-500/30 bg-[#111111] transition hover:border-yellow-500/60 hover:bg-yellow-500/[0.03]"
            >
              {mockupPreview ? (
                <>
                  <img
                    src={mockupPreview}
                    alt="Uploaded uniform mockup"
                    className="h-full max-h-[520px] w-full object-contain p-6"
                  />

                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 rounded-xl border border-yellow-500/20 bg-black/80 px-4 py-2 text-sm text-gray-300 backdrop-blur">
                    Click to replace mockup
                  </div>
                </>
              ) : (
                <div className="flex flex-col items-center px-6 text-center">
                  <div className="mb-5 flex h-20 w-20 items-center justify-center rounded-2xl border border-yellow-500/20 bg-yellow-500/10 text-yellow-400">
                    <Upload size={34} />
                  </div>

                  <h3 className="text-lg font-semibold text-white">
                    Upload Uniform Mockup
                  </h3>

                  <p className="mt-2 max-w-md text-sm leading-6 text-gray-400">
                    Upload your front, back and shorts mockup as a single image.
                    The mockup will remain separate from the AI-generated
                    texture.
                  </p>

                  <span className="mt-5 rounded-xl border border-yellow-500/20 bg-yellow-500/10 px-5 py-2.5 text-sm font-medium text-yellow-400 transition group-hover:bg-yellow-500/20">
                    Choose Image
                  </span>

                  <p className="mt-4 text-xs text-gray-500">
                    PNG, JPG or WEBP
                  </p>
                </div>
              )}

 <input
  id="mockup-upload"
  type="file"
  accept="image/png,image/jpeg,image/webp"
  className="hidden"
  onChange={handleMockupUpload}
/>
</label>

{uploadError && (
  <p className="mt-3 text-sm text-red-400">
    {uploadError}
  </p>
)}

</div>
</div>
        {/* Company Identity */}
        <div className="space-y-6">
          <div className="rounded-2xl border border-yellow-500/10 bg-[#1A1A1A] p-6">
            <div className="mb-5 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-green-500/10 text-green-400">
                <ShieldCheck size={20} />
              </div>

              <div>
                <h2 className="font-semibold text-white">
                  Company Identity
                </h2>

                <p className="text-xs text-gray-500">
                  Permanent brand elements
                </p>
              </div>
            </div>

            <div className="rounded-xl border border-green-500/10 bg-green-500/[0.04] p-4">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-[#111111] text-gray-500">
                  <ImageIcon size={22} />
                </div>

                <div>
                  <p className="text-sm font-medium text-white">
                    Company Logo
                  </p>

                  <p className="mt-1 text-xs text-green-400">
                    Protected from AI modification
                  </p>
                </div>
              </div>
            </div>

            <p className="mt-4 text-xs leading-5 text-gray-500">
              Your company identity will remain permanent. AI will only
              generate the background texture.
            </p>
          </div>

          {/* AI Generation */}
          <div className="rounded-2xl border border-yellow-500/10 bg-[#1A1A1A] p-6">
            <div className="mb-5 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-yellow-500/10 text-yellow-400">
                <WandSparkles size={20} />
              </div>

              <div>
                <h2 className="font-semibold text-white">
                  AI Texture
                </h2>

                <p className="text-xs text-gray-500">
                  Generate original texture
                </p>
              </div>
            </div>

       <button
  type="button"
  onClick={handleGenerateTexture}
  disabled={!mockupUrl || isUploading || isGenerating}
  className="flex w-full items-center justify-center gap-2 rounded-xl bg-yellow-500 px-5 py-3 font-semibold text-black transition hover:bg-yellow-400 disabled:cursor-not-allowed disabled:opacity-40"
>
  {isUploading ? (
    <>
      <span className="h-4 w-4 animate-spin rounded-full border-2 border-black/30 border-t-black" />
      Uploading Mockup...
    </>
  ) : isGenerating ? (
    <>
      <span className="h-4 w-4 animate-spin rounded-full border-2 border-black/30 border-t-black" />
      Generating Texture...
    </>
  ) : (
    <>
      <Sparkles size={18} />
      Generate AI Texture
    </>
  )}
</button>

            {!mockupPreview && (
              <p className="mt-3 text-center text-xs text-gray-500">
                Upload a mockup first.
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Generated Textures */}
      <div className="rounded-2xl border border-yellow-500/10 bg-[#1A1A1A] p-6">
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-white">
            Generated Textures
          </h2>

          {generationError && (
  <div className="mb-4 rounded-xl border border-red-500/20 bg-red-500/10 p-4 text-sm text-red-400">
    {generationError}
  </div>
)}

          <p className="mt-1 text-sm text-gray-400">
            Your AI-generated sublimation textures will appear here.
          </p>
        </div>
<div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
  {generatedTexture ? (
    <div className="group relative overflow-hidden rounded-xl border border-yellow-500/30 bg-[#111111] lg:col-span-2">
    <img
  src={generatedTexture}
  alt="AI generated sublimation texture"
  className="block aspect-square w-full object-cover"
/>

      <div className="absolute bottom-0 left-0 right-0 bg-black/80 p-4 backdrop-blur-sm">
        <p className="text-sm font-semibold text-white">
          AI Texture 01
        </p>

        <p className="mt-1 text-xs text-gray-400">
          Generated from your uploaded uniform
        </p>
      </div>
    </div>
  ) : (
    [1, 2, 3, 4].map((item) => (
      <div
        key={item}
        className="flex min-h-[220px] items-center justify-center rounded-xl border border-white/5 bg-[#111111]"
      >
        <div className="text-center text-gray-600">
          <Sparkles
            className="mx-auto mb-3"
            size={28}
          />

          <p className="text-sm">
            Texture {item}
          </p>
        </div>
      </div>
    ))
  )}
</div>
      </div>

{/* Mockup Presentation */}
<div className="rounded-2xl border border-yellow-500/10 bg-[#1A1A1A] p-6">
  <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
    <div>
      <h2 className="text-xl font-semibold text-white">
        Mockup Presentation
      </h2>

      <p className="mt-1 text-sm text-gray-400">
        Create a premium branded PNG presentation from your mockup.
      </p>
    </div>

    <button
      type="button"
      onClick={handleExportPNG}
      disabled={!mockupPreview}
      className="inline-flex items-center justify-center gap-2 rounded-xl bg-yellow-500 px-5 py-3 text-sm font-semibold text-black transition hover:bg-yellow-400 disabled:cursor-not-allowed disabled:opacity-40"
    >
      <Download size={18} />
      Export PNG
    </button>
  </div>

  {/* EXPORT AREA */}
 <div
  ref={presentationRef}
  className="relative mx-auto h-[1125px] w-[900px] max-w-full overflow-hidden rounded-2xl bg-[#080808]"
>
    {/* Premium background glow */}
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(234,179,8,0.18),transparent_32%),radial-gradient(circle_at_80%_80%,rgba(234,179,8,0.10),transparent_30%)]" />

    {/* Decorative lines */}
    <div className="absolute left-0 top-0 h-full w-[2px] bg-gradient-to-b from-transparent via-yellow-500/70 to-transparent" />

    <div className="absolute right-0 top-0 h-full w-[2px] bg-gradient-to-b from-transparent via-yellow-500/40 to-transparent" />

    {/* Top identity */}
    <div className="absolute left-0 right-0 top-0 z-20 flex items-center justify-between px-7 py-6 sm:px-10 sm:py-8">
      <div>
        <p className="text-[9px] font-bold uppercase tracking-[0.45em] text-yellow-500 sm:text-xs">
          ZASHAM ENTERPRISES
        </p>

        <h3 className="mt-2 text-xl font-bold tracking-tight text-white sm:text-3xl">
          CUSTOM SPORTSWEAR
        </h3>

        <p className="mt-1 text-[9px] uppercase tracking-[0.25em] text-gray-500 sm:text-xs">
          Premium Uniform Collection
        </p>
      </div>

      {/* PERMANENT LOGO */}
      <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-yellow-500/30 bg-black/60 p-2 shadow-[0_0_35px_rgba(234,179,8,0.12)] backdrop-blur-sm sm:h-24 sm:w-24">
        <img
          src="/logo/ze-logo.png"
          alt="Zasham Enterprises"
          className="max-h-full max-w-full object-contain"
        />
      </div>
    </div>

    {/* Decorative center glow */}
    <div className="absolute left-1/2 top-[52%] h-[55%] w-[70%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-yellow-500/[0.06] blur-3xl" />

    {/* MOCKUP */}
   {/* MOCKUP */}
<div className="absolute inset-0 z-10 overflow-hidden">
  {mockupPreview ? (
    <img
      src={mockupPreview}
      alt="Uniform mockup"
      className="absolute left-1/2 top-[52%] w-[78%] -translate-x-1/2 -translate-y-1/2 object-contain drop-shadow-[0_25px_45px_rgba(0,0,0,0.65)]"
    />
  ) : (
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="text-center">
        <ImageIcon
          size={48}
          className="mx-auto mb-4 text-gray-600"
        />

        <p className="text-sm text-gray-500">
          Upload a mockup to preview
        </p>
      </div>
    </div>
  )}
</div>

    {/* Bottom identity bar */}
    <div className="absolute bottom-0 left-0 right-0 z-20 border-t border-yellow-500/20 bg-black/80 px-7 py-5 backdrop-blur-md sm:px-10 sm:py-7">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-[8px] uppercase tracking-[0.35em] text-gray-500 sm:text-[10px]">
            Designed & Manufactured by
          </p>

          <p className="mt-1 text-sm font-bold tracking-[0.15em] text-white sm:text-lg">
            ZASHAM ENTERPRISES
          </p>
        </div>

        <div className="hidden text-right sm:block">
          <p className="text-[9px] uppercase tracking-[0.3em] text-yellow-500">
            Premium Quality
          </p>

          <p className="mt-1 text-[9px] text-gray-500">
            Custom Sportswear
          </p>
        </div>
      </div>
    </div>

    {/* Corner accents */}
    <div className="absolute left-5 top-5 h-10 w-10 border-l border-t border-yellow-500/50" />
    <div className="absolute right-5 top-5 h-10 w-10 border-r border-t border-yellow-500/50" />
    <div className="absolute bottom-5 left-5 h-10 w-10 border-b border-l border-yellow-500/50" />
    <div className="absolute bottom-5 right-5 h-10 w-10 border-b border-r border-yellow-500/50" />
  </div>
</div>
    </div>

    


  );
}
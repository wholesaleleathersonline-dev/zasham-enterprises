"use client";

type StickerPreviewProps = {
  teamName: string;
  playerName: string;
  topSize: string;
  bottomSize: string;
};

export default function StickerPreview({
  teamName,
  playerName,
  topSize,
  bottomSize,
}: StickerPreviewProps) {
  return (
    <div className="space-y-3">
      {/* Preview Label */}
      <div className="text-xs font-medium uppercase tracking-[0.18em] text-yellow-500">
        Sticker Preview
      </div>

      {/* Exact 3.5 × 2.5 inch sticker */}
      <div
        className="
          flex h-[2.5in] w-[3.5in]
          flex-col items-center
          overflow-hidden
          rounded-[2mm]
          border-0
          bg-yellow-500
          px-[5mm]
          py-[3mm]
          text-center
        "
      >
        {/* Logo */}
        <div
          className="
            mb-[1.5mm]
            flex h-[12mm] w-[12mm]
            items-center justify-center
          "
        >
          <img
            src="/logo/logo2.png"
            alt="Zasham Enterprises"
            className="h-[12mm] w-auto object-contain"
          />
        </div>

        {/* Team */}
        <div className="mt-[1.5mm] text-[15px] font-semibold uppercase text-black">
          {teamName || "TEAM NAME"}
        </div>

        {/* Player */}
        <div className="mt-[1.5mm] max-w-full truncate text-[20px] font-black uppercase text-black">
          {playerName}
        </div>

        {/* Sizes */}
        <div className="mt-[3mm] flex gap-[2mm]">
          <div className="rounded-[1mm] border border-black px-[2.5mm] py-[1mm] text-[12px] font-semibold text-black">
            TOP: <span className="text-black">{topSize || "-"}</span>
          </div>

          <div className="rounded-[1mm] border border-black px-[2.5mm] py-[1mm] text-[12px] font-semibold text-black">
            BOTTOM:{" "}
            <span className="text-black">
              {bottomSize || "-"}
            </span>
          </div>
        </div>

        {/* Contact */}
        <div className="mt-auto text-[10px] font-medium leading-[1.6] text-black">
          <div className="mt-[0.5mm]">
            Instagram: @zashamenterprises&nbsp;|&nbsp;&nbsp;
            Facebook: Zasham Sportswear
          </div>

          <div className="mt-[0.5mm]">
            info@zashamenterprises.com
          </div>

          <div>
            www.zashamenterprises.com
          </div>
        </div>
      </div>

      {/* Preview Info */}
      <p className="text-xs text-white/35">
        Physical size: 3.5&quot; × 2.5&quot;
      </p>
    </div>
  );
}
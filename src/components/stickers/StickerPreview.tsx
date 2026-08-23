"use client";

type StickerPreviewProps = {
  teamName: string;
  playerName: string;
  topSize: string;
  bottomSize: string;
  joggerSize: string;
  jerseyStyle: string;
  material: string;
  hood: string;
};

export default function StickerPreview({
  teamName,
  playerName,
  topSize,
  bottomSize,
  joggerSize,
  jerseyStyle,
  material,
  hood,
}: StickerPreviewProps) {
  return (
    <div className="space-y-3">
      {/* Preview Label */}
      <div className="text-xs font-medium uppercase tracking-[0.18em] text-white">
        Sticker Preview
      </div>

      {/* Sticker */}
      <div
        className="
          flex
          h-[2.5in]
          w-[3.5in]
          flex-col
          items-center
          overflow-hidden
          rounded-none
          border-[3mm]
          border-black
          bg-white
          px-[5mm]
          py-[3mm]
          text-center
          text-black
        "
      >
        {/* LOGO */}
        <div
          className="
            mb-[1.5mm]
            flex
            h-[1mm]
            w-[1mm]
            shrink-0
            items-center
            justify-center
          "
        >
          <img
            src="/logo/logo2.png"
            alt="Zasham Enterprises"
           className="h-[9mm] w-auto object-contain"
          />
        </div>

        {/* TEAM NAME */}
      <div
  className="
    mt-[0.5mm]
    w-full
    text-center
    text-[14px]
    font-bold
    uppercase
    leading-tight
    text-black
  "
>
  {teamName || "TEAM NAME"}
</div>

        {/* PLAYER NAME */}
     <div
  className="
    mt-[0.5mm]
    w-full
    text-center
    text-[15px]
    font-extrabold
    uppercase
    leading-tight
    text-black
  "
>
  {playerName || "PLAYER NAME"}
</div>

        {/* SIZES */}
        <div
          className="
            mt-[3mm]
            flex
            items-center
            justify-center
            gap-[2mm]
          "
        >
          <div className="rounded-[1mm] border border-black px-[2.5mm] py-[1mm] text-[12px] font-semibold leading-[1.2] whitespace-nowrap">
            TOP:{" "}
            <span className="font-bold">
              {topSize?.trim() || "-"}
            </span>
          </div>

          <div className="rounded-[1mm] border border-black px-[2.5mm] py-[1mm] text-[12px] font-semibold leading-[1.2] whitespace-nowrap">
            BOTTOM:{" "}
            <span className="font-bold">
              {bottomSize?.trim() || "-"}
            </span>
          </div>

          <div className="rounded-[1mm] border border-black px-[2.5mm] py-[1mm] text-[12px] font-semibold leading-[1.2] whitespace-nowrap">
            JOGGER:{" "}
            <span className="font-bold">
              {joggerSize?.trim() || "-"}
            </span>
          </div>
        </div>

        {/* EXTRA ORDER DETAILS */}
       <div
  className="
    mt-[2.5mm]
    flex
    w-full
    flex-col
    items-center
    justify-center
    gap-[1mm]
    text-center
    text-[10px]
    font-semibold
    leading-[1.25]
  "
>
  <div>
    JERSEY STYLE:{" "}
    <span className="font-bold">
      {jerseyStyle?.trim() || "-"}
    </span>
  </div>

  <div>
    MATERIAL:{" "}
    <span className="font-bold">
      {material?.trim() || "-"}
    </span>
  </div>

  <div>
    HOOD:{" "}
    <span className="font-bold">
      {hood?.trim() || "-"}
    </span>
  </div>
</div>

        {/* CONTACT */}
        <div
          className="
            mt-auto
            w-full
            text-[10px]
            font-medium
            leading-[1.6]
          "
        >
          <div className="mt-[0.5mm]">
            Instagram: @zashamenterprises
            &nbsp;|&nbsp;&nbsp;
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

      <p className="text-xs text-white/35">
        Physical size: 3.5&quot; × 2.5&quot;
      </p>
    </div>
  );
}
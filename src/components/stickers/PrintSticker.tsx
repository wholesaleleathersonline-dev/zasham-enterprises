"use client";

type PrintStickerProps = {
  teamName: string;
  playerNumber: string;
  playerName: string;
  topSize: string;
  bottomSize: string;
  joggerSize: string;
  jerseyStyle: string;
  material: string;
  hood: string;
};

export default function PrintSticker({
  teamName,
  playerNumber,
  playerName,
  topSize,
  bottomSize,
  joggerSize,
  jerseyStyle,
  material,
  hood,
}: PrintStickerProps) {
  const nameLength = playerName?.trim().length || 0;

  const playerNameSize =
    nameLength > 27
      ? "text-[12px]"
      : nameLength > 24
        ? "text-[13px]"
        : nameLength > 20
          ? "text-[14px]"
          : nameLength > 17
            ? "text-[15px]"
            : nameLength > 14
              ? "text-[16px]"
              : "text-[18px]";

  return (
  <div
  className="
    flex
    h-[88.9mm]
    w-[88.9mm]
    flex-col
    items-center
    overflow-hidden
    border-[1mm]
    border-black
    bg-white
    px-[5mm]
    pt-[3mm]
    pb-[3mm]
    text-center
    text-black
  "
>
      {/* ==============================
          LOGO
      ============================== */}

      <div
        className="
          mb-[1.5mm]
          flex
          h-[12mm]
          w-[12mm]
          shrink-0
          items-center
          justify-center
        "
      >
        <img
          src="/logo/logo2.png"
          alt="Zasham Enterprises"
          className="
            h-[12mm]
            w-auto
            object-contain
          "
        />
      </div>

      {/* ==============================
          TEAM NAME
      ============================== */}

      <div
        className="
          mt-[1.5mm]
          w-full
          overflow-hidden
          text-[15px]
          font-semibold
          uppercase
          leading-[1.1]
          text-black
          whitespace-nowrap
          text-ellipsis
        "
      >
        {teamName?.trim() || "TEAM NAME"}
      </div>

      {/* ==============================
          PLAYER NUMBER
      ============================== */}

      <div
        className="
          mt-[1mm]
          text-[13px]
          font-bold
          leading-none
          text-black
        "
      >
        #{playerNumber?.trim() || "-"}
      </div>

      {/* ==============================
          PLAYER NAME
      ============================== */}

      <div
        className={`
          mt-[1.5mm]
          w-full
          overflow-hidden
          ${playerNameSize}
          font-extrabold
          uppercase
          leading-[1.1]
          text-black
          whitespace-nowrap
          text-ellipsis
        `}
      >
        {playerName?.trim() || "PLAYER NAME"}
      </div>

      {/* ==============================
          SIZES
      ============================== */}

      <div
        className="
          mt-[2.5mm]
          flex
          w-full
          items-center
          justify-center
          gap-[2mm]
        "
      >
        {/* TOP */}

        <div
          className="
            rounded-[1mm]
            border
            border-black
            px-[2.5mm]
            py-[1mm]
            text-[11px]
            font-semibold
            leading-[1.2]
            whitespace-nowrap
          "
        >
          TOP:{" "}
          <span className="font-bold">
            {topSize?.trim() || "-"}
          </span>
        </div>

        {/* BOTTOM */}

        <div
          className="
            rounded-[1mm]
            border
            border-black
            px-[2.5mm]
            py-[1mm]
            text-[11px]
            font-semibold
            leading-[1.2]
            whitespace-nowrap
          "
        >
          BOTTOM:{" "}
          <span className="font-bold">
            {bottomSize?.trim() || "-"}
          </span>
        </div>

        {/* JOGGER */}

        <div
          className="
            rounded-[1mm]
            border
            border-black
            px-[2.5mm]
            py-[1mm]
            text-[11px]
            font-semibold
            leading-[1.2]
            whitespace-nowrap
          "
        >
          JOGGER:{" "}
          <span className="font-bold">
            {joggerSize?.trim() || "-"}
          </span>
        </div>
      </div>

      {/* ==============================
          EXTRA ORDER DETAILS
      ============================== */}

      <div
        className="
          mt-[1.5mm]
          flex
          w-full
          flex-col
          items-center
          justify-center
          gap-[0.4mm]
          text-center
          text-[10px]
          font-semibold
          leading-[1.15]
          text-black
        "
      >
        {/* JERSEY STYLE */}

        <div className="whitespace-nowrap">
          JERSEY STYLE:{" "}
          <span className="font-bold">
            {jerseyStyle?.trim() || "-"}
          </span>
        </div>

        {/* MATERIAL */}

        <div className="whitespace-nowrap">
          MATERIAL:{" "}
          <span className="font-bold">
            {material?.trim() || "-"}
          </span>
        </div>

        {/* HOOD */}

        <div className="whitespace-nowrap">
          HOOD:{" "}
          <span className="font-bold">
            {hood?.trim() || "-"}
          </span>
        </div>
      </div>

      {/* ==============================
          CONTACT INFORMATION
      ============================== */}

   <div
  className="
    mt-auto
    w-full
    pb-[0.5mm]
    text-[10px]
    font-medium
    leading-[1.3]
    text-black
  "
>
  <div>
    Instagram: @zashamenterprises
    &nbsp;|&nbsp;
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
  );
}
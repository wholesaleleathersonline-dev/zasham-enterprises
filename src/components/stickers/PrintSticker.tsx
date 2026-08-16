type PrintStickerProps = {
  teamName: string;
  playerName: string;
  topSize: string;
  bottomSize: string;
};

export default function PrintSticker({
  teamName,
  playerName,
  topSize,
  bottomSize,
}: PrintStickerProps) {
  return (
   <div
  className="
    flex h-[63.5mm] w-[88.9mm]
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
          rounded-full
         
          text-[5px]
          font-bold
          text-yellow-500
        "
      >
        <img
  src="/logo/logo2.png"
  alt="Zasham Enterprises"
  className="mb-[1.5mm] h-[12mm] w-auto object-contain"
/>
      </div>



   {/* Team */}
<div className="mt-[1.5mm] text-[15px] font-semibold uppercase text-black">
  {teamName || "TEAM NAME"}
</div>

     {/* Player */}
<div className="mt-[1.5mm] text-[20px] font-black uppercase text-black">
  {playerName}
</div>

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

<div className="mt-auto text-[10px] leading-[1.6] font-medium text-black">
  
   <div className="mt-[0.5mm]">
    Instagram: @zashamenterprises&nbsp;|&nbsp;&nbsp; 
    Facebook: Zasham Sportswear
  </div>
  <div  className="mt-[0.5mm]">info@zashamenterprises.com</div>
  <div>www.zashamenterprises.com</div>
</div>
    </div>
  );
}
type PrintStickerPDFProps = {
  teamName: string;
  playerName: string;
  topSize: string;
  bottomSize: string;
};

export default function PrintStickerPDF({
  teamName,
  playerName,
  topSize,
  bottomSize,
}: PrintStickerPDFProps) {
  return (
    <div
      style={{
        width: "88.9mm",
        height: "63.5mm",
        background: "#E5A812",
        color: "#000",
        boxSizing: "border-box",
        padding: "3mm 5mm",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
        overflow: "hidden",
        borderRadius: "2mm",
      }}
    >
      {/* Logo */}
      <div
        style={{
          width: "12mm",
          height: "12mm",
          marginBottom: "1.5mm",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <img
          src="/logo/logo2.png"
          alt="Zasham Enterprises"
          style={{
            width: "12mm",
            height: "12mm",
            objectFit: "contain",
            display: "block",
          }}
        />
      </div>

      {/* Team */}
      <div
        style={{
          marginTop: "1.5mm",
          fontSize: "15px",
          lineHeight: 1.1,
          fontWeight: 600,
          textTransform: "uppercase",
        }}
      >
        {teamName || "TEAM NAME"}
      </div>

      {/* Player */}
      <div
        style={{
          marginTop: "1.5mm",
          fontSize: "20px",
          lineHeight: 1.1,
          fontWeight: 900,
          textTransform: "uppercase",
          maxWidth: "100%",
          overflow: "hidden",
          whiteSpace: "nowrap",
          textOverflow: "ellipsis",
        }}
      >
        {playerName}
      </div>

      {/* Sizes */}
      <div
        style={{
          marginTop: "3mm",
          display: "flex",
          gap: "2mm",
        }}
      >
        <div
          style={{
            border: "1px solid #000",
            borderRadius: "1mm",
            padding: "1mm 2.5mm",
            fontSize: "12px",
            fontWeight: 600,
            whiteSpace: "nowrap",
          }}
        >
          TOP: {topSize || "-"}
        </div>

        <div
          style={{
            border: "1px solid #000",
            borderRadius: "1mm",
            padding: "1mm 2.5mm",
            fontSize: "12px",
            fontWeight: 600,
            whiteSpace: "nowrap",
          }}
        >
          BOTTOM: {bottomSize || "-"}
        </div>
      </div>

      {/* Contact */}
      <div
        style={{
          marginTop: "auto",
          fontSize: "10px",
          lineHeight: 1.6,
          fontWeight: 500,
          width: "100%",
        }}
      >
        <div>
          Instagram: @zashamenterprises&nbsp;|&nbsp;&nbsp;
          Facebook: Zasham Sportswear
        </div>

        <div style={{ marginTop: "0.5mm" }}>
          info@zashamenterprises.com
        </div>

        <div>
          www.zashamenterprises.com
        </div>
      </div>
    </div>
  );
}
"use client";

type PrintStickerPDFProps = {
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

export default function PrintStickerPDF({
  teamName,
  playerNumber,
  playerName,
  topSize,
  bottomSize,
  joggerSize,
  jerseyStyle,
  material,
  hood,
}: PrintStickerPDFProps) {
  const name = playerName?.trim() || "PLAYER NAME";

  const nameFontSize =
    name.length > 28
      ? "12px"
      : name.length > 24
        ? "13px"
        : name.length > 20
          ? "14px"
          : name.length > 16
            ? "15px"
            : "17px";

  const detailText: React.CSSProperties = {
    fontFamily: "Arial, Helvetica, sans-serif",
    fontSize: "10px",
    lineHeight: 1.15,
    fontWeight: 400,
    fontStyle: "italic",
    color: "#000000",
  };

  return (
    <div
      style={{
        position: "relative",
        width: "82mm",
        height: "58mm",
        boxSizing: "border-box",
        overflow: "hidden",

        backgroundColor: "#ffffff",
        color: "#000000",

        border: "2.5px solid #000000",

        padding: "2mm 2.5mm",

        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",

        fontFamily:
          'Georgia, "Times New Roman", serif',
      }}
    >
      {/* WATERMARK */}
      <div
        style={{
          position: "absolute",
          left: 0,
          top: 0,
          width: "100%",
          height: "100%",

          display: "flex",
          alignItems: "center",
          justifyContent: "center",

          pointerEvents: "none",
          zIndex: 0,
        }}
      >
        <img
          src="/logo/logo2.png"
          alt=""
          style={{
            display: "block",

            width: "40mm",
            height: "40mm",

            objectFit: "contain",
            objectPosition: "center",

            opacity: 0.075,

            maxWidth: "40mm",
            maxHeight: "40mm",
          }}
        />
      </div>

      {/* CONTENT */}
      <div
        style={{
          position: "relative",
          zIndex: 1,

          width: "100%",
          height: "100%",

          display: "flex",
          flexDirection: "column",
          alignItems: "center",

          textAlign: "center",
        }}
      >
        {/* TEAM NAME */}
        <div
          style={{
            width: "100%",

            fontSize: "13px",
            lineHeight: 1,

            fontWeight: 400,
            fontStyle: "italic",

            letterSpacing: "0.3px",

            textTransform: "uppercase",

            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {teamName?.trim() || "TEAM NAME"}
        </div>

        {/* PLAYER NUMBER */}
        <div
          style={{
            marginTop: "1mm",

            fontSize: "17px",
            lineHeight: 1,

            fontWeight: 400,
            fontStyle: "italic",

            letterSpacing: "0.5px",
          }}
        >
          #{playerNumber?.trim() || "-"}
        </div>

        {/* PLAYER NAME */}
        <div
          style={{
            width: "100%",

            marginTop: "1mm",

            fontSize: nameFontSize,
            lineHeight: 1.05,

            fontWeight: 400,
            fontStyle: "italic",

            letterSpacing: "0.4px",

            textTransform: "uppercase",

            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",

            padding: "0 1mm",
          }}
        >
          {name}
        </div>

        {/* SIZES */}
        <div
          style={{
            width: "100%",

            marginTop: "2mm",

            display: "flex",
            alignItems: "center",
            justifyContent: "center",

            gap: "1mm",
          }}
        >
          {[
            ["TOP", topSize],
            ["BOTTOM", bottomSize],
            ["JOGGER", joggerSize],
          ].map(([label, value]) => (
            <div
              key={label}
              style={{
                border: "1.2px solid #000000",
                borderRadius: "0.7mm",

                padding: "0.9mm 1.7mm",

                fontFamily:
                  'Arial, Helvetica, sans-serif',

                fontSize: "9.5px",
                lineHeight: 1,

                fontWeight: 400,
                fontStyle: "italic",

                color: "#000000",

                whiteSpace: "nowrap",
              }}
            >
              {label}:{" "}
              <span style={{ fontWeight: 500 }}>
                {value?.trim() || "-"}
              </span>
            </div>
          ))}
        </div>

        {/* EXTRA DETAILS */}
        <div
          style={{
            width: "100%",

            marginTop: "1.8mm",

            display: "flex",
            flexDirection: "column",
            alignItems: "center",

            gap: "0.7mm",

            ...detailText,
          }}
        >
          <div>
            JERSEY STYLE:{" "}
            <span style={{ fontWeight: 500 }}>
              {jerseyStyle?.trim() || "-"}
            </span>
          </div>

          <div>
            MATERIAL:{" "}
            <span style={{ fontWeight: 500 }}>
              {material?.trim() || "-"}
            </span>
          </div>

          <div>
            HOOD:{" "}
            <span style={{ fontWeight: 500 }}>
              {hood?.trim() || "-"}
            </span>
          </div>
        </div>

        {/* CONTACT */}
        <div
          style={{
            width: "100%",

            marginTop: "auto",

            paddingTop: "1mm",

            fontFamily:
              "Arial, Helvetica, sans-serif",

            fontSize: "7.5px",
            lineHeight: 1.15,

            fontWeight: 400,
            fontStyle: "italic",

            color: "#000000",

            textAlign: "center",

            flexShrink: 0,
          }}
        >
          <div>
            Instagram: @zashamenterprises
            {" | "}
            Facebook: Zasham Sportswear
          </div>

          <div style={{ marginTop: "0.4mm" }}>
            info@zashamenterprises.com
          </div>

          <div style={{ marginTop: "0.4mm" }}>
            www.zashamenterprises.com
          </div>
        </div>
      </div>
    </div>
  );
}
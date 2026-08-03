"use client";

import { toJpeg } from "html-to-image";

interface Props {
  fileName: string;
}

export default function DownloadJpgButton({
  fileName,
}: Props): React.JSX.Element {
  async function handleDownload() {
    const element = document.getElementById("size-chart-a4");

    if (!element) return;

    try {
     const dataUrl = await toJpeg(element, {
  quality: 1,
  pixelRatio: 3,
  cacheBust: true,
  backgroundColor: "#0B0B0B",

  width: element.scrollWidth,
  height: element.scrollHeight,

  canvasWidth: element.scrollWidth,
  canvasHeight: element.scrollHeight,

  style: {
    transform: "none",
    margin: "0",
  },
});

      const link = document.createElement("a");
      link.download = `${fileName}.jpg`;
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <button
      type="button"
      onClick={handleDownload}
      className="rounded-xl bg-yellow-500 px-5 py-3 font-semibold text-black hover:bg-yellow-400"
    >
      Download JPG
    </button>
  );
}
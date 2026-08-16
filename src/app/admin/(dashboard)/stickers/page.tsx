import StickerUploader from "../../../../components/stickers/StickerUploader";

export default function StickersPage() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <p className="text-xs font-medium uppercase tracking-[0.2em] text-yellow-500">
          Zasham Enterprises
        </p>

        <h1 className="mt-2 text-3xl font-semibold text-white">
          Sticker Generator
        </h1>

        <p className="mt-2 max-w-2xl text-sm text-white/45">
          Upload an order sheet PDF and automatically generate individual
          player stickers.
        </p>
      </div>

      {/* Generator Card */}
     <div className="w-full rounded-2xl border border-white/10 bg-white/[0.02] p-6 shadow-2xl">
  <StickerUploader />
</div>
    </div>
  );
}
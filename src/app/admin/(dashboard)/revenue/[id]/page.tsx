import RevenuePrint from "../../../../../components/admin/revenue/RevenuePrint";
import { getRevenueById } from "../../../../../services/revenue.service";

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function RevenueViewPage({
  params,
}: PageProps): Promise<React.JSX.Element> {
  const { id } = await params;

  const revenue = await getRevenueById(id);

  if (!revenue) {
    return (
      <div className="flex min-h-screen items-center justify-center text-2xl text-red-500">
        Revenue Not Found
      </div>
    );
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-zinc-950 via-black to-zinc-900 py-10">
      {/* Gold Glow Left */}
      <div className="absolute -left-40 top-10 h-[500px] w-[500px] rounded-full bg-yellow-500/10 blur-[120px]" />

      {/* Gold Glow Right */}
      <div className="absolute -right-40 bottom-0 h-[500px] w-[500px] rounded-full bg-yellow-400/10 blur-[120px]" />

      {/* Center Glow */}
      <div className="absolute left-1/2 top-0 h-80 w-[900px] -translate-x-1/2 rounded-full bg-yellow-500/5 blur-[120px]" />

      {/* Grid */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,.18) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,.18) 1px, transparent 1px)
          `,
          backgroundSize: "55px 55px",
        }}
      />

      {/* ZE Watermark */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <h1
          className="select-none font-black tracking-[40px] text-white/5"
          style={{
            fontSize: "18rem",
            lineHeight: 1,
          }}
        >
          ZE
        </h1>
      </div>

      {/* Hex Pattern */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 25px 25px, rgba(255,215,0,.6) 2px, transparent 2px)",
          backgroundSize: "80px 80px",
        }}
      />

      {/* Gold Lines */}
      <div className="absolute left-0 top-40 h-px w-full bg-gradient-to-r from-transparent via-yellow-500/20 to-transparent" />
      <div className="absolute bottom-40 left-0 h-px w-full bg-gradient-to-r from-transparent via-yellow-500/20 to-transparent" />

      {/* Report */}
      <div className="relative z-10 flex justify-center px-6">
        <RevenuePrint revenue={revenue} />
      </div>
    </div>
  );
}
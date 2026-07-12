export default function DashboardPage(): React.JSX.Element {
  return (
    <div className="rounded-xl border border-yellow-500/20 bg-[#1A1A1A] p-8">
      <h1 className="text-3xl font-bold text-white">
        Dashboard
      </h1>

      <p className="mt-3 text-gray-400">
        Welcome to the Zasham Enterprises Admin Dashboard.
      </p>

      <div className="mt-8 rounded-lg border border-dashed border-yellow-500/20 bg-[#111111] p-12 text-center">
        <h2 className="text-xl font-semibold text-yellow-500">
          🚀 Dashboard Coming Soon
        </h2>

        <p className="mt-3 text-gray-400">
          Analytics, Products, Categories and Media Management will appear here.
        </p>
      </div>
    </div>
  );
}
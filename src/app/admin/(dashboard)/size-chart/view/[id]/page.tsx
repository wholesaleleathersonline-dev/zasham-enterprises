import Link from "next/link";
import { ArrowLeft, Printer, Download } from "lucide-react";
import Image from "next/image";
import { getCompleteSizeChart } from "../../../../../../services/admin/sizeChart.service";
import DownloadJpgButton from "../../../../../../components/admin/size-chart/DownloadJpgButton";
interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function ViewSizeChartPage({
  params,
}: PageProps): Promise<React.JSX.Element> {

  const { id } = await params;

  const {
      chart,
  jerseySizes,
  shortsSizes,
  compressionSizes,
  } = await getCompleteSizeChart(Number(id));

  return (
 
  <div className="min-h-screen bg-[#0B0B0B]">

     <div className="mb-6 flex justify-end">
      <DownloadJpgButton fileName={chart.name} />
    </div>

    {/* YAHI DOWNLOAD HOGA */}
    <div
      id="size-chart-a4"
      className="mx-auto w-[794px] bg-[#0B0B0B]"
    >

    <div className="w-full px-8 py-8">

 {/* Premium Header */}

<div className="relative overflow-hidden rounded-[32px] border border-yellow-500/20 bg-gradient-to-br from-[#171717] via-[#101010] to-black">

  {/* Background Watermark */}

  <div className="pointer-events-none absolute inset-0 flex items-center justify-center">

    <h1 className="select-none text-[170px] font-black tracking-[0.45em] text-white/[0.03] sm:text-[300px]">
      ZASHAM
    </h1>

  </div>

  <div className="relative px-6 py-2">

    <div className="flex flex-col items-center text-center">

      {/* Company Logo */}

      <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-full border border-yellow-500/30 bg-yellow-500/10 shadow-[0_0_25px_rgba(234,179,8,0.15)]">

        {/* Replace with your logo */}

       <Image
  src="/logo/ze-logo.png"
  alt="Zasham Enterprises"
  width={70}
  height={70}
  priority
  className="object-contain p-2"
/>

      </div>

      <h1 className="text-3xl font-black tracking-[0.15em] text-yellow-500">
        ZASHAM
      </h1>

      <p className="mt-1 text-base uppercase tracking-[0.25em] text-gray-400">
        Enterprises
      </p>

      <p className="mt-2 text-[10px] uppercase tracking-[0.3em] text-gray-500">
        PREMIUM CUSTOM SPORTSWEAR MANUFACTURER
      </p>

      <div className="mt-4 h-px w-28 bg-gradient-to-r from-transparent via-yellow-500 to-transparent"></div>

      <p className="mt-4 text-base italic text-yellow-400">
        Precision Engineered • Performance Driven
      </p>

      <h2 className="mt-6 text-2xl font-bold text-white">
        OFFICIAL SIZE GUIDE
      </h2>

      <p className="mt-4 max-w-3xl text-sm leading-6 text-gray-300">

        This official size guide has been developed to help athletes,
        teams and organizations select the correct garment size.
        Compare these measurements with an existing jersey or shorts
        for the most accurate fit.

      </p>

    </div>

    {/* Information */}

    <div className="mx-auto mt-6 grid max-w-sm grid-cols-2 gap-3">

  

      <div className="rounded-xl border border-yellow-500/20 bg-[#171717]/80 px-3 py-2.5">

        <p className="text-xs uppercase tracking-[0.3em] text-gray-500">
          Size Chart
        </p>

       <h3 className="mt-2 text-sm font-semibold leading-5 text-white whitespace-nowrap">
  {chart.name}
</h3>

      </div>

      <div className="rounded-xl border border-yellow-500/20 bg-[#171717]/80 px-3 py-2.5">

        <p className="text-xs uppercase tracking-[0.3em] text-gray-500">
          Unit
        </p>

        <h3 className="mt-2 text-lg font-semibold text-yellow-500">
          Inches
        </h3>

      </div>

    </div>

    {/* Bottom Cards */}

    <div className="mt-8 grid gap-6 lg:grid-cols-2">

   

    </div>

  </div>

</div>

      {/* Size Tables */}

      <div className="mt-8 space-y-8">

  {/* Jersey Measurements */}

  <div className="overflow-hidden rounded-3xl border border-yellow-500/20 bg-[#151515]">

    <div className="border-b border-yellow-500/20 bg-gradient-to-r from-[#1B1B1B] to-[#111111] px-6 py-5">

      <h2 className="text-2xl font-bold text-yellow-500">
        🏈 Jersey Measurements
      </h2>

      <p className="mt-1 text-sm text-gray-400">
        Finished garment measurements (Inches)
      </p>

    </div>

    <div className="overflow-x-auto">

      <table className="min-w-full">

        <thead className="bg-[#111111]">

          <tr>

            <th className="px-6 py-4 text-left text-sm font-semibold uppercase tracking-wider text-yellow-500">
              Size
            </th>

            <th className="px-6 py-4 text-center text-sm font-semibold uppercase tracking-wider text-yellow-500">
              Chest
            </th>

            <th className="px-6 py-4 text-center text-sm font-semibold uppercase tracking-wider text-yellow-500">
              Length
            </th>

          </tr>

        </thead>

        <tbody>

          {jerseySizes.map((item) => (

            <tr
              key={item.id}
              className="odd:bg-[#151515] even:bg-[#111111] transition hover:bg-yellow-500/5"
            >

              <td className="px-6 py-4 font-semibold text-white">
                {item.size}
              </td>

              <td className="px-6 py-4 text-center text-gray-300">
                {item.chest} in
              </td>

              <td className="px-6 py-4 text-center text-gray-300">
                {item.length} in
              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>

  </div>

  {/* Luxury Divider */}

  <div className="flex justify-center">

    <div className="h-px w-48 bg-gradient-to-r from-transparent via-yellow-500/60 to-transparent"></div>

  </div>

  {/* Shorts Measurements */}

  <div className="overflow-hidden rounded-3xl border border-yellow-500/20 bg-[#151515]">

    <div className="border-b border-yellow-500/20 bg-gradient-to-r from-[#1B1B1B] to-[#111111] px-6 py-5">

      <h2 className="text-2xl font-bold text-yellow-500">
        🩳 Shorts Measurements
      </h2>

      <p className="mt-1 text-sm text-gray-400">
        Finished garment measurements (Inches)
      </p>

    </div>

    <div className="overflow-x-auto">

      <table className="min-w-full">

        <thead className="bg-[#111111]">

          <tr>

            <th className="px-6 py-4 text-left text-sm font-semibold uppercase tracking-wider text-yellow-500">
              Size
            </th>

            <th className="px-6 py-4 text-center text-sm font-semibold uppercase tracking-wider text-yellow-500">
              Waist
            </th>

            <th className="px-6 py-4 text-center text-sm font-semibold uppercase tracking-wider text-yellow-500">
              Length
            </th>

          </tr>

        </thead>

        <tbody>

          {shortsSizes.map((item) => (

            <tr
              key={item.id}
              className="odd:bg-[#151515] even:bg-[#111111] transition hover:bg-yellow-500/5"
            >

              <td className="px-6 py-4 font-semibold text-white">
                {item.size}
              </td>

              <td className="px-6 py-4 text-center text-gray-300">
                {item.waist} in
              </td>

              <td className="px-6 py-4 text-center text-gray-300">
                {item.length} in
              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>

  </div>





  {/* Compressions Measurements */}

  <div className="overflow-hidden rounded-3xl border border-yellow-500/20 bg-[#151515]">

    <div className="border-b border-yellow-500/20 bg-gradient-to-r from-[#1B1B1B] to-[#111111] px-6 py-5">

      <h2 className="text-2xl font-bold text-yellow-500">
       🩲 Compression Shorts Measurements
      </h2>

      <p className="mt-1 text-sm text-gray-400">
       Compression garment measurements (inches)
      </p>

    </div>

    <div className="overflow-x-auto">

      <table className="min-w-full">

        <thead className="bg-[#111111]">

          <tr>

            <th className="px-6 py-4 text-left text-sm font-semibold uppercase tracking-wider text-yellow-500">
              Size
            </th>

            <th className="px-6 py-4 text-center text-sm font-semibold uppercase tracking-wider text-yellow-500">
              Waist
            </th>

            <th className="px-6 py-4 text-center text-sm font-semibold uppercase tracking-wider text-yellow-500">
              Length
            </th>

          </tr>

        </thead>

        <tbody>

          {compressionSizes.map((item) => (

            <tr
              key={item.id}
              className="odd:bg-[#151515] even:bg-[#111111] transition hover:bg-yellow-500/5"
            >

              <td className="px-6 py-4 font-semibold text-white">
                {item.size}
              </td>

              <td className="px-6 py-4 text-center text-gray-300">
                {item.waist} in
              </td>

              <td className="px-6 py-4 text-center text-gray-300">
                {item.length} in
              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>

  </div>


  {/* Footer */}

  <div className="rounded-3xl border border-yellow-500/20 bg-gradient-to-r from-[#151515] to-[#101010] px-6 py-1 text-center">

    <h2 className="text-3xl font-bold tracking-[0.18em] text-yellow-500">
      ZASHAM
    </h2>

    <p className="mt-2 uppercase tracking-[0.35em] text-gray-400">
      Enterprises
    </p>

    <div className="mx-auto my-6 h-px w-32 bg-yellow-500/30"></div>

    <p className="mx-auto max-w-3xl text-sm leading-7 text-gray-300">

      Premium Custom Sportswear Manufacturer specializing
      in Team Uniforms, Performance Apparel and Fully
      Customized Sportswear for teams around the world.

    </p>

    <div className="mt-8 grid grid-cols-3 gap-3">

      <div className="rounded-xl border border-yellow-500/10 bg-[#111111] p-3">

        <p className="text-[10px] uppercase tracking-[0.18em] text-gray-500">
          Website
        </p>

        <p className="mt-1 text-xs font-medium text-white">
          www.zashamenterprises.com
        </p>

      </div>

      <div className="rounded-xl border border-yellow-500/10 bg-[#111111] p-3">

        <p className="text-[10px] uppercase tracking-[0.18em] text-gray-500">
          Email
        </p>

        <p className="mt-1 break-all text-xs font-medium text-white">
          info@zashamenterprises.com
        </p>

      </div>

      <div className="rounded-xl border border-yellow-500/10 bg-[#111111] p-3">

        <p className="text-[10px] uppercase tracking-[0.18em] text-gray-500">
          Manufacturing
        </p>

        <p className="mt-1 text-xs font-medium text-white">
          Sialkot, Pakistan
        </p>

      </div>

    </div>

    <div className="mt-10 border-t border-yellow-500/20 pt-6">

      <p className="text-xs tracking-wide text-gray-500">
        © 2026 ZASHAM ENTERPRISES. All Rights Reserved.
      </p>

    </div>

  </div>

</div>

</div>
</div>
</div>

);
}

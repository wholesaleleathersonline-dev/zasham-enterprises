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

<>

    <div className="mb-6 flex items-center justify-end gap-3">
<Link
  href="/admin/size-charts"
  className="rounded-xl border border-yellow-500/20 bg-[#171717] px-5 py-3 font-semibold text-white hover:border-yellow-500"
>
  Back
</Link>
    

      <DownloadJpgButton
        fileName={`${chart.name}-size-guide`}
      />

    </div>
 
<div className="p-8">

<div id="size-chart-a4" className="relative overflow-hidden rounded-[32px] border border-yellow-500/20 bg-gradient-to-br from-[#171717] via-[#101010] to-black ">

  <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(234,179,8,0.08),transparent_45%)]" />

  <div className="relative px-8 py-7">

    <div className="flex items-start gap-8">

      {/* Logo */}

      <div className="flex h-24 w-24 shrink-0 items-center justify-center rounded-2xl border border-yellow-500/25 bg-yellow-500/10 shadow-[0_0_35px_rgba(234,179,8,0.18)]">

        <Image
          src="/logo/ze-logo.png"
          alt="Zasham Enterprises"
          width={74}
          height={74}
          priority
          className="object-contain p-2"
        />

      </div>

      {/* Right Side */}

     <div className="flex-1 text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.45em] text-gray-400">
          PREMIUM CUSTOM SPORTSWEAR MANUFACTURER
        </p>

        <div className="mx-auto mt-4 h-px w-56 bg-gradient-to-r from-transparent via-yellow-500 to-transparent"></div>

        <p className="mt-4 text-sm uppercase tracking-[0.22em] text-yellow-400">
          PRECISION ENGINEERED • PERFORMANCE DRIVEN
        </p>

        <div className="mt-10 text-center">

        <h1 className="mt-8 text-4xl font-black tracking-[0.15em] text-white">
  OFFICIAL SIZE GUIDE
</h1>

<h2 className="mt-3 text-3xl font-bold uppercase tracking-[0.12em] text-yellow-500">
  {chart.name}
</h2>

          <div className="mx-auto mt-5 h-px w-36 bg-gradient-to-r from-transparent via-yellow-500 to-transparent"></div>

        

          <p className="mx-auto mt-5 max-w-3xl text-sm leading-7 text-gray-300">
            This official size guide has been developed to help athletes,
            teams and organizations select the correct garment size.
            Compare these measurements with an existing garment for
            the most accurate fit.
          </p>

        </div>

        <div className="mx-auto mt-8 grid max-w-4xl grid-cols-3 gap-8 border-y border-yellow-500/20 py-5">

  <div className="text-center">
    <p className="text-[11px] uppercase tracking-[0.35em] text-gray-500">
      Website
    </p>

    <p className="mt-2 text-sm font-semibold text-yellow-500">
      www.zashamenterprises.com
    </p>
  </div>

  <div className="text-center">
    <p className="text-[11px] uppercase tracking-[0.35em] text-gray-500">
      Email
    </p>

    <p className="mt-2 text-sm font-semibold text-white">
      info@zashamenterprises.com
    </p>
  </div>

  <div className="text-center">
    <p className="text-[11px] uppercase tracking-[0.35em] text-gray-500">
      Manufacturing
    </p>

    <p className="mt-2 text-sm font-semibold text-white">
      Sialkot, Pakistan
    </p>
  </div>

</div>

        </div>

       

      </div>

    </div>

 

  
<div className="mt-10">

  <div className="flex items-center">

    <div className="h-px flex-1 bg-gradient-to-r from-transparent via-yellow-500/40 to-yellow-500/10" />

    <span className="mx-6 text-xs font-semibold uppercase tracking-[0.45em] text-yellow-500">
      Measurements
    </span>

    <div className="h-px flex-1 bg-gradient-to-l from-transparent via-yellow-500/40 to-yellow-500/10" />

  </div>

</div>


<div className="mx-8 mt-12 grid grid-cols-2 items-start gap-8">


<div className="overflow-hidden rounded-[26px] border border-yellow-500/20 bg-[#151515]/90 backdrop-blur-xl shadow-[0_0_30px_rgba(234,179,8,0.05)]">

  <div className="flex items-center justify-between border-b border-yellow-500/20 bg-gradient-to-r from-[#1B1B1B] via-[#171717] to-[#111111] px-10 py-5">

    <div>

      <h2 className="text-2xl font-bold text-yellow-500">
        🏈 Jersey Measurements
      </h2>

      <p className="mt-1 text-sm text-gray-400">
        Finished Garment Measurements
      </p>

    </div>

    <span className="rounded-full border border-yellow-500/20 bg-yellow-500/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.25em] text-yellow-400">
      Inches
    </span>

  </div>

  <div className="overflow-x-auto">

   <table className="min-w-full">

    <thead className="bg-[#101010]">

  <tr>

    <th className="px-6 py-4 text-left text-sm font-bold uppercase tracking-[0.25em] text-yellow-500">
      Size
    </th>

    <th className="px-6 py-4 text-center text-sm font-bold uppercase tracking-[0.25em] text-yellow-500">
      Chest
    </th>

    <th className="px-6 py-4 text-center text-sm font-bold uppercase tracking-[0.25em] text-yellow-500">
      Length
    </th>

  </tr>

</thead>
<tbody>

  {jerseySizes.map((item) => (

    <tr
      key={item.id}
      className="border-b border-yellow-500/10 odd:bg-[#171717] even:bg-[#111111] transition hover:bg-yellow-500/5"
    >

      <td className="px-6 py-4 font-semibold text-white">
        {item.size}
      </td>

      <td className="px-6 py-4 text-center text-gray-300">
        {item.chest}"
      </td>

      <td className="px-6 py-4 text-center text-gray-300">
        {item.length}"
      </td>

    </tr>

  ))}

</tbody>

 
   
    </table>
    </div>
    </div> 


   <div className="overflow-hidden rounded-[26px] border border-yellow-500/20 bg-[#151515]/90 backdrop-blur-xl shadow-[0_0_30px_rgba(234,179,8,0.05)]">

  <div className="flex items-center justify-between border-b border-yellow-500/20 bg-gradient-to-r from-[#1B1B1B] via-[#171717] to-[#111111] px-7 py-5">

    <div>

      <h2 className="text-2xl font-bold text-yellow-500">
        🩳 Shorts Measurements
      </h2>

      <p className="mt-1 text-sm text-gray-400">
        Finished Garment Measurements
      </p>

    </div>

    <span className="rounded-full border border-yellow-500/20 bg-yellow-500/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.25em] text-yellow-400">
      Inches
    </span>

  </div>

  <div className="overflow-x-auto">

    <table className="min-w-full">



<thead className="bg-[#101010]">

  <tr>

    <th className="px-6 py-4 text-left text-sm font-bold uppercase tracking-[0.25em] text-yellow-500">
      Size
    </th>

    <th className="px-6 py-4 text-center text-sm font-bold uppercase tracking-[0.25em] text-yellow-500">
      Waist
    </th>

    <th className="px-6 py-4 text-center text-sm font-bold uppercase tracking-[0.25em] text-yellow-500">
      Length
    </th>

  </tr>

</thead>
<tbody>

  {shortsSizes.map((item) => (

    <tr
      key={item.id}
      className="border-b border-yellow-500/10 odd:bg-[#171717] even:bg-[#111111] transition hover:bg-yellow-500/5"
    >

      <td className="px-6 py-4 font-semibold text-white">
        {item.size}
      </td>

      <td className="px-6 py-4 text-center text-gray-300">
        {item.waist}"
      </td>

      <td className="px-6 py-4 text-center text-gray-300">
        {item.length}"
      </td>

    </tr>

  ))}

</tbody>

</table>

  </div>

</div>







    



       

</div>


<div className="mx-8 mt-10 overflow-hidden rounded-[26px] border border-yellow-500/20 bg-[#151515]/90 backdrop-blur-xl shadow-[0_0_30px_rgba(234,179,8,0.05)]">

  <div className="flex items-center justify-between border-b border-yellow-500/20 bg-gradient-to-r from-[#1B1B1B] via-[#171717] to-[#111111] px-10 py-5">

    <div>

      <h2 className="text-2xl font-bold text-yellow-500">
        🩲 Compression Shorts Measurements
      </h2>

      <p className="mt-1 text-sm text-gray-400">
        Finished Garment Measurements
      </p>

    </div>

    <span className="rounded-full border border-yellow-500/20 bg-yellow-500/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.25em] text-yellow-400">
      Inches
    </span>

  </div>

  <div className="overflow-x-auto">

    <table className="min-w-full">

      <thead className="bg-[#101010]">

        <tr>

          <th className="px-6 py-4 text-left text-sm font-bold uppercase tracking-[0.25em] text-yellow-500">
            Size
          </th>

          <th className="px-6 py-4 text-center text-sm font-bold uppercase tracking-[0.25em] text-yellow-500">
            Waist
          </th>

          <th className="px-6 py-4 text-center text-sm font-bold uppercase tracking-[0.25em] text-yellow-500">
            Length
          </th>

        </tr>

      </thead>

      <tbody>

        {compressionSizes.map((item) => (

          <tr
            key={item.id}
            className="border-b border-yellow-500/10 odd:bg-[#171717] even:bg-[#111111] transition hover:bg-yellow-500/5"
          >

            <td className="px-6 py-4 font-semibold text-white">
              {item.size}
            </td>

            <td className="px-6 py-4 text-center text-gray-300">
              {item.waist}"
            </td>

            <td className="px-6 py-4 text-center text-gray-300">
              {item.length}"
            </td>

          </tr>

        ))}

      </tbody>

    </table>

  </div>

</div>

<p className="mt-10 mb-10 text-center text-sm font-medium uppercase tracking-[0.18em] text-gray-400">
  Thank you for choosing <span className="font-bold text-yellow-500">ZASHAM ENTERPRISES</span>.
</p>











</div>
</div>
</>

);
}

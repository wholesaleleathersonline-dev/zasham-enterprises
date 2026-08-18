"use client";
import Image from "next/image";

interface RevenueViewProps {
  revenue: any;
}

export default function RevenueView({
  revenue,
}: RevenueViewProps) {
  return (

    

<div
  id="revenue-report"
  className="mx-auto bg-white text-black shadow-2xl"
  style={{
    width: "210mm",
     minHeight: "280mm",
     marginTop:"8mm",
   padding: "7mm",
}}
>


   

{/* ================= HEADER ================= */}

<div className="flex items-start justify-between border-b-2 border-[#E5A812] pb-2">

  <div className="flex items-center gap-2">

    <Image
      src="/logo/logo2.png"
      alt="Zasham Enterprises"
      width={135}
      height={50}
      priority
    />

    <div>
<h2
  className="text-base font-bold tracking-wide"
  style={{ color: "#E5A812" }}
>
  ZASHAM ENTERPRISES
</h2>
      <p
  className="text-xs font-medium"
 style={{ color: "#E5A812" }}
>
  Custom Sportswear Manufacturer
</p>

    <p
  className="text-xs"
 style={{ color: "#E5A812" }}
>
  Sialkot, Pakistan
</p>

     <p
  className="text-xs"
  style={{ color: "#E5A812" }}
>
  info@zashamenterprises.com
</p>    
<p
  className="text-xs font-medium"
  style={{ color: "#E5A812" }}
>
  www.zashamenterprises.com
</p>
    </div>

  </div>

  <div className="text-right">
<h1
  className="text-2xl font-extrabold tracking-wide"
 style={{ color: "#E5A812" }}
>
  REVENUE REPORT
</h1>

    <div className="mt-2 space-y-1 text-xs">

      <p>
        <span className="font-semibold">
          Report Date :
        </span>{" "}
        {new Date().toLocaleDateString()}
      </p>

      <p>
        <span className="font-semibold">
          Report ID :
        </span>{" "}
        RV-{revenue.id}
      </p>

    </div>

  </div>

</div>





{/* ================= CUSTOMER + INVOICE ================= */}

<div className="mt-4 grid grid-cols-2 gap-4">

  {/* Customer */}

  <div className="p-2">

    <h2 className="mb-3 border-b border-[#E5A812] pb-1 text-base font-bold text-black">
      Customer Information
    </h2>

    <div className="space-y-2 text-sm">

      <div className="flex justify-between">

        <span className="font-semibold">
          Name
        </span>

        <span>
          {revenue.customer_name || "-"}
        </span>

      </div>

      <div className="flex justify-between">

        <span className="font-semibold">
          Email
        </span>

        <span>
          {revenue.email || "-"}
        </span>

      </div>

      <div className="flex justify-between">

        <span className="font-semibold">
          Phone
        </span>

        <span>
          {revenue.phone || "-"}
        </span>

      </div>

      <div>

        <p className="font-semibold">
          Address
        </p>

        <p className="mt-1 text-gray-700">
          {revenue.address || "-"}
        </p>

      </div>

    </div>

  </div>



  {/* Invoice */}

  <div className="p-2">

    <h2 className="mb-3 border-b border-[#E5A812] pb-1 text-lg font-bold text-black">
      Invoice Information
    </h2>

    <div className="space-y-2 text-sm">

      <div className="flex justify-between">

        <span className="font-semibold">
          Invoice #
        </span>

        <span>
          {revenue.invoice_number}
        </span>

      </div>

      <div className="flex justify-between">

        <span className="font-semibold">
          Date
        </span>

        <span>
          {revenue.invoice_date}
        </span>

      </div>

      <div className="flex justify-between">

        <span className="font-semibold">
          Status
        </span>
<span
  className="text-lg font-bold uppercase tracking-wide"
  style={{ color: "#E5A812" }}
>
  {revenue.status}
</span>

      </div>

      <div className="flex justify-between">

        <span className="font-semibold">
          Invoice USD
        </span>

        <span className="font-bold font-bold text-black">
          ${Number(revenue.total ?? 0).toFixed(2)}
        </span>

      </div>

      <div className="flex justify-between">

        <span className="font-semibold">
          Invoice PKR
        </span>

        <span className="font-bold font-bold text-black">
         Rs {(Number(revenue.total ?? 0) * 278).toLocaleString()}
        </span>

      </div>

    </div>

  </div>

</div>




{/* ================= MANUFACTURING + PRODUCTION ================= */}

<div className="mt-6 grid grid-cols-2 gap-4">

  {/* Manufacturing */}

  <div className="p-2">

    <h2 className="mb-3 border-b border-[#E5A812] pb-1 text-lg font-bold text-black">
      Manufacturing Cost
    </h2>

    <div className="space-y-2 text-sm">

      <div className="flex justify-between">
        <span>Fabric Cost</span>
        <span>Rs {Number(revenue.fabric_cost ?? 0).toLocaleString()}</span>
      </div>

      <div className="flex justify-between">
        <span>Sublimation</span>
        <span>Rs {Number(revenue.sublimation_cost ?? 0).toLocaleString()}</span>
      </div>

      <div className="flex justify-between">
        <span>Stitching</span>
        <span>Rs {Number(revenue.stitching_cost ?? 0).toLocaleString()}</span>
      </div>

      <div className="flex justify-between">
        <span>Shipping</span>
        <span>Rs {Number(revenue.shipping_cost ?? 0).toLocaleString()}</span>
      </div>

      <div className="mt-3 flex justify-between border-t pt-2 text-base font-bold font-bold text-[#E5A812]">
        <span>Total Cost</span>
        <span>Rs {Number(revenue.total_cost ?? 0).toLocaleString()}</span>
      </div>

    </div>

  </div>



  {/* Production */}

  <div className="p-2">

    <h2 className="mb-3 border-b border-[#E5A812] pb-1 text-lg font-bold text-black">
      Production Details
    </h2>

    <div className="space-y-2 text-sm">

      <div className="flex justify-between">
        <span>Jersey Qty</span>
        <span>{Number(revenue.jersey_qty ?? 0)}</span>
      </div>

      <div className="flex justify-between">
        <span>Short Qty</span>
        <span>{Number(revenue.short_qty ?? 0)}</span>
      </div>

      <div className="flex justify-between">
        <span>Total Pieces</span>
        <span className="font-semibold">
          {Number(revenue.total_pieces ?? 0)}
        </span>
      </div>

     <div className="flex justify-between">
  <span>Cost / Piece</span>
  <span className="font-semibold font-bold text-[#E5A812]">
    Rs {Number(revenue.cost_per_piece ?? 0).toFixed(2)}
  </span>
</div>

<div className="flex justify-between">
  <span>Revenue / Piece</span>
  <span className="font-semibold font-bold text-black">
    $
    {Number(revenue.total_pieces ?? 0) > 0
      ? (
          Number(revenue.revenue ?? 0) /
          Number(revenue.total_pieces)
        ).toFixed(2)
      : "0.00"}
  </span>
</div>

    </div>

  </div>

</div>





{/* ================= REVENUE SUMMARY ================= */}

<div className="mt-6 p-2">

  <h2 className="mb-3 border-b border-[#E5A812] pb-1 text-lg font-bold text-black">
    Revenue Summary
  </h2>

  <div className="grid grid-cols-3 gap-2">

    <div className="text-center">
      <p className="text-xs text-gray-600">
        Revenue (USD)
      </p>

      <p className="mt-1 text-lg font-bold font-bold text-black">
        ${Number(revenue.revenue ?? 0).toFixed(2)}
      </p>
    </div>

    <div className="text-center">
      <p className="text-xs text-gray-600">
        Manufacturing
      </p>

      <p className="mt-1 text-lg font-bold font-bold text-[#E5A812]">
        Rs {Number(revenue.total_cost ?? 0).toLocaleString()}
      </p>
    </div>

    <div className="text-center">
      <p className="text-xs text-gray-600">
        Pieces
      </p>

      <p
        className="mt-1 text-lg font-bold"
        style={{ color: "#000000" }}
      >
        {Number(revenue.total_pieces ?? 0)}
      </p>
    </div>

  </div>

</div>







{/* ================= ORDER APPROVAL ================= */}

<div className="mt-6 p-2">

  <h2 className="mb-3 border-b border-[#E5A812] pb-1 text-lg font-bold text-black">
    Order Approval
  </h2>

  <div className="grid grid-cols-3 gap-6 text-sm">

    <div>
      <p
        className="mb-20  font-semibold"
        style={{ color: "#000000" }}
      >
        Order Status
      </p>

      <div className="border-b border-black"></div>
    </div>

    <div>
      <p
        className="mb-20 font-semibold"
        style={{ color: "#000000" }}
      >
        CEO Signature
      </p>

      <div className="border-b border-black"></div>
    </div>

    <div>
      <p
        className="mb-20 font-semibold"
        style={{ color: "#000000" }}
      >
        Company Stamp
      </p>

      <div className="border-b border-black"></div>
    </div>

  </div>

</div>


{/* ================= FOOTER ================= */}

<div className="mt-20 border-t border-[#E5A812] pt-3">

  <div className=" mt-10 flex items-center justify-between text-xs text-gray-600">

    <div >

      <p>
        Generated :
        {" "}
        {new Date().toLocaleDateString()}
      </p>

      <p className="mt-1">
        Confidential Internal Revenue Report
      </p>

    </div>

    <div className="text-right">

      <p className="font-bold text-black">
        ZASHAM ENTERPRISES
      </p>

      <p>
        Sportswear Manufacturer
      </p>

    </div>

  </div>

</div>
    </div>
  );
}
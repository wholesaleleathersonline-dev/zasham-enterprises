

"use client";

import {
  deleteSizeChart,
  deleteMultipleSizeCharts,
  getSizeCharts,
} from "../../../services/admin/sizeChart.service";
import { useEffect, useState } from "react";
import ConfirmModal from "../modals/ConfirmModal";
import SuccessModal from "../modals/SuccessModal";
import ErrorModal from "../modals/ErrorModal";
import Link from "next/link";
import { Plus } from "lucide-react";
import { Eye } from "lucide-react";

interface SizeChart {
  id: number;
  name: string;
  sport: string;
  status: string;
}

export default function SizeChartsTable(): React.JSX.Element {
  

 const [charts, setCharts] = useState<SizeChart[]>([]);
 const [loading, setLoading] = useState(true);
const [selectedIds, setSelectedIds] = useState<number[]>([]);

const [deleteId, setDeleteId] =
  useState<number | null>(null);

const [confirmOpen, setConfirmOpen] =
  useState(false);

const [successOpen, setSuccessOpen] =
  useState(false);

const [errorOpen, setErrorOpen] =
  useState(false);

const [successMessage, setSuccessMessage] =
  useState("");

const [errorMessage, setErrorMessage] =
  useState("");

const [isDeleting, setIsDeleting] =
  useState(false);

  async function loadSizeCharts() {
  try {
    const data = await getSizeCharts();

    setCharts((data as SizeChart[]) ?? []);
  } catch (error) {
    console.error(error);
  } finally {
    setLoading(false);
  }
}

useEffect(() => {
  void loadSizeCharts();
}, []);

async function handleDelete(): Promise<void> {
  if (!deleteId) {
    return;
  }

  try {
    setIsDeleting(true);

    await deleteSizeChart(deleteId);

    setConfirmOpen(false);

  setSuccessMessage(
  "Size chart deleted successfully."
);

    setSuccessOpen(true);

    setDeleteId(null);

   await loadSizeCharts();
  } catch (error) {
    console.error(error);

    setConfirmOpen(false);

    if (error instanceof Error) {
      setErrorMessage(error.message);
    } else {
      setErrorMessage(
        "Failed to delete Size Chart."
      );
    }

    setErrorOpen(true);
  } finally {
    setIsDeleting(false);
  }
}


async function handleDeleteSelected(): Promise<void> {
  if (selectedIds.length === 0) {
    return;
  }

  try {
    setIsDeleting(true);

    await deleteMultipleSizeCharts(selectedIds);

    setConfirmOpen(false);

    setSelectedIds([]);

    setSuccessMessage(
      "Selected size charts deleted successfully."
    );

    setSuccessOpen(true);

    await loadSizeCharts();

  } catch (error) {
    console.error(error);

    setConfirmOpen(false);

    if (error instanceof Error) {
      setErrorMessage(error.message);
    } else {
      setErrorMessage(
        "Failed to delete selected size charts."
      );
    }

    setErrorOpen(true);

  } finally {
    setIsDeleting(false);
  }
}

  if (loading) {
    return (
      <div className="rounded-xl border border-yellow-500/20 bg-[#1A1A1A] p-10 text-center text-gray-400">
        Loading size charts...
      </div>
    );
  }
console.log("SizeChartsTable Loaded");
  return (

    
    
    <div className="overflow-hidden rounded-xl border border-yellow-500/20 bg-[#1A1A1A]">

        {selectedIds.length > 0 && (
  <div className="flex items-center justify-between border-b border-yellow-500/20 bg-[#111111] px-4 py-3">
    <p className="text-sm font-medium text-white">
      {selectedIds.length} Size Chart
      {selectedIds.length > 1 ? "s" : ""} Selected
    </p>

    <button
      type="button"
      onClick={() => setConfirmOpen(true)}
      className="rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-red-500"
    >
      Delete Selected
    </button>
  </div>
)}

      <div className="overflow-x-auto">
        <table className="min-w-full">
       <thead className="border-b border-yellow-500/20 bg-[#111111]">
  <tr>
    <th className="w-14 px-4 py-4 text-center">
      <input
        type="checkbox"
        checked={
          charts.length > 0 &&
          selectedIds.length === charts.length
        }
        onChange={(e) => {
          if (e.target.checked) {
            setSelectedIds(charts.map((chart) => chart.id));
          } else {
            setSelectedIds([]);
          }
        }}
        className="h-4 w-4 cursor-pointer accent-yellow-500"
      />
    </th>

    <th className="px-6 py-4 text-left text-sm font-semibold text-yellow-500">
      Name
    </th>

    <th className="px-6 py-4 text-left text-sm font-semibold text-yellow-500">
      Sport
    </th>

    <th className="px-6 py-4 text-left text-sm font-semibold text-yellow-500">
      Status
    </th>

    <th className="px-6 py-4 text-right text-sm font-semibold text-yellow-500">
      Actions
    </th>
  </tr>
</thead>

          <tbody>
            {charts.length === 0 ? (
              <tr>
                <td
                 colSpan={5}
                  className="px-6 py-20 text-center"
                >
                  <div className="flex flex-col items-center">
                    <div className="mb-4 text-6xl">📦</div>

                    <h3 className="text-xl font-semibold text-white">
                      No Size Charts Found
                    </h3>

                    <p className="mt-2 text-gray-400">
                      Start by creating your first size chart.
                    </p>

                    <Link
                      href="/admin/size-chart/create"
                      className="mt-6 inline-flex items-center gap-2 rounded-lg bg-yellow-500 px-5 py-3 font-semibold text-black transition hover:bg-yellow-400"
                    >
                      <Plus size={18} />
                      Create First Size Chart
                    </Link>
                  </div>
                </td>
              </tr>
            ) : (
              charts.map((chart) => (
               <tr
  key={chart.id}
  className="border-b border-yellow-500/10"
>
    <td className="w-14 px-4 py-4 text-center">
  <input
    type="checkbox"
    checked={selectedIds.includes(chart.id)}
    onChange={(e) => {
      if (e.target.checked) {
        setSelectedIds((prev) => [...prev, chart.id]);
      } else {
        setSelectedIds((prev) =>
          prev.filter((id) => id !== chart.id)
        );
      }
    }}
    className="h-4 w-4 cursor-pointer accent-yellow-500"
  />
</td>
  <td className="px-6 py-4 text-white">
    {chart.name}
  </td>

  <td className="px-6 py-4 text-gray-300">
    {chart.sport}
  </td>

  <td className="px-6 py-4">
    <span className="rounded-full bg-green-500/20 px-3 py-1 text-sm text-green-400">
      {chart.status}
    </span>
  </td>

  <td className="px-6 py-4 text-right">
    <div className="flex justify-end gap-4">

      <Link
        href={`/admin/size-chart/edit/${chart.id}`}
        className="font-medium text-yellow-500 transition hover:text-yellow-400"
      >
        Edit
      </Link>




<Link
  href={`/admin/size-chart/view/${chart.id}`}
  className="font-medium text-blue-500 transition hover:text-blue-400"
>
  View
</Link>


<button
  type="button"
  onClick={() => {
    setDeleteId(chart.id);
    setConfirmOpen(true);
  }}
  className="font-medium text-red-500 transition hover:text-red-400"
>
  Delete
</button>

    </div>
  </td>
</tr>
              ))
            )}
          </tbody>
        </table>
      </div>


<ConfirmModal
  isOpen={confirmOpen}
  title={
  selectedIds.length > 0
    ? "Delete Selected Size Charts"
    : "Delete Size Chart"
}
  message={
  selectedIds.length > 0
    ? `Are you sure you want to delete ${selectedIds.length} selected size charts? This action cannot be undone.`
    : "Are you sure you want to delete this size chart? This action cannot be undone."
}
  confirmText="Delete"
  cancelText="Cancel"
  isLoading={isDeleting}
  onConfirm={() => {
  if (selectedIds.length > 0) {
    void handleDeleteSelected();
  } else {
    void handleDelete();
  }
}}
  onClose={() => {
    setConfirmOpen(false);
    setDeleteId(null);
  }}
/>

<SuccessModal
  isOpen={successOpen}
  title="Success"
  message={successMessage}
  onClose={() => {
    setSuccessOpen(false);
  }}
/>

<ErrorModal
  isOpen={errorOpen}
  title="Error"
  message={errorMessage}
  onClose={() => {
    setErrorOpen(false);
  }}
/>



    </div>
  );
}
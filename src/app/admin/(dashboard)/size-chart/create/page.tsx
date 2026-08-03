"use client";
import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Trash2, Save } from "lucide-react";
import { useForm, useFieldArray } from "react-hook-form";


import SuccessModal from "../../../../../components/admin/modals/SuccessModal";
import ErrorModal from "../../../../../components/admin/modals/ErrorModal";

import { createSizeChart } from "../../../../../services/admin/sizeChart.service";

type JerseySizeRow = {
  size: string;
  chest: string;
  length: string;
};

type ShortsSizeRow = {
  size: string;
  waist: string;
  length: string;
};

type SizeChartForm = {
  chartName: string;
  sport: string;
  description: string;

  jerseySizes: JerseySizeRow[];

  shortsSizes: ShortsSizeRow[];

  compressionSizes: CompressionSizeRow[];
};

type CompressionSizeRow = {
  size: string;
  waist: string;
  length: string;
};

const SPORTS = [
  "Basketball",
  "American Football",
  "Flag Football",
  "Baseball",
  "Soccer",
  "Volleyball",
  "Rugby",
  "Cricket",
  "Ice Hockey",
];

const SIZE_OPTIONS = [
  "YXS",
  "YS",
  "YM",
  "YL",
  "YXL",
  "AXS",
  "AS",
  "AM",
  "AL",
  "AXL",
  "A2XL",
  "A3XL",
  "A4XL",
  "A5XL",
];

export default function CreateSizeChartPage(): React.JSX.Element {
  const {
    control,
    register,
    handleSubmit,
  } = useForm<SizeChartForm>({
    defaultValues: {
      chartName: "",
      sport: "",
      description: "",

      jerseySizes: [],

      shortsSizes: [],
      compressionSizes: [],
    },
  });


  const [successOpen, setSuccessOpen] = useState(false);
const [errorOpen, setErrorOpen] = useState(false);

const [successMessage, setSuccessMessage] = useState("");
const [errorMessage, setErrorMessage] = useState("");


  const {
    fields: jerseyFields,
    append: appendJersey,
    remove: removeJersey,
  } = useFieldArray({
    control,
    name: "jerseySizes",
  });

  const {
    fields: shortsFields,
    append: appendShorts,
    remove: removeShorts,
  } = useFieldArray({
    control,
    name: "shortsSizes",
  });

  const {
  fields: compressionFields,
  append: appendCompression,
  remove: removeCompression,
} = useFieldArray({
  control,
  name: "compressionSizes",
});

const onSubmit = async (
  
  data: SizeChartForm
) => {
  console.log("Compression Sizes:", data.compressionSizes);

  try {
    await createSizeChart(data);

    setSuccessMessage(
      "Size Chart created successfully."
    );

    setSuccessOpen(true);

  } catch (error) {

    if (error instanceof Error) {
      setErrorMessage(error.message);
    } else {
      setErrorMessage("Unknown error");
    }

    setErrorOpen(true);
  }
};

  return (

    <form
  onSubmit={handleSubmit(onSubmit)}
  className="mx-auto w-full max-w-7xl space-y-6 px-3 py-4 sm:px-4 sm:py-6 lg:px-6"
>
  {/* Header */}
  <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
    <div>
      <Link
        href="/admin/size-chart"
        className="inline-flex items-center gap-2 text-sm text-gray-400 transition hover:text-yellow-500"
      >
        <ArrowLeft size={18} />
        Back to Size Charts
      </Link>

      <h1 className="mt-3 text-2xl font-bold text-white sm:text-3xl">
        Create Size Chart
      </h1>

      <p className="mt-2 text-sm text-gray-400">
        Create reusable jersey and shorts size charts.
      </p>
    </div>
  </div>

  {/* Basic Information */}
  <div className="rounded-2xl border border-yellow-500/20 bg-[#111111] p-4 sm:p-6">
    <h2 className="mb-5 text-xl font-semibold text-white">
      Basic Information
    </h2>

    <div className="grid gap-5 lg:grid-cols-2">
      {/* Chart Name */}
      <div>
        <label className="mb-2 block text-sm font-medium text-white">
          Size Chart Name
        </label>

        <input
          {...register("chartName")}
          type="text"
          placeholder="Example: 7v7 Adult Jersey"
          className="w-full rounded-xl border border-yellow-500/20 bg-[#1A1A1A] px-4 py-3 text-white placeholder:text-gray-500 outline-none transition focus:border-yellow-500"
        />
      </div>

      {/* Sport */}
      <div>
        <label className="mb-2 block text-sm font-medium text-white">
          Sport
        </label>

        <select
          {...register("sport")}
          className="w-full rounded-xl border border-yellow-500/20 bg-[#1A1A1A] px-4 py-3 text-white outline-none transition focus:border-yellow-500"
        >
          <option value="">Select Sport</option>

          {SPORTS.map((sport) => (
            <option key={sport} value={sport}>
              {sport}
            </option>
          ))}
        </select>
      </div>

      {/* Description */}
      <div className="lg:col-span-2">
        <label className="mb-2 block text-sm font-medium text-white">
          Description
        </label>

        <textarea
          {...register("description")}
          rows={4}
          placeholder="Enter size chart description..."
          className="w-full rounded-xl border border-yellow-500/20 bg-[#1A1A1A] px-4 py-3 text-white placeholder:text-gray-500 outline-none transition focus:border-yellow-500"
        />
      </div>
    </div>
  </div>

    {/* ================= Jersey Size ================= */}

  <div className="rounded-2xl border border-yellow-500/20 bg-[#111111] p-4 sm:p-6">
    <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h2 className="text-xl font-semibold text-white">
          Jersey Size
        </h2>

        <p className="mt-1 text-sm text-gray-400">
          Add jersey chest and length measurements.
        </p>
      </div>

      <button
        type="button"
        onClick={() =>
          appendJersey({
            size: "",
            chest: "",
            length: "",
          })
        }
        className="w-full rounded-xl bg-yellow-500 px-5 py-3 text-sm font-semibold text-black transition hover:bg-yellow-400 sm:w-auto"
      >
        + Add Jersey Size
      </button>
    </div>

    <div className="space-y-4">
      {jerseyFields.map((field, index) => (
        <div
          key={field.id}
          className="rounded-xl border border-yellow-500/20 bg-[#1A1A1A] p-4"
        >
          <div className="grid gap-4 md:grid-cols-4">

            {/* Size */}
            <div>
              <label className="mb-2 block text-sm font-medium text-white">
                Size
              </label>

              <select
                {...register(`jerseySizes.${index}.size`)}
                className="w-full rounded-xl border border-yellow-500/20 bg-[#111111] px-4 py-3 text-white"
              >
                <option value="">Select Size</option>

                {SIZE_OPTIONS.map((size) => (
                  <option key={size} value={size}>
                    {size}
                  </option>
                ))}
              </select>
            </div>

            {/* Chest */}
            <div>
              <label className="mb-2 block text-sm font-medium text-white">
                Chest
              </label>

              <input
                {...register(`jerseySizes.${index}.chest`)}
                type="number"
                placeholder="18"
                className="w-full rounded-xl border border-yellow-500/20 bg-[#111111] px-4 py-3 text-white"
              />
            </div>

            {/* Length */}
            <div>
              <label className="mb-2 block text-sm font-medium text-white">
                Length
              </label>

              <input
                {...register(`jerseySizes.${index}.length`)}
                type="number"
                placeholder="28"
                className="w-full rounded-xl border border-yellow-500/20 bg-[#111111] px-4 py-3 text-white"
              />
            </div>

            {/* Delete */}
            <div className="flex items-end">
              <button
                type="button"
                onClick={() => removeJersey(index)}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-red-600 px-4 py-3 font-medium text-white transition hover:bg-red-500"
              >
                <Trash2 size={18} />
                Delete
              </button>
            </div>

          </div>
        </div>
      ))}
    </div>
  </div>

    {/* ================= Shorts Size ================= */}

  <div className="rounded-2xl border border-yellow-500/20 bg-[#111111] p-4 sm:p-6">
    <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h2 className="text-xl font-semibold text-white">
          Shorts Size
        </h2>

        <p className="mt-1 text-sm text-gray-400">
          Add shorts waist and length measurements.
        </p>
      </div>

      <button
        type="button"
        onClick={() =>
          appendShorts({
            size: "",
            waist: "",
            length: "",
          })
        }
        className="w-full rounded-xl bg-yellow-500 px-5 py-3 text-sm font-semibold text-black transition hover:bg-yellow-400 sm:w-auto"
      >
        + Add Shorts Size
      </button>
    </div>

    <div className="space-y-4">
      {shortsFields.map((field, index) => (
        <div
          key={field.id}
          className="rounded-xl border border-yellow-500/20 bg-[#1A1A1A] p-4"
        >
          <div className="grid gap-4 md:grid-cols-4">

            {/* Size */}
            <div>
              <label className="mb-2 block text-sm font-medium text-white">
                Size
              </label>

              <select
                {...register(`shortsSizes.${index}.size`)}
                className="w-full rounded-xl border border-yellow-500/20 bg-[#111111] px-4 py-3 text-white"
              >
                <option value="">Select Size</option>

                {SIZE_OPTIONS.map((size) => (
                  <option key={size} value={size}>
                    {size}
                  </option>
                ))}
              </select>
            </div>

            {/* Waist */}
            <div>
              <label className="mb-2 block text-sm font-medium text-white">
                Waist
              </label>

              <input
                {...register(`shortsSizes.${index}.waist`)}
                type="number"
                placeholder="30"
                className="w-full rounded-xl border border-yellow-500/20 bg-[#111111] px-4 py-3 text-white"
              />
            </div>

            {/* Length */}
            <div>
              <label className="mb-2 block text-sm font-medium text-white">
                Length
              </label>

              <input
                {...register(`shortsSizes.${index}.length`)}
                type="number"
                placeholder="18"
                className="w-full rounded-xl border border-yellow-500/20 bg-[#111111] px-4 py-3 text-white"
              />
            </div>

            {/* Delete */}
            <div className="flex items-end">
              <button
                type="button"
                onClick={() => removeShorts(index)}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-red-600 px-4 py-3 font-medium text-white transition hover:bg-red-500"
              >
                <Trash2 size={18} />
                Delete
              </button>
            </div>

          </div>
        </div>
      ))}
    </div>
  </div>



 {/* ================= Compression Shorts Size ================= */}

  <div className="rounded-2xl border border-yellow-500/20 bg-[#111111] p-4 sm:p-6">
    <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h2 className="text-xl font-semibold text-white">
          Compression Shorts
        </h2>

        <p className="mt-1 text-sm text-gray-400">
          Add compression shorts waist and length measurements.
        </p>
      </div>

      <button
        type="button"
        onClick={() =>
          appendCompression({
            size: "",
            waist: "",
            length: "",
          })
        }
        className="w-full rounded-xl bg-yellow-500 px-5 py-3 text-sm font-semibold text-black transition hover:bg-yellow-400 sm:w-auto"
      >
        + Add Compression Size
      </button>
    </div>

    <div className="space-y-4">
      {compressionFields.map((field, index) => (
        <div
          key={field.id}
          className="rounded-xl border border-yellow-500/20 bg-[#1A1A1A] p-4"
        >
          <div className="grid gap-4 md:grid-cols-4">

            {/* Size */}
            <div>
              <label className="mb-2 block text-sm font-medium text-white">
                Size
              </label>

              <select
                {...register(`compressionSizes.${index}.size`)}
                className="w-full rounded-xl border border-yellow-500/20 bg-[#111111] px-4 py-3 text-white"
              >
                <option value="">Select Size</option>

                {SIZE_OPTIONS.map((size) => (
                  <option key={size} value={size}>
                    {size}
                  </option>
                ))}
              </select>
            </div>

            {/* Waist */}
            <div>
              <label className="mb-2 block text-sm font-medium text-white">
                Waist
              </label>

              <input
                {...register(`compressionSizes.${index}.waist`)}
                type="number"
                placeholder="30"
                className="w-full rounded-xl border border-yellow-500/20 bg-[#111111] px-4 py-3 text-white"
              />
            </div>

            {/* Length */}
            <div>
              <label className="mb-2 block text-sm font-medium text-white">
                Length
              </label>

              <input
                {...register(`compressionSizes.${index}.length`)}
                type="number"
                placeholder="18"
                className="w-full rounded-xl border border-yellow-500/20 bg-[#111111] px-4 py-3 text-white"
              />
            </div>

            {/* Delete */}
            <div className="flex items-end">
              <button
                type="button"
                onClick={() => removeCompression(index)}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-red-600 px-4 py-3 font-medium text-white transition hover:bg-red-500"
              >
                <Trash2 size={18} />
                Delete
              </button>
            </div>

          </div>
        </div>
      ))}
    </div>
  </div>










  {/* ================= Save Button ================= */}

  <div className="sticky bottom-0 rounded-2xl border border-yellow-500/20 bg-[#111111]/95 p-4 backdrop-blur">
    <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">

      <Link
        href="/admin/size-chart"
        className="flex items-center justify-center rounded-xl border border-yellow-500/20 bg-[#1A1A1A] px-6 py-3 font-medium text-white transition hover:border-yellow-500"
      >
        Cancel
      </Link>

      <button
        type="submit"
        className="flex items-center justify-center gap-2 rounded-xl bg-yellow-500 px-6 py-3 font-semibold text-black transition hover:bg-yellow-400"
      >
        <Save size={18} />
        Save Size Chart
      </button>

    </div>
  </div>

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
  title="Something Went Wrong"
  message={errorMessage}
  onClose={() => {
    setErrorOpen(false);
  }}
/>

</form>



    
  );
}
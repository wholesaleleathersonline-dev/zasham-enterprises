
"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Save, Trash2 } from "lucide-react";
import { useForm, useFieldArray } from "react-hook-form";

import {
  getSizeChartById,
  updateSizeChart,
} from "../../../../../../services/admin/sizeChart.service";

import type { SizeChartFormData } from "../../../../../../lib/validations/sizeChart.schema";

import SuccessModal from "../../../../../../components/admin/modals/SuccessModal";
import ErrorModal from "../../../../../../components/admin/modals/ErrorModal";

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
  "YXS", "YS", "YM", "YL", "YXL",
  "AXS", "AS", "AM", "AL", "AXL",
  "A2XL", "A3XL", "A4XL", "A5XL",
];

export default function EditSizeChartPage(): React.JSX.Element {
  const params = useParams<{ id: string }>();
  const id = Number(params.id);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [successOpen, setSuccessOpen] = useState(false);
  const [errorOpen, setErrorOpen] = useState(false);

  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const {
    control,
    register,
    handleSubmit,
    reset,
  } = useForm<SizeChartFormData>({
    defaultValues: {
      chartName: "",
      sport: "",
      description: "",
      jerseySizes: [],
      shortsSizes: [],
      compressionSizes: [],
    },
  });

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

  // Load Existing Size Chart
  useEffect(() => {
    async function loadChart() {
      try {
        if (!Number.isInteger(id) || id <= 0) {
          throw new Error("Invalid Size Chart ID.");
        }

        const result = await getSizeChartById(id);

        reset({
          chartName: result.chart.name ?? "",
          sport: result.chart.sport ?? "",
          description: result.chart.description ?? "",

          jerseySizes: result.jerseySizes.map((item) => ({
            size: item.size ?? "",
            chest: item.chest ?? "",
            length: item.length ?? "",
          })),

          shortsSizes: result.shortsSizes.map((item) => ({
            size: item.size ?? "",
            waist: item.waist ?? "",
            length: item.length ?? "",
          })),

          compressionSizes: result.compressionSizes.map((item) => ({
            size: item.size ?? "",
            waist: item.waist ?? "",
            length: item.length ?? "",
          })),
        });
      } catch (error) {
        setErrorMessage(
          error instanceof Error
            ? error.message
            : "Failed to load Size Chart."
        );
        setErrorOpen(true);
      } finally {
        setLoading(false);
      }
    }

    void loadChart();
  }, [id, reset]);

  // Update Size Chart
  const onSubmit = async (data: SizeChartFormData) => {
    try {
      setSaving(true);

      await updateSizeChart(id, data);

      setSuccessMessage("Size Chart updated successfully.");
      setSuccessOpen(true);
    } catch (error) {
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "Failed to update Size Chart."
      );
      setErrorOpen(true);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="p-10 text-center text-gray-400">
        Loading Size Chart...
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="mx-auto w-full max-w-7xl space-y-6 px-3 py-4 sm:px-4 sm:py-6 lg:px-6"
    >
      {/* Header */}
      <div>
        <Link
          href="/admin/size-chart"
          className="inline-flex items-center gap-2 text-sm text-gray-400 transition hover:text-yellow-500"
        >
          <ArrowLeft size={18} />
          Back to Size Charts
        </Link>

        <h1 className="mt-3 text-2xl font-bold text-white sm:text-3xl">
          Edit Size Chart
        </h1>

        <p className="mt-2 text-sm text-gray-400">
          Update your existing size chart and measurements.
        </p>
      </div>

      {/* Basic Information */}
      <div className="rounded-2xl border border-yellow-500/20 bg-[#111111] p-4 sm:p-6">
        <h2 className="mb-5 text-xl font-semibold text-white">
          Basic Information
        </h2>

        <div className="grid gap-5 lg:grid-cols-2">
          <div>
            <label className="mb-2 block text-sm font-medium text-white">
              Size Chart Name
            </label>

            <input
              {...register("chartName")}
              type="text"
              className="w-full rounded-xl border border-yellow-500/20 bg-[#1A1A1A] px-4 py-3 text-white outline-none focus:border-yellow-500"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-white">
              Sport
            </label>

            <select
              {...register("sport")}
              className="w-full rounded-xl border border-yellow-500/20 bg-[#1A1A1A] px-4 py-3 text-white"
            >
              <option value="">Select Sport</option>

              {SPORTS.map((sport) => (
                <option key={sport} value={sport}>
                  {sport}
                </option>
              ))}
            </select>
          </div>

          <div className="lg:col-span-2">
            <label className="mb-2 block text-sm font-medium text-white">
              Description
            </label>

            <textarea
              {...register("description")}
              rows={4}
              className="w-full rounded-xl border border-yellow-500/20 bg-[#1A1A1A] px-4 py-3 text-white outline-none focus:border-yellow-500"
            />
          </div>
        </div>
      </div>

      {/* Jersey Sizes */}
      <div className="rounded-2xl border border-yellow-500/20 bg-[#111111] p-4 sm:p-6">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="text-xl font-semibold text-white">
              Jersey Size
            </h2>
            <p className="mt-1 text-sm text-gray-400">
              Edit jersey chest and length measurements.
            </p>
          </div>

          <button
            type="button"
            onClick={() =>
              appendJersey({ size: "", chest: "", length: "" })
            }
            className="rounded-xl bg-yellow-500 px-5 py-3 text-sm font-semibold text-black hover:bg-yellow-400"
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
                <div>
                  <label className="mb-2 block text-sm text-white">
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

                <div>
                  <label className="mb-2 block text-sm text-white">
                    Chest
                  </label>
                  <input
                    {...register(`jerseySizes.${index}.chest`)}
                    type="text"
                    placeholder="17.5 - 18"
                    className="w-full rounded-xl border border-yellow-500/20 bg-[#111111] px-4 py-3 text-white"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm text-white">
                    Length
                  </label>
                  <input
                    {...register(`jerseySizes.${index}.length`)}
                    type="text"
                    placeholder="28 - 28.5"
                    className="w-full rounded-xl border border-yellow-500/20 bg-[#111111] px-4 py-3 text-white"
                  />
                </div>

                <div className="flex items-end">
                  <button
                    type="button"
                    onClick={() => removeJersey(index)}
                    className="flex w-full items-center justify-center gap-2 rounded-xl bg-red-600 px-4 py-3 text-white hover:bg-red-500"
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

      {/* Regular Shorts */}
      <div className="rounded-2xl border border-yellow-500/20 bg-[#111111] p-4 sm:p-6">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="text-xl font-semibold text-white">
              Shorts Size
            </h2>
            <p className="mt-1 text-sm text-gray-400">
              Edit regular shorts measurements.
            </p>
          </div>

          <button
            type="button"
            onClick={() =>
              appendShorts({ size: "", waist: "", length: "" })
            }
            className="rounded-xl bg-yellow-500 px-5 py-3 text-sm font-semibold text-black hover:bg-yellow-400"
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
                <div>
                  <label className="mb-2 block text-sm text-white">
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

                <div>
                  <label className="mb-2 block text-sm text-white">
                    Waist
                  </label>
                  <input
                    {...register(`shortsSizes.${index}.waist`)}
                    type="text"
                    placeholder="30"
                    className="w-full rounded-xl border border-yellow-500/20 bg-[#111111] px-4 py-3 text-white"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm text-white">
                    Length
                  </label>
                  <input
                    {...register(`shortsSizes.${index}.length`)}
                    type="text"
                    placeholder="18"
                    className="w-full rounded-xl border border-yellow-500/20 bg-[#111111] px-4 py-3 text-white"
                  />
                </div>

                <div className="flex items-end">
                  <button
                    type="button"
                    onClick={() => removeShorts(index)}
                    className="flex w-full items-center justify-center gap-2 rounded-xl bg-red-600 px-4 py-3 text-white hover:bg-red-500"
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

      {/* Compression Shorts */}
      <div className="rounded-2xl border border-yellow-500/20 bg-[#111111] p-4 sm:p-6">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="text-xl font-semibold text-white">
              Compression Shorts
            </h2>
            <p className="mt-1 text-sm text-gray-400">
              Edit compression shorts measurements.
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
            className="rounded-xl bg-yellow-500 px-5 py-3 text-sm font-semibold text-black hover:bg-yellow-400"
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
                <div>
                  <label className="mb-2 block text-sm text-white">
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

                <div>
                  <label className="mb-2 block text-sm text-white">
                    Waist
                  </label>
                  <input
                    {...register(`compressionSizes.${index}.waist`)}
                    type="text"
                    placeholder="25.6"
                    className="w-full rounded-xl border border-yellow-500/20 bg-[#111111] px-4 py-3 text-white"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm text-white">
                    Length
                  </label>
                  <input
                    {...register(`compressionSizes.${index}.length`)}
                    type="text"
                    placeholder="18.5"
                    className="w-full rounded-xl border border-yellow-500/20 bg-[#111111] px-4 py-3 text-white"
                  />
                </div>

                <div className="flex items-end">
                  <button
                    type="button"
                    onClick={() => removeCompression(index)}
                    className="flex w-full items-center justify-center gap-2 rounded-xl bg-red-600 px-4 py-3 text-white hover:bg-red-500"
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

      {/* Save Changes */}
      <div className="sticky bottom-0 rounded-2xl border border-yellow-500/20 bg-[#111111]/95 p-4 backdrop-blur">
        <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
          <Link
            href="/admin/size-chart"
            className="flex items-center justify-center rounded-xl border border-yellow-500/20 bg-[#1A1A1A] px-6 py-3 font-medium text-white hover:border-yellow-500"
          >
            Cancel
          </Link>

          <button
            type="submit"
            disabled={saving}
            className="flex items-center justify-center gap-2 rounded-xl bg-yellow-500 px-6 py-3 font-semibold text-black transition hover:bg-yellow-400 disabled:cursor-not-allowed disabled:opacity-60"
          >
            <Save size={18} />
            {saving ? "Saving Changes..." : "Save Changes"}
          </button>
        </div>
      </div>

      <SuccessModal
        isOpen={successOpen}
        title="Success"
        message={successMessage}
        onClose={() => setSuccessOpen(false)}
      />

      <ErrorModal
        isOpen={errorOpen}
        title="Something Went Wrong"
        message={errorMessage}
        onClose={() => setErrorOpen(false)}
      />
    </form>
  );
}

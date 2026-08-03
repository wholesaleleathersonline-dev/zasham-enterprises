import { supabase } from "../../lib/supabase/client";
import type { SizeChartFormData } from "../../lib/validations/sizeChart.schema";

export interface CompressionSize {
  id: number;
  chart_id: number;
  size: string;
  waist: number;
  length: number;
}

export async function createSizeChart(
  data: SizeChartFormData
): Promise<void> {

  const {
    data: chart,
    error: chartError,
  } = await supabase
    .from("size_charts")
    .insert({
      name: data.chartName,
      sport: data.sport,
      description: data.description,
    })
    .select("id")
    .single();

  if (chartError) {
    console.error(chartError);
    throw new Error(chartError.message);
  }

  if (!chart) {
    throw new Error("Size chart could not be created.");
  }

  const jerseyRows = data.jerseySizes.map(
    (item, index) => ({
      chart_id: chart.id,

      measurement_type: "jersey",

      size: item.size,

      chest: Number(item.chest),

      waist: null,

      length: Number(item.length),

      sort_order: index + 1,
    })
  );

  const shortsRows = data.shortsSizes.map(
    (item, index) => ({
      chart_id: chart.id,

      measurement_type: "shorts",

      size: item.size,

      chest: null,

      waist: Number(item.waist),

      length: Number(item.length),

      sort_order: index + 1,
    }))
    
    const compressionRows = data.compressionSizes.map(
  (item, index) => ({
    chart_id: chart.id,

    measurement_type: "compression",

    size: item.size,

    chest: null,

    waist: Number(item.waist),

    length: Number(item.length),

    sort_order: index + 1,
  })



  );

  const rows = [
  ...jerseyRows,
  ...shortsRows,
  ...compressionRows,
];

  if (rows.length === 0) {
    return;
  }

  const {
    error: sizeError,
  } = await supabase
    .from("product_size_chart")
    .insert(rows);

  if (sizeError) {
    console.error(sizeError);
    throw new Error(sizeError.message);
  }
}


export async function getSizeCharts() {
  const { data, error } = await supabase
    .from("size_charts")
    .select("*")
    .order("created_at", {
      ascending: false,
    });

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export async function getCompleteSizeChart(
  id: number
) {
  return getSizeChartById(id);
}


export async function deleteSizeChart(
  id: number
): Promise<void> {
  const { error } = await supabase
    .from("size_charts")
    .delete()
    .eq("id", id);

  if (error) {
    throw new Error(error.message);
  }
}

export async function getSizeChartById(
  id: number
) {
  const {
    data: chart,
    error: chartError,
  } = await supabase
    .from("size_charts")
    .select("*")
    .eq("id", id)
    .single();

  if (chartError) {
    throw new Error(chartError.message);
  }

  const {
    data: sizes,
    error: sizeError,
  } = await supabase
    .from("product_size_chart")
    .select("*")
    .eq("chart_id", id)
    .order("sort_order", {
      ascending: true,
    });

  if (sizeError) {
    throw new Error(sizeError.message);
  }

  return {
  chart,

  jerseySizes:
    sizes?.filter(
      (item) =>
        item.measurement_type ===
        "jersey"
    ) ?? [],

  shortsSizes:
    sizes?.filter(
      (item) =>
        item.measurement_type ===
        "shorts"
    ) ?? [],

  compressionSizes:
    sizes?.filter(
      (item) =>
        item.measurement_type ===
        "compression"
    ) ?? [],
};
}

export async function updateSizeChart(
  id: number,
  data: SizeChartFormData
): Promise<void> {
  const { error: chartError } = await supabase
    .from("size_charts")
    .update({
      name: data.chartName,
      sport: data.sport,
      description: data.description,
      updated_at: new Date().toISOString(),
    })
    .eq("id", id);

  if (chartError) {
    throw new Error(chartError.message);
  }

  const { error: deleteError } = await supabase
    .from("product_size_chart")
    .delete()
    .eq("chart_id", id);

  if (deleteError) {
    throw new Error(deleteError.message);
  }

  const jerseyRows = data.jerseySizes.map(
    (item, index) => ({
      chart_id: id,
      measurement_type: "jersey",
      size: item.size,
      chest: Number(item.chest),
      waist: null,
      length: Number(item.length),
      sort_order: index + 1,
    })
  );

  const shortsRows = data.shortsSizes.map(
    (item, index) => ({
      chart_id: id,
      measurement_type: "shorts",
      size: item.size,
      chest: null,
      waist: Number(item.waist),
      length: Number(item.length),
      sort_order: index + 1,
    })
  );

  const rows = [...jerseyRows, ...shortsRows];

  console.log("Rows to insert:", rows);

  if (rows.length > 0) {
    const { error: insertError } = await supabase
      .from("product_size_chart")
      .insert(rows);

    if (insertError) {
      throw new Error(insertError.message);
    }
  }
}
export async function deleteMultipleSizeCharts(
  ids: number[]
): Promise<void> {

  const { error } = await supabase
    .from("size_charts")
    .delete()
    .in("id", ids);

  if (error) {
    throw new Error(error.message);
  }
}
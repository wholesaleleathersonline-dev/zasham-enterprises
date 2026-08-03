import { z } from "zod";

const jerseySizeSchema = z.object({
  size: z.string().min(1),
  chest: z.string().min(1),
  length: z.string().min(1),
});

const shortsSizeSchema = z.object({
  size: z.string().min(1),
  waist: z.string().min(1),
  length: z.string().min(1),
});

const compressionSizeSchema = z.object({
  size: z.string().min(1),
  waist: z.string().min(1),
  length: z.string().min(1),
});

export const sizeChartSchema = z.object({
  chartName: z.string().min(2),

  sport: z.string().min(1),

  description: z.string().optional(),

  jerseySizes: z.array(jerseySizeSchema),

  shortsSizes: z.array(shortsSizeSchema),
  compressionSizes: z.array(compressionSizeSchema),
});

export type SizeChartFormData = z.infer<
  typeof sizeChartSchema
>;
"use client";

import { FormProvider } from "react-hook-form";

import { useProductForm } from "../../../hooks/admin/useProductForm";
import { createProduct } from "../../../services/admin/product.service";

import ProductBasicInfo from "./ProductBasicInfo";
import ProductDescription from "./ProductDescription";
import ProductSeo from "./ProductSeo";
import ProductImages from "./ProductImages";

export default function ProductForm(): React.JSX.Element {
  const methods = useProductForm();

  const onSubmit = methods.handleSubmit(
    async (data) => {
      try {
        console.log("Submitting:", data);

        await createProduct(data);

        alert("Product created successfully!");

        methods.reset();
      } catch (error) {
        console.error(error);

        if (error instanceof Error) {
          alert(error.message);
        } else {
          alert("Unknown error");
        }
      }
    },
    (errors) => {
      console.log("VALIDATION ERRORS", errors);
      alert("Validation Failed");
    }
  );

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={onSubmit}
        className="space-y-8"
      >
        <ProductBasicInfo />

        <ProductDescription />

        <ProductSeo />

        <ProductImages />

        <div className="flex flex-col-reverse gap-4 md:flex-row md:justify-end">
          <button
            type="button"
            className="rounded-lg border border-yellow-500/20 bg-[#1A1A1A] px-6 py-3 font-medium text-white transition hover:border-yellow-500"
          >
            Cancel
          </button>

          <button
            type="submit"
            className="rounded-lg bg-yellow-500 px-6 py-3 font-semibold text-black transition hover:bg-yellow-400"
          >
            Save Product
          </button>
        </div>
      </form>
    </FormProvider>
  );
}
"use client";

import { FormProvider } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useState } from "react";

import SuccessModal from "../modals/SuccessModal";
import ErrorModal from "../modals/ErrorModal";

import { useProductForm } from "../../../hooks/admin/useProductForm";
import { createProduct } from "../../../services/admin/product.service";

import ProductBasicInfo from "./ProductBasicInfo";
import ProductDescription from "./ProductDescription";
import ProductSeo from "./ProductSeo";
import ProductImages from "./ProductImages";
import { useEffect } from "react";
import {

  getProductById,
  updateProduct,
} from "../../../services/admin/product.service";

interface ProductFormProps {
  mode?: "create" | "edit";
  productId?: number;
}

export default function ProductForm({
  mode = "create",
  productId,
  
}: ProductFormProps): React.JSX.Element {
  const methods = useProductForm();
  const router = useRouter();
  const [successOpen, setSuccessOpen] =
  useState(false);

const [errorOpen, setErrorOpen] =
  useState(false);

const [successMessage, setSuccessMessage] =
  useState("");

const [errorMessage, setErrorMessage] =
  useState("");
  
  useEffect(() => {
if (mode !== "edit" || productId === undefined) {
  return;
}

const currentProductId = productId;

async function loadProduct() {
  try {
    const { product, gallery } =
      await getProductById(currentProductId);
      methods.reset({
        name: product.name,
        slug: product.slug,
        sport: product.sport,
        category: product.category,
        ageGroup: product.age_group,
        uniformType: product.uniform_type,
        price: product.price,
        moq: product.moq,
        status: product.status,
        shortDescription: product.short_description ?? "",
        description: product.description ?? "",
        seoTitle: product.seo_title ?? "",
        seoDescription: product.seo_description ?? "",
        isFeatured: product.is_featured,
        image: product.image ?? "",
        galleryImages: gallery.map(
          (item) => item.image_url
        ),
      });
    } catch (error) {
      console.error(error);

      alert("Failed to load product.");
    }
  }

  void loadProduct();
}, [mode, productId, methods]);





  
  const onSubmit = methods.handleSubmit(
    async (data) => {
      try {
        console.log("Submitting:", data);

        if (mode === "edit") {
  if (!productId) {
    throw new Error("Product ID is missing.");
  }

  await updateProduct(productId, data);

  setSuccessMessage(
  "Product updated successfully."
);

setSuccessOpen(true);
} else {
  await createProduct(data);

 
}


       setSuccessMessage(
  "Product created successfully."
);

setSuccessOpen(true);

        if (mode === "create") {
  methods.reset();
}
      } catch (error) {
        console.error(error);

        if (error instanceof Error) {
          setErrorMessage(error.message);

setErrorOpen(true);
        } else {
          setErrorMessage("Unknown error");

setErrorOpen(true);
        }
      }
    },
    (errors) => {
      console.log("VALIDATION ERRORS", errors);
      setErrorMessage(
  "Please fix all validation errors before submitting."
);

setErrorOpen(true);
    }
  );

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={onSubmit}
        className="mx-auto max-w-7xl space-y-5"
      >
        <ProductBasicInfo />

        <div className="grid gap-5 xl:grid-cols-2">
          <ProductDescription />

          <div className="space-y-5">
            <ProductSeo />
            <ProductImages />
          </div>
        </div>

        <div className="sticky bottom-0 flex flex-col-reverse gap-3 rounded-xl border border-yellow-500/20 bg-[#111111]/95 p-4 backdrop-blur md:flex-row md:justify-end">
          <button
            type="button"
            className="rounded-lg border border-yellow-500/20 bg-[#1A1A1A] px-5 py-2.5 text-sm font-medium text-white transition hover:border-yellow-500"
          >
            Cancel
          </button>

          <button
            type="submit"
            className="rounded-lg bg-yellow-500 px-5 py-2.5 text-sm font-semibold text-black transition hover:bg-yellow-400"
          >
            Save Product
          </button>
        </div>
      </form>


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






    </FormProvider>
  );
}
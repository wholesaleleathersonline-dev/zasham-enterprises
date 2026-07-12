import ProductForm from "../../../../../components/admin/products/ProductForm";

export default function AddProductPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-white">
          Add Product
        </h1>

        <p className="mt-2 text-gray-400">
          Create a new sportswear product.
        </p>
      </div>

      <ProductForm />
    </div>
  );
}
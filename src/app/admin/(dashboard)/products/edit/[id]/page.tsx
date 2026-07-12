import ProductForm from "../../../../../../components/admin/products/ProductForm";

type EditProductPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function EditProductPage({
  params,
}: EditProductPageProps): Promise<React.JSX.Element> {
  const { id } = await params;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white">
          Edit Product
        </h1>

        <p className="mt-2 text-gray-400">
          Editing Product ID: {id}
        </p>
      </div>

      <ProductForm
  mode="edit"
  productId={Number(id)}
/>
    </div>
  );
}
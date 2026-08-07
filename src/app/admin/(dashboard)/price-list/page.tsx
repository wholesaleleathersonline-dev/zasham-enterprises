"use client";

import { useEffect, useState } from "react";
import {
  getPriceList,
  type PriceListItem,
} from "../../../../services/admin/price-list.service";

import PriceListModal, {
  PriceListFormData,
} from "../../../../components/admin/price-list/PriceListModal";

import {
  createPriceItem,
  updatePriceItem,
  deletePriceItem,
} from "../../../../services/admin/price-list.service";

import DeletePriceItemModal from "../../../../components/admin/price-list/DeletePriceItemModal";

export default function PriceListPage(): React.JSX.Element {
  const [items, setItems] = useState<PriceListItem[]>([]);
  const [isDeleteOpen, setIsDeleteOpen] =
  useState(false);

const [deleteLoading, setDeleteLoading] =
  useState(false);

const [selectedDeleteItem, setSelectedDeleteItem] =
  useState<PriceListItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] =
  useState(false);

const [modalMode, setModalMode] =
  useState<"create" | "edit">("create");

const [selectedItem, setSelectedItem] =
  useState<PriceListFormData | null>(null);

  useEffect(() => {
    loadPriceList();
  }, []);

  async function loadPriceList() {
    try {
      const data = await getPriceList();
      setItems(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

async function handleSaveItem(
  data: PriceListFormData
) {
  try {
    if (modalMode === "create") {

     await createPriceItem({
  section: data.section,
  item_name: data.item_name,
  price: data.price,
  moq: data.moq,
  display_order: data.display_order,
  status: data.status,
});

    } else {

      const currentItem = items.find(
        (item) =>
          item.item_name === selectedItem?.item_name &&
          item.section === selectedItem?.section
      );

      if (!currentItem) return;

    await updatePriceItem(currentItem.id, {
  section: data.section,
  item_name: data.item_name,
  price: data.price,
  moq: data.moq,
  display_order: data.display_order,
  status: data.status,
});

    }

    await loadPriceList();

    setIsModalOpen(false);

  } catch (error) {
    console.error(error);
  }
}

async function handleDeleteItem() {

  if (!selectedDeleteItem) return;

  try {

    setDeleteLoading(true);

    await deletePriceItem(selectedDeleteItem.id);

    await loadPriceList();

    setIsDeleteOpen(false);

    setSelectedDeleteItem(null);

  } catch (error) {

    console.error(error);

  } finally {

    setDeleteLoading(false);

  }

}
  return (
    <section className="space-y-8">

      {/* Header */}

      <div className="flex items-center justify-between">

        <div>
          <h1 className="text-3xl font-bold text-white">
            Price List
          </h1>

          <p className="mt-2 text-gray-400">
            Manage pricing shown on your website.
          </p>
        </div>

      <button
  onClick={() => {
    setSelectedItem(null);
    setModalMode("create");
    setIsModalOpen(true);
  }}
  className="rounded-xl bg-yellow-500 px-5 py-3 font-semibold text-black transition hover:bg-yellow-400"
>
  + Add Item
</button>

      </div>

      {/* Table */}

      <div className="overflow-hidden rounded-2xl border border-yellow-500/20 bg-[#161616]">

        <table className="w-full">

          <thead className="bg-[#1F1F1F]">

            <tr className="text-left text-yellow-500">

              <th className="px-6 py-4">
                Section
              </th>

              <th className="px-6 py-4">
                Item
              </th>

              <th className="px-6 py-4">
  MOQ
</th>

              <th className="px-6 py-4">
                Price
              </th>

              <th className="px-6 py-4">
                Order
              </th>

              <th className="px-6 py-4">
                Status
              </th>

              <th className="px-6 py-4">
                Actions
              </th>

            </tr>

          </thead>

          <tbody>

            {loading && (

              <tr>

                <td
                  colSpan={7}
                  className="py-10 text-center text-gray-400"
                >
                  Loading...
                </td>

              </tr>

            )}

            {!loading && items.length === 0 && (

              <tr>

                <td
                  colSpan={7}
                  className="py-10 text-center text-gray-400"
                >
                  No price list items found.
                </td>

              </tr>

            )}

            {items.map((item) => (

              <tr
                key={item.id}
                className="border-t border-yellow-500/10"
              >

                <td className="px-6 py-5 text-white">
                  {item.section}
                </td>

                <td className="px-6 py-5 text-white">
                  {item.item_name}
                </td>

                <td className="px-6 py-5 text-white">
  {item.moq}
</td>

                <td className="px-6 py-5 font-semibold text-yellow-500">
                  {item.price}
                </td>

                <td className="px-6 py-5 text-white">
                  {item.display_order}
                </td>

                <td className="px-6 py-5">

                  {item.status ? (
                    <span className="rounded-full bg-green-500/20 px-3 py-1 text-xs text-green-400">
                      Active
                    </span>
                  ) : (
                    <span className="rounded-full bg-red-500/20 px-3 py-1 text-xs text-red-400">
                      Disabled
                    </span>
                  )}

                </td>

                <td className="px-6 py-5">

                  <button
  onClick={() => {
   setSelectedItem({
  section: item.section,
  item_name: item.item_name,
  price: item.price,
  moq: item.moq,
  display_order: item.display_order,
  status: item.status,
});

    setModalMode("edit");

    setIsModalOpen(true);
  }}
  className="text-yellow-500 hover:text-yellow-300"
>
  Edit
</button>

<button
  onClick={() => {
    setSelectedDeleteItem(item);
    setIsDeleteOpen(true);
  }}
  className="ml-4 text-red-500 hover:text-red-400"
>
  Delete
</button>
                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

      <PriceListModal
  isOpen={isModalOpen}
  onClose={() => setIsModalOpen(false)}
  onSave={handleSaveItem}
  initialData={selectedItem}
  mode={modalMode}
/>

<DeletePriceItemModal
  isOpen={isDeleteOpen}
  itemName={selectedDeleteItem?.item_name ?? ""}
  loading={deleteLoading}
  onClose={() => {
    setIsDeleteOpen(false);
    setSelectedDeleteItem(null);
  }}
  onDelete={handleDeleteItem}
/>


    </section>
  );
}
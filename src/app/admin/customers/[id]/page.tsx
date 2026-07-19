"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

import CustomerForm from "../../../../components/admin/customer/CustomerForm";
import { getCustomerById } from "../../../../services/customer.service";
import { Customer } from "../../../../types/customer";

export default function EditCustomerPage() {
  const { id } = useParams<{ id: string }>();

  const [customer, setCustomer] = useState<Customer | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadCustomer() {
      try {
        const data = await getCustomerById(id);
        setCustomer(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    if (id) {
      loadCustomer();
    }
  }, [id]);

  if (loading) {
    return (
      <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-8 text-center text-zinc-400">
        Loading customer...
      </div>
    );
  }

  if (!customer) {
    return (
      <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-8 text-center text-red-400">
        Customer not found.
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white">
          Edit Customer
        </h1>

        <p className="text-zinc-400">
          Update customer information.
        </p>
      </div>

      <CustomerForm
        initialData={customer}
        isEdit
      />
    </div>
  );
}
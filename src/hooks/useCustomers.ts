import { useEffect, useState } from "react";
import {
  getCustomers,
  deleteCustomer,
} from "../services/customer.service";
import { Customer } from "../types/customer";

export function useCustomers() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  const loadCustomers = async () => {
    try {
      setLoading(true);

      const data = await getCustomers();

      setCustomers(data ?? []);
    } catch (error) {
      console.error("LOAD CUSTOMERS ERROR:", error);
    } finally {
      setLoading(false);
    }
  };

  const removeCustomer = async (id: string) => {
    if (!confirm("Delete this customer?")) return;

    try {
      await deleteCustomer(id);

      setCustomers((prev) =>
        prev.filter((customer) => customer.id !== id)
      );
    } catch (error) {
      console.error("DELETE CUSTOMER ERROR:", error);
    }
  };

  useEffect(() => {
    loadCustomers();
  }, []);

  return {
    customers,
    loading,
    search,
    setSearch,
    loadCustomers,
    removeCustomer,
  };
}
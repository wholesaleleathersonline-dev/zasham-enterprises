import { useCallback, useEffect, useState } from "react";
import { InvoiceListItem } from "../types/invoice";
import {
  getInvoices,
  deleteInvoice,
  searchInvoices,
} from "../services/invoice.service";

export function useInvoices() {
  const [invoices, setInvoices] = useState<InvoiceListItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  const loadInvoices = useCallback(async () => {
    try {
      setLoading(true);

      const data = search.trim()
        ? await searchInvoices(search)
        : await getInvoices();

      setInvoices(data ?? []);
    } catch (error) {
      console.error("Failed to load invoices:", error);
    } finally {
      setLoading(false);
    }
  }, [search]);

  useEffect(() => {
    loadInvoices();
  }, [loadInvoices]);

  const removeInvoice = async (id: string) => {
    try {
      await deleteInvoice(id);
      await loadInvoices();
    } catch (error) {
      console.error("Failed to delete invoice:", error);
      throw error;
    }
  };

  return {
    invoices,
    loading,
    search,
    setSearch,
    loadInvoices,
    removeInvoice,
  };
}
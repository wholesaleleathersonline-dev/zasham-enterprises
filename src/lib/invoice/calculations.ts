import { InvoiceItem } from "../../types/invoice";

export const calculateItemTotal = (
  quantity: number,
  unitPrice: number
) => {
  return quantity * unitPrice;
};

export const calculateSubtotal = (
  items: InvoiceItem[]
) => {
  return items.reduce(
    (sum, item) => sum + item.total,
    0
  );
};

export const calculateGrandTotal = (
  subtotal: number,
  shipping: number,
  discount: number
) => {
  return subtotal + shipping - discount;
};
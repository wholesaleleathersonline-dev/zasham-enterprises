  import { InvoiceStatus } from "../../../types/invoice";

  interface InvoiceStatusBadgeProps {
    status: InvoiceStatus;
  }

  export default function InvoiceStatusBadge({
    status,
  }: InvoiceStatusBadgeProps) {
    const styles = {
      Draft: "bg-gray-500/20 text-gray-300",
      Sent: "bg-blue-500/20 text-blue-300",
      Paid: "bg-green-500/20 text-green-300",
      Unpaid: "bg-red-500/20 text-red-300",
    };

    return (
      <span
        className={`rounded-full px-3 py-1 text-xs font-medium ${
          styles[status]
        }`}
      >
        {status}
      </span>
    );
  }
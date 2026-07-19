interface InvoiceFiltersProps {
  search: string;
  onSearchChange: (value: string) => void;
}

export default function InvoiceFilters({
  search,
  onSearchChange,
}: InvoiceFiltersProps) {
  return (
    <div className="flex flex-col gap-4 rounded-xl border border-zinc-800 bg-zinc-900 p-4 md:flex-row md:items-center md:justify-between">
      <input
        type="text"
        placeholder="Search invoice, customer or company..."
        value={search}
        onChange={(e) => onSearchChange(e.target.value)}
        className="w-full rounded-lg border border-zinc-700 bg-zinc-950 px-4 py-2 text-sm outline-none focus:border-yellow-500"
      />

      <select className="rounded-lg border border-zinc-700 bg-zinc-950 px-4 py-2 text-sm outline-none focus:border-yellow-500">
        <option value="">All Status</option>
        <option value="Draft">Draft</option>
        <option value="Sent">Sent</option>
        <option value="Paid">Paid</option>
        <option value="Unpaid">Unpaid</option>
      </select>
    </div>
  );
}
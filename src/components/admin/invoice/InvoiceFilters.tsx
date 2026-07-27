interface InvoiceFiltersProps {
  search: string;
  onSearchChange: (value: string) => void;
}

export default function InvoiceFilters({
  search,
  onSearchChange,
}: InvoiceFiltersProps) {
  return (
    <div className="flex flex-col gap-4 rounded-xl border border-yellow-500/20 bg-[#1A1A1A] p-4 md:flex-row md:items-center md:justify-between">
      <input
        type="text"
        placeholder="Search invoice, customer or company..."
        value={search}
        onChange={(e) => onSearchChange(e.target.value)}
        className="w-full rounded-xl border border-yellow-500/20 bg-[#1A1A1A] px-4 py-3 text-sm text-white placeholder:text-gray-500 outline-none transition focus:border-yellow-500"
      />

      <select className="rounded-xl border border-yellow-500/20 bg-[#1A1A1A] px-4 py-3 text-sm text-white outline-none transition focus:border-yellow-500">
        <option value="">All Status</option>
        <option value="Draft">Draft</option>
        <option value="Sent">Sent</option>
        <option value="Paid">Paid</option>
        <option value="Unpaid">Unpaid</option>
      </select>
    </div>
  );
}
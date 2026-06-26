export const InfoRow = ({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ElementType;
  label: string;
  value: string;
}) => (
  <div className="flex items-start gap-3 py-3 border-b border-white/5 last:border-0">
    <div className="mt-0.5 p-2 rounded-lg bg-white/5 shrink-0">
      <Icon size={14} className="text-[#A1A1A1]" />
    </div>
    <div className="min-w-0">
      <p className="text-[#A1A1A1] text-xs mb-0.5">{label}</p>
      <p className="text-white text-sm font-medium break-all">{value}</p>
    </div>
  </div>
);
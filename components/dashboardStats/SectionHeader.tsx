type TSectionHeader = {
  icon: React.ElementType;
  title: string;
};

export const SectionHeader = ({ icon: Icon, title }: TSectionHeader) => (
  <div className="flex items-center gap-2 mb-3">
    <div className="p-2 rounded-xl bg-[rgba(255,107,0,0.13)] shrink-0">
      <Icon size={15} className="text-[#FF6B00]" />
    </div>
    <h3 className="text-white text-sm font-semibold">{title}</h3>
  </div>
);

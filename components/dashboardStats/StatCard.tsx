import { Card } from "../ui/card";

type TStatCard = {
  icon: React.ElementType;
  label: string;
  value: number | string;
  iconBg: string;
  iconColor: string;
};

export const StatCard = ({
  icon: Icon,
  label,
  value,
  iconBg,
  iconColor,
}: TStatCard) => (
  <Card className="bg-[#1A1129] border border-white/10 rounded-2xl p-5 gap-0 flex flex-row items-center">
    <div className={`p-3 rounded-2xl shrink-0 ${iconBg}`}>
      <Icon size={20} className={iconColor} />
    </div>
    <div className="min-w-0">
      <p className="text-[#A1A1A1] text-xs leading-none mb-1">{label}</p>
      <p className="text-white text-2xl font-bold truncate">{value}</p>
    </div>
  </Card>
);

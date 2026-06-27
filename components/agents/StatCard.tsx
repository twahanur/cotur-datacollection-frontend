"use client";

import { Card } from "../ui/card";

type TStatCardProps = {
  icon: React.ElementType;
  label: string;
  value: number;
  iconBg: string;
  iconColor: string;
};
export const StatCard = ({
  icon: Icon,
  label,
  value,
  iconBg,
  iconColor,
}: TStatCardProps) => (
  <Card className="effect p-5 gap-0 flex flex-row items-center">
    <div className={`p-3 rounded-2xl shrink-0 ${iconBg}`}>
      <Icon size={18} className={iconColor} />
    </div>
    <div className="min-w-0">
      <p className="text-[#A1A1A1] text-xs leading-none mb-1">{label}</p>
      <p className="text-white text-2xl font-bold">{value}</p>
    </div>
  </Card>
);

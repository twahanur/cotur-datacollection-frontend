import { TVerificationStatus } from "@/types/customer.types";
import { TRecentData } from "@/types/dashboardStats.types";
import { convertDate } from "@/utills/dateConverter";
import { formatLabel } from "@/utills/formatLabel";
import { Clock, MapPin, Package, Phone } from "lucide-react";

const verificationStyles: Record<TVerificationStatus, string> = {
  VERIFIED: "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20",
  PENDING: "bg-yellow-500/10 text-yellow-400 border border-yellow-500/20",
};

export const RecentRow = ({ item }: { item: TRecentData }) => {
  const { creationDate } = convertDate(new Date(item.collectionDate));
  return (
    <div className="flex flex-col sm:flex-row sm:items-center gap-3 py-3 border-b border-white/5 last:border-0">
      {/* avatar + name */}
      <div className="flex items-center gap-3 min-w-0 flex-1">
        <div className="w-8 h-8 rounded-full bg-linear-to-br from-yellow-600/30 to-orange-600/30 border border-white/10 flex items-center justify-center shrink-0">
          <span className="text-xs font-bold text-white">
            {item.name
              .split(" ")
              .map((n) => n[0])
              .join("")
              .toUpperCase()
              .slice(0, 2)}
          </span>
        </div>
        <div className="min-w-0">
          <p className="text-white text-sm font-medium truncate">{item.name}</p>
          <div className="flex items-center gap-1 text-[#A1A1A1] text-xs">
            <Phone size={10} />
            <span>{item.phoneNumber}</span>
          </div>
        </div>
      </div>

      {/* meta pills */}
      <div className="flex flex-wrap items-center gap-2 shrink-0">
        <div className="flex items-center gap-1 text-[#A1A1A1] text-xs">
          <MapPin size={10} />
          <span>{item.location}</span>
        </div>
        <div className="flex items-center gap-1 text-[#A1A1A1] text-xs">
          <Package size={10} />
          <span className="max-w-[100px] truncate">
            {item.interestedProduct}
          </span>
        </div>
        <span
          className={`text-[10px] font-medium px-2 py-0.5 rounded-full border ${verificationStyles[item.verificationStatus]}`}
        >
          {formatLabel(item.verificationStatus)}
        </span>
        <div className="flex items-center gap-1 text-[#A1A1A1] text-xs">
          <Clock size={10} />
          <span>{creationDate}</span>
        </div>
      </div>
    </div>
  );
};
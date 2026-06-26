import { cn } from "@/lib/utils";

const PageHeader = ({
  title,
  description,
  className,
}: {
  title: string;
  description?: string;
  className?: string;
}) => {
  return (
    <div className={cn("space-y-0", className)}>
      <h1 className="text-2xl font-semibold text-white">{title}</h1>
      {description && (
        <p className="text-[#A1A1A1] text-sm font-normal">{description}</p>
      )}
    </div>
  );
};

export default PageHeader;

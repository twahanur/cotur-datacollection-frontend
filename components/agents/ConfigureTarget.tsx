"use client";

import ButtonComponent from "@/components/ui/ButtonComponent";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import TriggeredButton from "@/components/ui/TriggeredButton";
import { createTarget } from "@/service/target";
import { TAgent } from "@/types/agent.types";
import { TTargetPeriod, TTargetType } from "@/types/target.types";
import { formatLabel } from "@/utills/formatLabel";
import { zodResolver } from "@hookform/resolvers/zod";
import { Plus, Target } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";

// ─── schema — mirrors the backend createTargetSchema ─────────────────────────
const schema = z
  .object({
    type: z.enum(["GLOBAL", "INDIVIDUAL"]),
    agentId: z.string().uuid("Invalid agent ID format").optional(),
    targetCount: z
      .number({ message: "Target count is required" })
      .int("Must be a whole number")
      .positive("Target count must be a positive integer"),
    period: z.enum(["DAILY", "WEEKLY", "MONTHLY", "SPECIFIC_DATE"]),
    specificDate: z.string().optional(),
  })
  .refine((d) => !(d.type === "INDIVIDUAL" && !d.agentId), {
    message: "Agent ID is required when target type is INDIVIDUAL",
    path: ["agentId"],
  })
  .refine((d) => !(d.period === "SPECIFIC_DATE" && !d.specificDate), {
    message: "Specific date is required when period is SPECIFIC_DATE",
    path: ["specificDate"],
  });

type TConfigureTargetForm = z.infer<typeof schema>;

const TARGET_TYPES: TTargetType[] = ["GLOBAL", "INDIVIDUAL"];
const TARGET_PERIODS: TTargetPeriod[] = [
  "DAILY",
  "WEEKLY",
  "MONTHLY",
  "SPECIFIC_DATE",
];

type TConfigureTargetProps = {
  agents: TAgent[];
};

const ConfigureTarget = ({ agents }: TConfigureTargetProps) => {
  const [open, setOpen] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<TConfigureTargetForm>({
    resolver: zodResolver(schema),
    mode: "onChange",
    defaultValues: {
      type: "GLOBAL",
      period: "MONTHLY",
      targetCount: undefined,
      agentId: undefined,
      specificDate: undefined,
    },
  });

  const typeValue = watch("type");
  const periodValue = watch("period");

  const onSubmit = async (data: TConfigureTargetForm) => {
    const payload = {
      type: data.type,
      targetCount: data.targetCount,
      period: data.period,
      ...(data.type === "INDIVIDUAL" && data.agentId
        ? { agentId: data.agentId }
        : {}),
      ...(data.period === "SPECIFIC_DATE" && data.specificDate
        ? { specificDate: new Date(data.specificDate).toISOString() }
        : {}),
    };

    const toastId = toast.loading("Configuring target...");
    try {
      const result = await createTarget(payload);
      if (result?.success) {
        toast.success(result.message ?? "Target configured successfully", {
          id: toastId,
        });
        reset();
        setOpen(false);
      } else {
        toast.error(result?.message ?? "Failed to configure target", {
          id: toastId,
        });
      }
    } catch {
      toast.error("Something went wrong", { id: toastId });
    }
  };

  const handleClose = (isOpen: boolean) => {
    if (!isOpen) reset();
    setOpen(isOpen);
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogTrigger asChild>
        <TriggeredButton name="Add Target" varient="green" />
      </DialogTrigger>

      <DialogContent className="px-2 py-2 lg:px-6 lg:py-4 w-[95vw] sm:w-[40vw] max-w-xl gap-2 effect max-h-screen overflow-y-auto hide-scrollbar">
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogHeader>
            <DialogTitle className="text-xl font-semibold text-white">
              Configure Target
            </DialogTitle>
          </DialogHeader>

          {/* Row 1 — Type & Period */}
          <div className="grid grid-cols-2 gap-2 lg:gap-4">
            {/* Target type */}
            <div>
              <Label className="text-white text-sm">Target Type</Label>
              <Select
                value={typeValue}
                onValueChange={(v) => {
                  setValue("type", v as TTargetType, { shouldValidate: true });
                  // clear agentId when switching away from INDIVIDUAL
                  if (v !== "INDIVIDUAL") setValue("agentId", undefined);
                }}
              >
                <SelectTrigger className="cursor-pointer">
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  {TARGET_TYPES.map((t) => (
                    <SelectItem key={t} value={t} className="cursor-pointer">
                      {formatLabel(t)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <p className="text-red-500 text-xs">{errors.type?.message}</p>
            </div>

            {/* Period */}
            <div>
              <Label className="text-white text-sm">Period</Label>
              <Select
                value={periodValue}
                onValueChange={(v) => {
                  setValue("period", v as TTargetPeriod, {
                    shouldValidate: true,
                  });
                  // clear specificDate when switching away
                  if (v !== "SPECIFIC_DATE")
                    setValue("specificDate", undefined);
                }}
              >
                <SelectTrigger className="cursor-pointer">
                  <SelectValue placeholder="Select period" />
                </SelectTrigger>
                <SelectContent>
                  {TARGET_PERIODS.map((p) => (
                    <SelectItem key={p} value={p} className="cursor-pointer">
                      {p === "SPECIFIC_DATE" ? "Specific Date" : formatLabel(p)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <p className="text-red-500 text-xs">{errors.period?.message}</p>
            </div>

            <div>
              <Label className="text-white text-sm">Target Count</Label>
              <Input
                type="number"
                min={1}
                {...register("targetCount", { valueAsNumber: true })}
                className="bg-transparent"
                placeholder="e.g. 50"
              />
              <p className="text-red-500 text-xs">
                {errors.targetCount?.message}
              </p>
            </div>

            {/* Agent select — only when INDIVIDUAL */}
            {typeValue === "INDIVIDUAL" && (
              <div>
                <Label className="text-white text-sm">Select Agent</Label>
                <Select
                  value={watch("agentId") ?? ""}
                  onValueChange={(v) =>
                    setValue("agentId", v, { shouldValidate: true })
                  }
                >
                  <SelectTrigger className="cursor-pointer">
                    <SelectValue placeholder="Choose an agent" />
                  </SelectTrigger>
                  <SelectContent>
                    {agents.length === 0 ? (
                      <SelectItem value="__none" disabled>
                        No agents available
                      </SelectItem>
                    ) : (
                      agents.map((agent) => (
                        <SelectItem
                          key={agent.id}
                          value={agent.id}
                          className="cursor-pointer"
                        >
                          {agent.fullName}
                        </SelectItem>
                      ))
                    )}
                  </SelectContent>
                </Select>
                <p className="text-red-500 text-xs">
                  {errors.agentId?.message}
                </p>
              </div>
            )}

            {periodValue === "SPECIFIC_DATE" && (
              <div>
                <Label className="text-white text-sm">Specific Date</Label>
                <Input
                  type="datetime-local"
                  {...register("specificDate")}
                  className="bg-transparent"
                />
                <p className="text-red-500 text-xs">
                  {errors.specificDate?.message}
                </p>
              </div>
            )}
          </div>
          <div className="flex items-center justify-end mt-2">
            <ButtonComponent
              icon={Plus}
              type="submit"
              varient="yellow"
              buttonName="Save"
              className="h-10 px-6 rounded-2xl"
              disable={isSubmitting}
            />
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ConfigureTarget;

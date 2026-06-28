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
import TriggeredButton from "@/components/ui/TriggeredButton";
import { createCustomer, sendOtp, updateCustomer } from "@/service/custoemer";
import { TCustomer } from "@/types/customer.types";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle2, Loader2, Plus, Send, SquarePen } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";

const baseSchema = z.object({
  name: z.string().min(1, "Name is required"),
  phoneNumber: z
    .string()
    .min(10, "Phone must be at least 10 characters")
    .regex(/^\+?[0-9]+$/, "Enter a valid phone number"),
  location: z.string().min(1, "Location is required"),
  interestedProduct: z.string().min(1, "Interested product is required"),
});

const createSchema = baseSchema.extend({
  code: z.string().min(1, "OTP code is required"),
});

export type TCreateCustomerForm = z.infer<typeof createSchema>;
export type TUpdateCustomerForm = z.infer<typeof baseSchema>;

type TCreateCustomerProps = {
  customer?: TCustomer;
  path?: string;
  isFrom?: boolean;
};

const CreateCustomer = ({ customer, path, isFrom = false }: TCreateCustomerProps) => {
  const [open, setOpen] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [otpSending, setOtpSending] = useState(false);

  const schema = customer ? baseSchema : createSchema;

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors, isSubmitting, isDirty },
  } = useForm<TCreateCustomerForm>({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    resolver: zodResolver(schema) as any,
    mode: "onChange",
    defaultValues: {
      name: customer?.name || "",
      phoneNumber: customer?.phoneNumber || "",
      location: customer?.location || "",
      interestedProduct: customer?.interestedProduct || "",
      ...(!customer && { code: "" }),
    },
  });

  const phoneValue = watch("phoneNumber");

  const handleSendOtp = () => {
    if (!phoneValue || phoneValue.length < 10) {
      toast.error("Enter a valid phone number first");
      return;
    }
    setOtpSent(true);
    setOtpSending(true);
    sendOtp({ phoneNumber: phoneValue }).then((res) => console.log(res)).finally(() => setOtpSending(false));
  };

  const onSubmit = async (data: TCreateCustomerForm) => {
    if (customer && !isDirty) {
      toast.info("Nothing to update", { duration: 3000 });
      return;
    }
    const toastId = toast.loading(
      customer ? "Updating customer..." : "Creating customer...",
    );
    try {
      const result = customer
        ? await updateCustomer({
            id: customer.id,
            data,
            path: path ? path : "/customers",
          })
        : await createCustomer(data);
      if (result?.success) {
        toast.success(
          result.message ??
            (customer
              ? "Customer updated successfully"
              : "Customer created successfully"),
          { id: toastId },
        );
        reset();
        setOtpSent(false);
        setOpen(false);
      } else {
        toast.error(
          result?.message ??
            (customer
              ? "Failed to update customer"
              : "Failed to create customer"),
          { id: toastId },
        );
      }
    } catch {
      toast.error("Something went wrong", { id: toastId });
    }
  };

  const handleClose = (isOpen: boolean) => {
    if (!isOpen) {
      reset();
      setOtpSent(false);
    }
    setOpen(isOpen);
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogTrigger asChild>
        {customer ? (
          isFrom ? (
            <TriggeredButton name="Update" varient="green" icon={SquarePen} />
          ) : (
            <button className="text-text-secondary cursor-pointer hover:text-white transition-colors">
              <SquarePen size={16} />
            </button>
          )
        ) : (
          <TriggeredButton
            name="Create Customer"
            varient="dark yellow"
            icon={Plus}
          />
        )}
      </DialogTrigger>

      <DialogContent className="px-6 py-4 w-[95vw] sm:w-[40vw] max-w-xl gap-2 bg-[#1A1129] border-white/10 max-h-screen overflow-y-auto hide-scrollbar">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <DialogHeader className="flex flex-row items-center justify-between mt-4">
            <DialogTitle className="text-xl font-semibold text-white">
              {customer ? "Update Customer" : "Create Customer"}
            </DialogTitle>
            <ButtonComponent
              icon={Plus}
              type="submit"
              varient="yellow"
              buttonName="Save"
              className="h-10 px-6 rounded-2xl"
              disable={isSubmitting}
            />
          </DialogHeader>

          {/* Row 1 — Name & Phone */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label className="text-white text-sm">Customer Name</Label>
              <Input
                {...register("name")}
                className="bg-transparent"
                placeholder="e.g. Abul Kalam"
              />
              <p className="text-red-500 text-xs min-h-4">
                {errors.name?.message}
              </p>
            </div>

            <div className="space-y-1.5">
              <Label className="text-white text-sm">Phone Number</Label>
              <Input
                {...register("phoneNumber")}
                className="bg-transparent"
                placeholder="+8801*********"
              />
              <p className="text-red-500 text-xs min-h-4">
                {errors.phoneNumber?.message}
              </p>
            </div>
          </div>

          {/* Row 2 — Location & Interested Product */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label className="text-white text-sm">Location</Label>
              <Input
                {...register("location")}
                className="bg-transparent"
                placeholder="e.g. Dhaka"
              />
              <p className="text-red-500 text-xs min-h-4">
                {errors.location?.message}
              </p>
            </div>

            <div className="space-y-1.5">
              <Label className="text-white text-sm">Interested Product</Label>
              <Input
                {...register("interestedProduct")}
                className="bg-transparent"
                placeholder="e.g. Cotur Premium Plan"
              />
              <p className="text-red-500 text-xs min-h-4">
                {errors.interestedProduct?.message}
              </p>
            </div>
          </div>

          {/* Row 3 — OTP full width (create only) */}
          {!customer && (
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <Label className="text-white text-sm">OTP Code</Label>
                <button
                  type="button"
                  onClick={handleSendOtp}
                  disabled={otpSending}
                  className="flex items-center cursor-pointer gap-1.5 text-xs font-medium transition-colors disabled:cursor-not-allowed"
                >
                  {otpSending ? (
                    <>
                      <Loader2
                        size={13}
                        className="animate-spin text-[#A1A1A1]"
                      />
                      <span className="text-[#A1A1A1]">Sending...</span>
                    </>
                  ) : otpSent ? (
                    <>
                      <CheckCircle2 size={13} className="text-emerald-400" />
                      <span className="text-emerald-400">
                        OTP Sent — Resend
                      </span>
                    </>
                  ) : (
                    <>
                      <Send size={13} className="text-yellow-400" />
                      <span className="text-yellow-400">Send OTP</span>
                    </>
                  )}
                </button>
              </div>

              <div className="relative">
                <Input
                  {...register("code")}
                  className="bg-transparent tracking-[0.35em] font-mono pr-10"
                  placeholder="• • • • • •"
                  maxLength={6}
                />
                {otpSent && !otpSending && (
                  <CheckCircle2
                    size={15}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-emerald-400 pointer-events-none"
                  />
                )}
                {otpSending && (
                  <Loader2
                    size={15}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[#A1A1A1] animate-spin pointer-events-none"
                  />
                )}
              </div>
              <p className="text-red-500 text-xs min-h-4">
                {errors.code?.message}
              </p>
            </div>
          )}
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateCustomer;

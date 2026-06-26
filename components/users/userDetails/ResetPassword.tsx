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
import { resetUserPassword } from "@/service/userService";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff, X } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";

const passwordRules: { label: string; regex: RegExp }[] = [
  { label: "Min 8 characters", regex: /^.{8,}$/ },
  { label: "At least 1 uppercase letter", regex: /[A-Z]/ },
  { label: "At least 1 lowercase letter", regex: /[a-z]/ },
  { label: "At least 1 number", regex: /[0-9]/ },
  { label: "At least 1 special character", regex: /[!@#$%^&*(),.?":{}|<>]/ },
];

const schema = z
  .object({
    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .regex(/[A-Z]/, "Must include at least one uppercase letter")
      .regex(/[a-z]/, "Must include at least one lowercase letter")
      .regex(/[0-9]/, "Must include at least one number")
      .regex(
        /[!@#$%^&*(),.?":{}|<>]/,
        "Must include at least one special character",
      ),
    confirmPassword: z.string({ message: "Please confirm your password" }),
  })
  .refine((d) => d.password === d.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export type TResetForm = z.infer<typeof schema>;

const ResetPassword = ({ userId }: { userId: string }) => {
  const [open, setOpen] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [touched, setTouched] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<TResetForm>({
    resolver: zodResolver(schema),
    mode: "onChange",
  });

  const passwordValue = watch("password");

  const onSubmit = async (data: TResetForm) => {
    const toastId = toast.loading("Resetting password...");
    try {
      const result = await resetUserPassword(data, userId);
      if (result?.success) {
        toast.success(result.message ?? "Password reset successfully", {
          id: toastId,
        });
        reset();
        setOpen(false);
      } else {
        toast.error(result?.message ?? "Failed to reset password", {
          id: toastId,
        });
      }
    } catch {
      toast.error("Something went wrong", { id: toastId });
    }
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(isOpen) => {
        if (!isOpen) {
          reset();
          setTouched(false);
        }
        setOpen(isOpen);
      }}
    >
      <DialogTrigger asChild>
        <TriggeredButton name="Reset Password" varient="dark yellow" />
      </DialogTrigger>

      <DialogContent className="px-6 py-4 w-[20vw] max-w-150 gap-2 effect">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <DialogHeader className="flex flex-row items-center justify-between mt-4">
            <DialogTitle className="text-xl font-semibold text-white">
              Reset Password
            </DialogTitle>
            <ButtonComponent
              type="submit"
              varient="yellow"
              buttonName="Save"
              className="h-10 px-6 rounded-2xl"
              disable={isSubmitting}
            />
          </DialogHeader>

          <p className="text-[#A1A1A1] text-sm">
            Set a new password for this user. Only the new password will be sent
            to the server.
          </p>

          {/* Password */}
          <div className="space-y-1">
            <Label className="text-white text-sm">New Password</Label>
            <div className="relative">
              <Input
                type={showPassword ? "text" : "password"}
                {...register("password")}
                className="bg-transparent pr-10"
                placeholder="••••••••"
                onFocus={() => setTouched(true)}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#514D6A]"
              >
                {showPassword ? <Eye size={16} /> : <EyeOff size={16} />}
              </button>
            </div>
            {errors.password && (
              <p className="text-red-500 text-xs">{errors.password.message}</p>
            )}
          </div>

          {/* Password rules */}
          {touched && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-1">
              {passwordRules.map((rule) => {
                const passed = rule.regex.test(passwordValue || "");
                return (
                  <div
                    key={rule.label}
                    className="flex items-center gap-1.5 text-xs"
                  >
                    {passed ? (
                      <span className="text-emerald-500">✓</span>
                    ) : (
                      <X size={12} className="text-red-500 shrink-0" />
                    )}
                    <span
                      className={passed ? "text-emerald-500" : "text-[#514D6A]"}
                    >
                      {rule.label}
                    </span>
                  </div>
                );
              })}
            </div>
          )}

          {/* Confirm Password */}
          <div className="space-y-1">
            <Label className="text-white text-sm">Confirm Password</Label>
            <div className="relative">
              <Input
                type={showConfirm ? "text" : "password"}
                {...register("confirmPassword")}
                className="bg-transparent pr-10"
                placeholder="••••••••"
              />
              <button
                type="button"
                onClick={() => setShowConfirm(!showConfirm)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#514D6A]"
              >
                {showConfirm ? <Eye size={16} /> : <EyeOff size={16} />}
              </button>
            </div>
            {errors.confirmPassword && (
              <p className="text-red-500 text-xs">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ResetPassword;

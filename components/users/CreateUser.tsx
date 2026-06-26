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
import { createUser, updateUser } from "@/service/userService";
import { TRole, TStatus, TUser } from "@/types/user.types";
import { formatLabel } from "@/utills/formatLabel";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff, Plus, SquarePen, X } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";

const baseSchema = z.object({
  fullName: z.string().min(1, "Name must be at least 1 character."),
  email: z
    .string({ message: "Email is required" })
    .email({ message: "Enter a valid email address" }),
  phoneNumber: z
    .string({ message: "Phone is required" })
    .min(10, "Phone must be at least 10 characters."),
  role: z.enum(["SUPER_ADMIN", "ADMIN", "AGENT"]),
  status: z.enum(["ACTIVE", "DISABLED"]),
});

const createSchema = baseSchema.extend({
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
});

const getFormSchema = (hasUser: boolean) =>
  hasUser ? baseSchema : createSchema;

export const passwordRules: { label: string; regex: RegExp }[] = [
  { label: "Min 8 characters", regex: /^.{8,}$/ },
  { label: "At least 1 uppercase letter", regex: /[A-Z]/ },
  { label: "At least 1 lowercase letter", regex: /[a-z]/ },
  { label: "At least 1 number", regex: /[0-9]/ },
  { label: "At least 1 special character", regex: /[!@#$%^&*(),.?":{}|<>]/ },
];

type TUpdateUserForm = z.infer<typeof baseSchema>;
export type TUserForm = TUpdateUserForm & { password?: string };

type TCreateUserProps = {
  user?: TUser;
  isFrom?: boolean;
  path?: string;
};

const CreateUser = ({ user, isFrom = false, path }: TCreateUserProps) => {
  const formSchema = getFormSchema(!!user);
  const [open, setOpen] = useState(false);
  const [visible, setVisible] = useState(false);
  const [touched, setTouched] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors, isSubmitting, isDirty },
  } = useForm<TUserForm>({
    resolver: zodResolver(formSchema),
    mode: "onChange",
    defaultValues: {
      fullName: user?.fullName || "",
      email: user?.email || "",
      phoneNumber: user?.phoneNumber || "",
      role: user?.role || "AGENT",
      status: user?.status || "ACTIVE",
    },
  });

  const passwordValue = watch("password");

  const onSubmit = async (data: TUserForm) => {
    if (user && !isDirty) {
      toast.info("Nothing to update", { duration: 3000 });
      return;
    }
    const toastId = toast.loading(
      user ? "Updating user..." : "Creating user...",
    );
    try {
      let result;
      if (user) {
        result = await updateUser({
          id: user.id,
          data,
          path: path ? path : "/users",
        });
      } else {
        result = await createUser(data);
      }
      if (result?.success) {
        toast.success(result.message, { id: toastId });
        reset();
        setOpen(false);
      } else {
        toast.error(result?.message, { id: toastId });
      }
    } catch (err) {
      console.log(err);
      toast.error("Something went wrong", { id: toastId });
    }
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(isOpen) => {
        if (!isOpen) reset();
        setOpen(isOpen);
      }}
    >
      <DialogTrigger asChild>
        {user ? (
          isFrom ? (
            <TriggeredButton name="Update" varient="green" icon={SquarePen} />
          ) : (
            <button className="text-text-secondary cursor-pointer">
              <SquarePen size={16} />
            </button>
          )
        ) : (
          <TriggeredButton
            name="Create User"
            varient="dark yellow"
            icon={Plus}
          />
        )}
      </DialogTrigger>

      <DialogContent className="px-6 py-4 w-[40vw] max-w-150 gap-2 effect max-h-screen overflow-y-auto hide-scrollbar">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <DialogHeader className="flex flex-row items-center justify-between mt-4">
            <DialogTitle className="text-xl font-semibold text-white">
              {user ? "Update User" : "Create A New User"}
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

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label className="text-white text-sm">Name</Label>
              <Input
                {...register("fullName")}
                className="bg-transparent"
                placeholder="Enter name"
              />
              <p className="text-red-500 text-xs">{errors.fullName?.message}</p>
            </div>

            <div>
              <Label className="text-white text-sm">Email</Label>
              <Input
                {...register("email")}
                className="bg-transparent"
                placeholder="Enter email"
              />
              <p className="text-red-500 text-xs">{errors.email?.message}</p>
            </div>

            <div>
              <Label className="text-white text-sm">Phone</Label>
              <Input
                {...register("phoneNumber")}
                className="bg-transparent"
                placeholder="017********"
              />
              <p className="text-red-500 text-xs">
                {errors.phoneNumber?.message}
              </p>
            </div>

            {!user && (
              <div>
                <div className="relative">
                  <Label className="text-white text-sm">Password</Label>
                  <Input
                    type={visible ? "text" : "password"}
                    {...register("password")}
                    className="bg-transparent"
                    placeholder="********"
                    onBlur={() => setTouched(true)}
                  />
                  <button
                    type="button"
                    onClick={() => setVisible(!visible)}
                    className="absolute right-3 top-2/3 -translate-y-1/2 text-[#514D6A]"
                  >
                    {visible ? <Eye size={18} /> : <EyeOff size={18} />}
                  </button>
                  {errors.password && (
                    <p className="text-red-500 text-xs">
                      {errors.password.message}
                    </p>
                  )}
                </div>
                {touched && (
                  <div className="space-y-1 mt-2">
                    {passwordRules.map((rule) => {
                      const passed = rule.regex.test(passwordValue || "");
                      return (
                        <div
                          key={rule.label}
                          className="flex items-center gap-2 text-sm"
                        >
                          {passed ? (
                            <span className="text-green-500">✓</span>
                          ) : (
                            <X size={14} className="text-red-600" />
                          )}
                          <span
                            className={
                              passed ? "text-green-500" : "text-[#514D6A]"
                            }
                          >
                            {rule.label}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            )}

            <div className="space-y-2">
              <Label className="text-white text-sm">Status</Label>
              <Select
                value={watch("status")}
                onValueChange={(value) =>
                  setValue("status", value as TStatus, { shouldDirty: true })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select Status" />
                </SelectTrigger>
                <SelectContent>
                  {(["ACTIVE", "DISABLED"] as TStatus[]).map((item) => (
                    <SelectItem key={item} value={item}>
                      {formatLabel(item)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <p className="text-red-500 text-xs">{errors.status?.message}</p>
            </div>

            <div className="space-y-2">
              <Label className="text-white text-sm">Role</Label>
              <Select
                value={watch("role")}
                onValueChange={(value) =>
                  setValue("role", value as TRole, { shouldDirty: true })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select Role" />
                </SelectTrigger>
                <SelectContent>
                  {(["SUPER_ADMIN", "ADMIN", "AGENT"] as TRole[]).map(
                    (item) => (
                      <SelectItem key={item} value={item}>
                        {formatLabel(item)}
                      </SelectItem>
                    ),
                  )}
                </SelectContent>
              </Select>
              <p className="text-red-500 text-xs">{errors.role?.message}</p>
            </div>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateUser;

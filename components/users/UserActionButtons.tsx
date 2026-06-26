/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import ConfirmComponent, { TOnChangeProps } from "@/components/ui/ConfirmModal";
import { Eye, Trash2 } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";
import CreateUser from "./CreateUser";
import { TUser } from "@/types/user.types";
import { deleteUser } from "@/service/userService";

type TUserActionButtonProps = {
  user: TUser;
};

const UserActionButtons = ({ user }: TUserActionButtonProps) => {


  const handleDeleteUser = async ({
    id,
    setOpen,
    setLoading,
  }: TOnChangeProps) => {
    setLoading(true);
    const toastId = toast.loading("Deleting Role...");
    try {
      const result = await deleteUser(id);
      if (result?.success) {
        toast.success(result?.message, { id: toastId });
        setOpen(false);
        setLoading(false);
      } else {
        toast.error(result?.message, { id: toastId });
      }
    } catch (error: any) {
      console.error(error);
      toast.error("Something went wrong", { id: toastId });
    }
  };


  return (
    <div className="flex items-center justify-center gap-3 w-full">
      <Link
        href={`/users/${user?.id}`}
        className="flex items-center justify-center"
      >
        <button className="text-text-secondary cursor-pointer">
          <Eye size={18} />
        </button>
      </Link>
      <CreateUser user={user} />

      <ConfirmComponent
        onChange={handleDeleteUser}
        id={user?.id.toString()}
        title="Want to Delete this user?"
        description="If you want to delete this user, all the data of this user will be removed parmanantly. And this action can`t be undone"
      >
        <button className="text-red-600 cursor-pointer">
          <Trash2 size={16} />
        </button>
      </ConfirmComponent>
    </div>
  );
};

export default UserActionButtons;

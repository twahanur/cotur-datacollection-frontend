"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Camera } from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

type TImageUpload = {
  handleChange: (imageFile: File) => Promise<void>;
  image?: string;
  clasName?: string;
  height?: number;
  width?: number;
  cameraClass?: string;
};

const ImageUploader = ({
  handleChange,
  image,
  clasName = "h-36 w-36 rounded-full shadow-md",
  height = 500,
  width = 500,
  cameraClass = "w-8 h-8",
}: TImageUpload) => {
  const [hovered, setHovered] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const MAX_FILE_SIZE = 200 * 1024;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > MAX_FILE_SIZE) {
        toast.error("image can`t be more that 200 kilobytes");
        return;
      } else {
        handleChange(file);
      }
    }
    return;
  };

  return (
    <div
      className="relative rounded-full "
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => {
        setHovered(false);
      }}
    >
      <Image
        src={
          image ??
          "https://images.unsplash.com/photo-1676195470090-7c90bf539b3b?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=687"
        }
        alt="Agent Avatar"
        width={width}
        height={height}
        className={cn(" object-cover ", clasName)}
      />
      <input
        type="file"
        accept="image/*"
        className="hidden"
        ref={fileInputRef}
        onChange={(e) => handleFileChange(e)}
      />
      <AnimatePresence>
        {hovered && (
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            whileHover={{ scale: 1 }}
            className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-full text-yellow-400 transition cursor-pointer"
            onClick={() => fileInputRef.current?.click()}
          >
            <Camera className={cameraClass} />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ImageUploader;

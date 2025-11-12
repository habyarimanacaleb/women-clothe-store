
"use client";

import { useState } from "react";
import { CldUploadWidget } from "next-cloudinary";
import Image from "next/image";
import { X } from "lucide-react";

interface GalleryUploadProps {
  folder?: string;
  onChange?: (images: string[]) => void;
}

export default function GalleryUpload({ folder = "products", onChange }: GalleryUploadProps) {
  const [images, setImages] = useState<string[]>([]);

  const handleUpload = (result: any) => {
    const url = result.info.secure_url;
    const updated = [...images, url];
    setImages(updated);
    onChange?.(updated); // pass to parent
  };

  const removeImage = (url: string) => {
    const updated = images.filter((img) => img !== url);
    setImages(updated);
    onChange?.(updated);
  };

  return (
    <div className="w-full bg-white rounded-xl shadow p-4 space-y-4">
      <CldUploadWidget
        uploadPreset="ml_default"
        options={{ folder, multiple: true }}
        onUpload={handleUpload}
      >
        {({ open }) => (
          <button
            type="button"
            onClick={() => open()}
            className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition"
          >
            + Add Gallery Images
          </button>
        )}
      </CldUploadWidget>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {images.map((url, i) => (
          <div key={i} className="relative group">
            <Image
              src={url}
              alt={`image-${i}`}
              width={150}
              height={150}
              className="rounded-lg object-cover w-full h-36"
            />
            <button
              onClick={() => removeImage(url)}
              className="absolute top-1 right-1 bg-black/60 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition"
            >
              <X size={14} />
            </button>
          </div>
        ))}
      </div>

      {images.length === 0 && (
        <p className="text-gray-500 text-center italic">No gallery images yet</p>
      )}
    </div>
  );
}

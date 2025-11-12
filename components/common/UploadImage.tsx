"use client";

import { CldUploadWidget } from "next-cloudinary";
import Image from "next/image";
import { useState, useEffect } from "react";

interface UploadImageProps {
  onUpload: (url: string) => void;
  initialImage?: string;
}

export default function UploadImage({ onUpload, initialImage }: UploadImageProps) {
  const [imageUrl, setImageUrl] = useState<string | null>(initialImage || null);

  useEffect(() => {
    // If parent provides initialImage (editing), set it
    if (initialImage) setImageUrl(initialImage);
  }, [initialImage]);

  const handleUpload = (result: any) => {
    const url = result.info.secure_url;
    setImageUrl(url);
    onUpload(url); // notify parent
  };

  return (
    <div className="flex flex-col items-center gap-4 p-4 bg-gray-50 rounded-xl shadow">
      <CldUploadWidget
        uploadPreset="ml_default"
        options={{ folder: "myshop/categories" }}
        onUpload={handleUpload}
      >
        {({ open }) => (
          <button
            onClick={() => open()}
            className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
          >
            {imageUrl ? "Change Image" : "Upload Image"}
          </button>
        )}
      </CldUploadWidget>

      {imageUrl && (
        <div className="relative w-60 h-60 mt-4">
          <Image
            src={imageUrl}
            alt="Uploaded"
            fill
            className="object-cover rounded-xl"
          />
        </div>
      )}
    </div>
  );
}

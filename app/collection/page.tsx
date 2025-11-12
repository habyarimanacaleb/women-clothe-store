"use client";

import { Suspense } from "react";
import CollectionContent from "@/components/common/CollectionContent";

export default function CollectionPage() {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center h-screen space-x-2 text-gray-500">
          <div className="w-8 h-8 animate-spin rounded-full border-2 border-t-transparent border-purple-900"></div>
          <span>Loading collection...</span>
        </div>
      }
    >
      <CollectionContent />
    </Suspense>
  );
}

"use client";

import React from "react";
import Masonry from "react-masonry-css";
import { Skeleton } from "@/components/ui/skeleton";

export function MasonrySkeleton() {
  const breakpointColumnsObj = {
    default: 4,
    1100: 3,
    700: 2,
    500: 2
  };

  // Create a list of different heights to mimic the masonry look
  const skeletonHeights = [
    "h-[250px]", "h-[400px]", "h-[300px]", "h-[450px]", 
    "h-[350px]", "h-[200px]", "h-[400px]", "h-[320px]"
  ];

  return (
    <div className="p-4 md:p-8">
      <Masonry
        breakpointCols={breakpointColumnsObj}
        className="my-masonry-grid"
        columnClassName="my-masonry-grid_column"
      >
        {skeletonHeights.map((height, index) => (
          <div key={index} className="mb-5">
            <Skeleton className={`w-full ${height} rounded-3xl bg-zinc-200 dark:bg-zinc-800`} />
            {/* Optional: Add small skeletons for the title/text below */}
            <div className="mt-3 space-y-2 px-2">
              <Skeleton className="h-4 w-2/3 bg-zinc-200 dark:bg-zinc-800" />
            </div>
          </div>
        ))}
      </Masonry>
    </div>
  );
}
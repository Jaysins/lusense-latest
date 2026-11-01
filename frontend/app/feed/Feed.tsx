"use client";

import Link from "next/link";
import { items } from "@/app/components/utils";
import { PinCard } from "../components/analyse-sense/PinCard";

export default function Feed() {
  return (
    <div className="list mx-5 mb-2">
      {items.map((item) => (
        <PinCard key={item.id} item={item} />
      ))}
    </div>
  );
}

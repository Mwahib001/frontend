"use client";

import { useState } from "react";
import CategoryNav from "@/components/ui/catogaryNav";
import CategorySection from "@/components/ui/catogarySection";

// Simulate the API response you provided
const res = await fetch("http://localhost:1337/api/catogaries?populate[items][populate]=image");
const data = await res.json();
const baseUrl = "http://localhost:1337";

export default function Home() {
  const [selectedItem, setSelectedItem] = useState<any>(null);

  return (
    <section className="text-black-500 body-font bg-black">
      <div>
        <CategoryNav categories={data.data} />
      </div>

      <div className="container py-8 mx-auto">
        {data.data.map((cat: any, idx: number) => (
          <CategorySection
            key={cat.id}
            category={cat}
            baseUrl={baseUrl}
            selectedItem={selectedItem}
            setSelectedItem={setSelectedItem}
            isLast={idx === data.data.length - 1}
          />
        ))}
      </div>
    </section>
  );
}

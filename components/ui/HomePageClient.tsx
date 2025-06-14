"use client";

import { useState } from "react";
import CategoryNav from "@/components/ui/catogaryNav";
import CategorySection from "@/components/ui/catogarySection";
import Header from "@/components/ui/Header";
import Footer from "@/components/ui/Footer";

type Item = {
  id: number;
  name: string;
  description: string;
  price: number;
  image: {
    url: string;
    name: string;
    formats?: {
      medium?: {
        url: string;
      };
    };
  };
};

type Category = {
  id: number;
  name: string;
  items: Item[];
};

interface HomePageClientProps {
  categories: Category[];
  deals: Item[];
  dealsBannerUrl: string;
  baseUrl: string;
}

export default function HomePageClient({
  categories,
  deals,
  dealsBannerUrl,
  baseUrl,
}: HomePageClientProps) {
  const [selectedItem, setSelectedItem] = useState<Item | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  return (
    <div className="relative min-h-screen bg-[#121212]">
      <div className="fixed top-0 right-0 w-[6px] h-screen bg-yellow-500 z-[9999] pointer-events-none" />
      <div className="relative">
        <Header dialogOpen={dialogOpen} />
        <CategoryNav categories={categories} deals={deals} dialogOpen={dialogOpen} />
        <div className="container py-8 mx-auto">
          {categories.map((cat, idx) => (
            <CategorySection
              key={cat.id}
              category={cat}
              baseUrl={baseUrl}
              selectedItem={selectedItem}
              setSelectedItem={setSelectedItem}
              isLast={idx === categories.length - 1}
              deals={idx === 0 ? deals : undefined}
              dealsBannerUrl={idx === 0 ? dealsBannerUrl : undefined}
              setDialogOpen={setDialogOpen}
            />
          ))}
        </div>
        <Footer />
      </div>
    </div>
  );
} 
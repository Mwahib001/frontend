"use client";

import { useState, useEffect } from "react";
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

export default function Home() {
  const [selectedItem, setSelectedItem] = useState<Item | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);
  const [deals, setDeals] = useState<Item[]>([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const baseUrl = "http://localhost:1337";

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch deals first
        const dealsRes = await fetch(
          "http://localhost:1337/api/catogaries?filters[name][$eq]=Deals&populate[items][populate]=image"
        );
        const dealsData = await dealsRes.json();
        const dealsCategory = dealsData.data[0];
        setDeals(dealsCategory?.items || []);

        // Then fetch other categories
        const categoriesRes = await fetch(
          "http://localhost:1337/api/catogaries?populate[items][populate]=image&filters[name][$notIn][0]=Add ones&filters[name][$notIn][1]=banner&filters[name][$notIn][2]=Deals"
        );
        const categoriesData = await categoriesRes.json();
        setCategories(categoriesData.data || []);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="relative min-h-screen bg-[#121212]">
      {/* Sticky yellow line on the right side, above all content */}
      <div className="fixed top-0 right-0 w-[6px] h-screen bg-yellow-500 z-[9999] pointer-events-none" />

      {/* Main content */}
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
              setDialogOpen={setDialogOpen}
            />
          ))}
        </div>
        <Footer />
      </div>
    </div>
  );
}

"use client";
import { useState, useEffect } from "react";

type NavButtonProps = {
  label: string;
  isActive: boolean;
  onClick: () => void;
};

type Category = {
  id: number;
  name: string;
};

type CategoryNavProps = {
  categories: Category[];
  deals: any[];
};

const NavButton = ({ label, isActive, onClick }: NavButtonProps) => (
  <button
    onClick={onClick}
    className={`px-6 py-2 text-xl font-bold transition-all tracking-wider ${
      isActive
        ? "text-yellow-500 underline decoration-yellow-500 underline-offset-[20px]"
        : "text-white hover:text-yellow-500 hover:underline hover:decoration-yellow-500 hover:underline-offset-[20px]"
    }`}
  >
    {label}
  </button>
);

export default function CategoryNav({ categories, deals, dialogOpen = false }: CategoryNavProps & { dialogOpen?: boolean }) {
  const [selectedCategory, setSelectedCategory] = useState<string>("deals");

  useEffect(() => {
    const handleScroll = () => {
      const dealsSection = document.getElementById("deals-section");
      if (dealsSection) {
        const rect = dealsSection.getBoundingClientRect();
        if (rect.top <= 100 && rect.bottom >= 100) {
          setSelectedCategory("deals");
          return;
        }
      }

      categories.forEach((category) => {
        const section = document.getElementById(`category-${category.id}`);
        if (section) {
          const rect = section.getBoundingClientRect();
          if (rect.top <= 100 && rect.bottom >= 100) {
            setSelectedCategory(category.id.toString());
          }
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [categories]);

  const handleCategoryClick = (categoryId: string) => {
    setSelectedCategory(categoryId);
    const element = document.getElementById(
      categoryId === "deals" ? "deals-section" : `category-${categoryId}`
    );
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className={`sticky top-[72px] z-[90] bg-[#121212] shadow-md ${dialogOpen ? 'backdrop-blur-sm pointer-events-none' : ''}`}>
      <div className="container flex items-center justify-center mx-auto px-4 py-3">
        <div className="flex items-center space-x-2 sm:space-x-4 overflow-x-auto pb-2">
          {deals.length > 0 && (
            <NavButton
              label="Deals"
              isActive={selectedCategory === "deals"}
              onClick={() => handleCategoryClick("deals")}
            />
          )}
          {categories.map((category) => (
            <NavButton
              key={category.id}
              label={category.name}
              isActive={selectedCategory === category.id.toString()}
              onClick={() => handleCategoryClick(category.id.toString())}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
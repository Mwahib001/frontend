"use client";

import { useState } from "react";
import ItemCard from "./itemsCard";
import type { Item } from "./itemsCard";

interface DealsSlideshowProps {
  deals: Item[];
  baseUrl: string;
  selectedItem: Item | null;
  setSelectedItem: (item: Item | null) => void;
}

export default function DealsSlideshow({ deals, baseUrl, selectedItem, setSelectedItem }: DealsSlideshowProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [dialogOpen, setDialogOpen] = useState(false);
  const itemsPerPage = 3;

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex + 1 >= deals.length ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex - 1 < 0 ? deals.length - 1 : prevIndex - 1
    );
  };

  // Get the three cards to display
  const getVisibleCards = () => {
    const cards = [];
    for (let i = 0; i < itemsPerPage; i++) {
      const index = (currentIndex + i) % deals.length;
      cards.push(deals[index]);
    }
    return cards;
  };

  return (
    <div className="relative mb-8">
      <h2 className="text-2xl font-bold text-white mb-6 mt-3 px-10 sm:px-16 lg:px-20">Deals</h2>
      
      <div className="relative">
        <button
          onClick={prevSlide}
          className="absolute -left-4 top-1/2 -translate-y-1/2 z-10 bg-black/80 text-white p-4 rounded-full hover:bg-yellow-500 text-2xl font-bold shadow-lg transition-all duration-300 hover:scale-110"
          style={{ top: 'calc(50% + 40px)' }}
        >
          ←
        </button>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 px-10 sm:px-16 lg:px-20">
          {getVisibleCards().map((deal) => (
            <div key={deal.id} className="w-full">
              <ItemCard
                item={deal}
                baseUrl={baseUrl}
                selectedItem={selectedItem}
                setSelectedItem={setSelectedItem}
                setDialogOpen={setDialogOpen}
              />
            </div>
          ))}
        </div>

        <button
          onClick={nextSlide}
          className="absolute -right-4 top-1/2 -translate-y-1/2 z-10 bg-black/80 text-white p-4 rounded-full hover:bg-yellow-500 text-2xl font-bold shadow-lg transition-all duration-300 hover:scale-110"
          style={{ top: 'calc(50% + 40px)' }}
        >
          →
        </button>
      </div>
    </div>
  );
} 
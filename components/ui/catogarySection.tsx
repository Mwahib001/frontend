"use client";

import ItemCard from "./itemsCard";
import DealsSlideshow from "./dealsSlideshow";

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

type CategorySectionProps = {
  category: Category;
  baseUrl: string;
  selectedItem: Item | null;
  setSelectedItem: (item: Item | null) => void;
  isLast: boolean;
  deals?: Item[];
  setDialogOpen: (open: boolean) => void;
  dealsBannerUrl?: string | null;
};

const CategoryTitle = ({ name }: { name: string }) => (
  <h2 className="text-2xl sm:text-3xl md:text-4xl text-white font-bold mb-4 sm:mb-6 px-4 sm:px-6 md:px-8 lg:px-12">
    {name}
  </h2>
);

const CategoryGrid = ({ 
  items, 
  baseUrl, 
  selectedItem, 
  setSelectedItem, 
  setDialogOpen
}: { 
  items: Item[];
  baseUrl: string;
  selectedItem: Item | null;
  setSelectedItem: (item: Item | null) => void;
  setDialogOpen: (open: boolean) => void;
}) => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 px-4 sm:px-6 md:px-8 lg:px-12">
    {items.length > 0 ? (
      items.map((item) => (
        <ItemCard
          key={item.id}
          item={item}
          baseUrl={baseUrl}
          selectedItem={selectedItem}
          setSelectedItem={setSelectedItem}
          setDialogOpen={setDialogOpen}
        />
      ))
    ) : (
      <div className="col-span-full text-center py-8">
        <p className="text-white text-lg">No items available in this category.</p>
      </div>
    )}
  </div>
);

export default function CategorySection({
  category,
  baseUrl,
  selectedItem,
  setSelectedItem,
  isLast,
  deals,
  setDialogOpen,
  dealsBannerUrl,
}: CategorySectionProps) {
  return (
    <section
      id={`category-${category.id}`}
      className={`py-4 sm:py-6 ${!isLast ? "border-b border-[#2a2a2a]" : ""}`}
    >
      <div className="container mx-auto">
        {deals && deals.length > 0 && (
          <div id="deals-section" className="mb-8">
            <CategoryTitle name="Deals" />
            <DealsSlideshow
              deals={deals}
              baseUrl={baseUrl}
              selectedItem={selectedItem}
              setSelectedItem={setSelectedItem}
              bannerUrl={dealsBannerUrl} // pass banner url
            />
          </div>
        )}
        <CategoryTitle name={category.name} />
        <CategoryGrid
          items={category.items}
          baseUrl={baseUrl}
          selectedItem={selectedItem}
          setSelectedItem={setSelectedItem}
          setDialogOpen={setDialogOpen}
        />
      </div>
    </section>
  );
}

import ItemCard from "./itemsCard";

type CategorySectionProps = {
  category: any;
  baseUrl: string;
  selectedItem: any;
  setSelectedItem: (item: any) => void;
  isLast: boolean;
};

export default function CategorySection({ category, baseUrl, selectedItem, setSelectedItem, isLast }: CategorySectionProps) {
  return (
    <div key={category.id} id={`cat-${category.id}`} className="mb-4">
      <h2 className="text-2xl font-bold text-white px-70 mb-3 mt-3">{category.name}</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 px-75 gap-4">
        {category?.items?.length > 0 ? (
          category.items.map((item: any) => (
            <ItemCard
              key={item.id}
              item={item}
              baseUrl={baseUrl}
              selectedItem={selectedItem}
              setSelectedItem={setSelectedItem}
            />
          ))
        ) : (
          <div className="text-gray-400">No items in this category.</div>
        )}
      </div>
      {!isLast && <br />}
    </div>
  );
}

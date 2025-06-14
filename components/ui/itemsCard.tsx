"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import {
  DialogPortal,
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import AddOnItem, { AddOn } from "@/components/ui/AddOnItem";

export type Item = {
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

type ItemCardProps = {
  item: Item;
  baseUrl: string;
  selectedItem: Item | null;
  setSelectedItem: (item: Item | null) => void;
  setDialogOpen: (open: boolean) => void;
};

const QuantityControl = ({ 
  quantity, 
  onIncrement, 
  onDecrement 
}: { 
  quantity: number;
  onIncrement: () => void;
  onDecrement: () => void;
}) => (
  <div className="flex items-center p-2 w-fit">
    <button
      onClick={onDecrement}
      className="text-white px-2 bg-yellow-500 hover:bg-yellow-600"
    >
      −
    </button>
    <span className="text-white px-2 text-sm">{quantity}</span>
    <button
      onClick={onIncrement}
      className="text-white px-2 bg-yellow-500 hover:bg-yellow-600 rounded-sm"
    >
      +
    </button>
  </div>
);

export default function ItemCard({
  item,
  baseUrl,
  selectedItem,
  setSelectedItem,
  setDialogOpen,
}: ItemCardProps) {
  const [quantity, setQuantity] = useState(1);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const mealOptions = [`${item.name} and cold drink`, `Only ${item.name}`];
  const [selectedMeal, setSelectedMeal] = useState(mealOptions[0]);
  const [addOns, setAddOns] = useState<AddOn[]>([]);
  const [addOnsQty, setAddOnsQty] = useState<Record<number, number>>({});

  const dropdownRef = useRef<HTMLDivElement>(null);

  const increment = () => setQuantity((prev) => prev + 1);
  const decrement = () => setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    }

    if (dropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownOpen]);

  useEffect(() => {
    const fetchAddOns = async () => {
      try {
        const response = await fetch(
          `${baseUrl}/api/catogaries/irutpmu6n0pfzoqifmsh3cjk?populate[items][populate]=image`
        );
        const data = await response.json();
        if (data.data?.items) {
          setAddOns(data.data.items);
        }
      } catch (error) {
        console.error("Failed to fetch add-ons:", error);
      }
    };

    if (selectedItem?.id === item.id) {
      fetchAddOns();
    }
  }, [selectedItem?.id, item.id, baseUrl]);

  const handleAddOnIncrement = (id: number) => {
    setAddOnsQty((prev) => ({
      ...prev,
      [id]: (prev[id] || 0) + 1,
    }));
  };

  const handleAddOnDecrement = (id: number) => {
    setAddOnsQty((prev) => ({
      ...prev,
      [id]: prev[id] && prev[id] > 0 ? prev[id] - 1 : 0,
    }));
  };

  return (
    <Dialog
      open={selectedItem?.id === item.id}
      onOpenChange={(open) => {
        if (!open) setSelectedItem(null);
        setDialogOpen(open);
      }}
    >
      <DialogTrigger asChild>
        <div className="w-full" onClick={() => setSelectedItem(item)}>
          <div className="bg-[#242424] rounded-lg shadow-md flex w-[98%] mx-auto h-full flex-col hover:cursor-pointer">
            <div className="relative w-full aspect-[16/16]">
              <Image
                priority
                src={item.image.url}
                alt={item.image.name}
                fill
                className="object-cover rounded-t-lg"
                placeholder="blur"
                blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/4gHYSUNDX1BST0ZJTEUAAQEAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAH4AABAAEAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADb/2wBDABQODxIPDRQSEBIXFRQdHx4eHRoaHSQtJSEkMjU1LS0yMi4qLjgyPj4+Oj4+Oj4+Oj4+Oj4+Oj4+Oj4+Oj7/2wBDAR4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh7/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAb/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
              />
            </div>
            <div className="p-3 sm:p-4 flex flex-col flex-grow h-[140px] sm:h-[160px]">
              <h1 className="text-xl sm:text-2xl text-yellow-500 font-bold line-clamp-1">{item.name}</h1>
              <p className="text-base sm:text-lg text-white font-semibold line-clamp-2 mt-1">
                {item.description}
              </p>
              <div className="flex items-center justify-between mb-0 pb-0 mt-auto">
                <span className="font-extrabold text-yellow-500 text-2xl sm:text-4xl">Rs. {item.price}</span>
                <button className="bg-red-500 text-white text-sm sm:text-base font-bold px-4 sm:px-5 py-1.5 rounded hover:bg-red-600">
                  Add to cart
                </button>
              </div>
            </div>
          </div>
        </div>
      </DialogTrigger>

      <DialogPortal>
        <DialogContent className="z-[200] w-[95%] sm:w-[80%] md:w-[70%] h-[95%] lg:w-[90%] bg-[#121212] overflow-y-auto rounded-lg">
          <DialogTitle className="hidden">{item.name}</DialogTitle>
          <DialogDescription className="hidden">{item.description}</DialogDescription>

          <div className="flex flex-col md:flex-row gap-12 gap-x-8 px-8 m-4 sm:m-20 !mt-0">
            <div className="w-full md:w-auto">
              <Image
                src={
                  item.image?.formats?.medium?.url
                    ? item.image.formats.medium.url
                    : item.image.url
                }
                alt={item.name}
                width={1000}
                height={1000}
                className="w-full md:w-[600px] md:h-[600px] rounded-lg"
                placeholder="blur"
                blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/4gHYSUNDX1BST0ZJTEUAAQEAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAH4AABAAEAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADb/2wBDABQODxIPDRQSEBIXFRQdHx4eHRoaHSQtJSEkMjU1LS0yMi4qLjgyPj4+Oj4+Oj4+Oj4+Oj4+Oj4+Oj4+Oj7/2wBDAR4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh7/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAb/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
              />
            </div>

            <div className="flex flex-col flex-1">
              <div className="p-16 pt-1">
                <h2 className="lg:text-4xl sm:text-2xl text-white font-bold mb-2">{item.name}</h2>
                <p className="text-md text-white font-bold mt-2">{item.description}</p>
                <div className="font-bold text-white text-base text-lg mt-2">Rs. {item.price}</div>
              </div>

              <div className="relative p-16 mt-0 pt-0" ref={dropdownRef}>
                <label className="block text-lg text-white">Meal</label>
                <div
                  className="w-full text-white rounded px-2 py-1 bg-[#242424] text-md cursor-pointer"
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                >
                  {selectedMeal}
                </div>
                {dropdownOpen && (
                  <div className="absolute w-full rounded z-10 shadow-lg bg-[#242424]">
                    {mealOptions.map((option, index) => (
                      <div
                        key={index}
                        onClick={() => {
                          setSelectedMeal(option);
                          setDropdownOpen(false);
                        }}
                        className="px-2 py-2 hover:bg-yellow-500 hover:text-white text-white text-sm cursor-pointer"
                      >
                        {option}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="p-16 pt-0">
                <div className="flex flex-wrap text-white gap-2 sm:gap-4 sm:text-sm">
                  {["Pepsi", "Coke", "Sprite", "Mirinda", "Fanta", "7up"].map((drink) => (
                    <label key={drink} className="flex items-center">
                      <input
                        type="radio"
                        name="drink"
                        value={drink}
                        className="accent-yellow-500 mr-1 sm:mr-2"
                        defaultChecked={drink === "Pepsi"}
                      />
                      {drink}
                    </label>
                  ))}
                </div>
              </div>

              <div className="flex flex-col p-16 pt-0">
                <label className="block text-lg text-white p-2 pb-0">Quantity</label>
                <QuantityControl 
                  quantity={quantity}
                  onIncrement={increment}
                  onDecrement={decrement}
                />

                <DialogClose asChild>
                  <button className="text-white text-lg font-bold bg-yellow-500 hover:bg-yellow-600">
                    Add to Cart
                  </button>
                </DialogClose>
              </div>
            </div>
          </div>

          <DialogFooter className="sm:p-6">
            <div className="w-full p-16 pt-0">
              <h2 className="text-lg text-white font-bold mb-1">
                Add-ons <span className="text-yellow-500 text-lg">(optional)</span>
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                {addOns.map((addon) => (
                  <AddOnItem
                    key={addon.id}
                    addon={addon}
                    quantity={addOnsQty[addon.id] || 0}
                    onIncrement={() => handleAddOnIncrement(addon.id)}
                    onDecrement={() => handleAddOnDecrement(addon.id)}
                    baseUrl={baseUrl}
                  />
                ))}
              </div>
            </div>
          </DialogFooter>
        </DialogContent>
      </DialogPortal>
    </Dialog>
  );
}

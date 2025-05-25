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

type ItemCardProps = {
  item: any;
  baseUrl: string;
  selectedItem: any;
  setSelectedItem: (item: any) => void;
};

export default function ItemCard({
  item,
  baseUrl,
  selectedItem,
  setSelectedItem,
}: ItemCardProps) {
  const [quantity, setQuantity] = useState(1);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const mealOptions = [`${item.name} and cold drink`, `Only ${item.name}`];
  const [selectedMeal, setSelectedMeal] = useState(mealOptions[0]);

  const dropdownRef = useRef<HTMLDivElement>(null);

  const increment = () => setQuantity((prev) => prev + 1);
  const decrement = () => setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

  // Close dropdown if clicking outside
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

  return (
    <Dialog
      open={selectedItem?.id === item.id}
      onOpenChange={(open) => !open && setSelectedItem(null)}
    >
      <DialogTrigger asChild>
        <div className="w-fit" onClick={() => setSelectedItem(item)}>
          <div
            style={{ backgroundColor: "rgb(18, 18, 18)" }}
            className="rounded-lg shadow-md flex w-[300px] flex-col h-[400px] overflow-visible hover:cursor-pointer"
          >
            <Image
              priority
              src={
                item.image?.formats?.small?.url
                  ? `${baseUrl}${item.image.formats.small.url}`
                  : `${baseUrl}${item.image.url}`
              }
              alt={item.image.name}
              width={400}
              height={500}
              className="w-full h-[250px] object-cover"
            />
            <div className="p-6">
              <h1 className="text-md text-yellow-400 font-bold">{item.name}</h1>
              <p className="leading-relaxed text-sm text-white font-semibold line-clamp-2">
                {item.description}
              </p>
              <div className="flex items-center justify-between space-x-4 mt-4">
                <span className="font-bold text-yellow-500 text-lg">
                  Price: {item.price}
                </span>
                <button className="bg-red-700 text-white text-sm font-bold px-3 py-1 rounded hover:bg-yellow-400">
                  Add to cart
                </button>
              </div>
            </div>
          </div>
        </div>
      </DialogTrigger>

      <DialogPortal>
        <DialogContent className="w-[70%] h-[90%] bg-black">
          <DialogTitle className="hidden">{item.name}</DialogTitle>
          <DialogDescription className="hidden">{item.description}</DialogDescription>
          <div className="flex flex-col md:flex-row gap-25 mt-6 m-20">
            <div className="flex-shrink-0">
              <Image
                src={
                  item.image?.formats?.medium?.url
                    ? `${baseUrl}${item.image.formats.medium.url}`
                    : `${baseUrl}${item.image.url}`
                }
                alt={item.name}
                width={400}
                height={400}
                className="rounded object-cover"
              />
            </div>

            <div className="flex flex-col flex-1 overflow-auto">
              <h2 className="text-2xl text-white font-bold mb-2">{item.name}</h2>
              <p className="text-sm text-white">{item.description}</p>
              <div className="font-bold text-white text-lg">Price: {item.price}</div>

              <div className="mb-4 mt-4 relative" ref={dropdownRef}>
                <label className="block text-xs text-white mb-1">Meal</label>
                <div
                  className="w-full text-white rounded px-2 py-1 bg-gray-950 text-xs cursor-pointer border border-gray-700"
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                >
                  {selectedMeal}
                </div>
                {dropdownOpen && (
                  <div className="absolute w-full mt-1 rounded bg-gray-950 z-10 shadow-md">
                    {mealOptions.map((option, index) => (
                      <div
                        key={index}
                        onClick={() => {
                          setSelectedMeal(option);
                          setDropdownOpen(false);
                        }}
                        className="px-2 py-1 hover:bg-yellow-400 hover:text-black text-white text-xs cursor-pointer"
                      >
                        {option}
                      </div>
                    ))}
                  </div>
                )}
              </div>
              <div className="mb-4">
                <div className="flex flex-wrap text-white gap-4 text-sm">
                  {["Pepsi", "Coke", "Sprite", "Mirinda", "Fanta", "7up"].map((drink) => (
                    <label key={drink}>
                      <input
                        type="radio"
                        name="drink"
                        value={drink}
                        className="accent-yellow-500 mr-2"
                        defaultChecked={drink === "Pepsi"}
                      />
                      {drink}
                    </label>
                  ))}
                </div>
              </div>
              <div className="mb-4 mt-4 flex flex-col gap-3">
                <div className="flex items-center border-white rounded px-2 py-1">
                  <button
                    onClick={decrement}
                    className="text-black px-2 bg-yellow-500 hover:bg-yellow-950 rounded-sm"
                  >
                    −
                  </button>
                  <span className="text-white px-2 text-sm">{quantity}</span>
                  <button
                    onClick={increment}
                    className="text-black px-2 bg-yellow-500 hover:bg-yellow-950 rounded-sm"
                  >
                    +
                  </button>
                </div>

                <DialogClose asChild>
                  <button className="text-black text-sm font-bold bg-yellow-500 px-4 py-2 rounded hover:bg-yellow-900">
                    Add to Cart
                  </button>
                </DialogClose>
              </div>
            </div>
          </div>
          <DialogFooter>
                            <div>
                    <h1 className="text-white">Add ones <p className="text-yellow-500">(optional)</p></h1>
                    
                </div>
          </DialogFooter>
        </DialogContent>
      </DialogPortal>
    </Dialog>
  );
}

"use client";

import Image from "next/image";

export type AddOn = {
  id: number;
  name: string;
  price: number;
  image: {
    formats: {
      thumbnail: {
        url: string;
      };
    };
  };
};

interface AddOnItemProps {
  addon: AddOn;
  quantity: number;
  onIncrement: () => void;
  onDecrement: () => void;
  baseUrl: string;
}

export default function AddOnItem({ 
  addon, 
  quantity, 
  onIncrement, 
  onDecrement, 
  baseUrl 
}: AddOnItemProps) {
  return (
    <div className="flex items-center justify-between bg-[#242424] p-2 sm:p-3 hover:border-yellow-500">
      <div className="flex items-center gap-2 sm:gap-3">
        <Image
          src={addon.image.formats.thumbnail.url}
          alt={addon.name}
          width={40}
          height={40}
          className="w-8 h-8 sm:w-10 sm:h-10 rounded-full object-cover"
          placeholder="blur"
          blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/4gHYSUNDX1BST0ZJTEUAAQEAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAH4AABAAEAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADb/2wBDABQODxIPDRQSEBIXFRQdHx4eHRoaHSQtJSEkMjU1LS0yMi4qLjgyPj4+Oj4+Oj4+Oj4+Oj4+Oj4+Oj4+Oj7/2wBDAR4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh7/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAb/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
        />
        <div>
          <label className="text-white text-sm sm:text-base font-medium">{addon.name}</label>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <span className="text-white text-sm">Rs. {addon.price}</span>
        <div className="flex items-center">
          <button
            className="text-white px-1 sm:px-2 py-1 hover:bg-yellow-500 hover:text-white"
            onClick={onDecrement}
          >
            −
          </button>
          <span className="text-white px-1 sm:px-2 text-xs sm:text-sm">
            {quantity}
          </span>
          <button
            className="text-white px-1 sm:px-2 py-1 hover:bg-yellow-500 hover:text-white"
            onClick={onIncrement}
          >
            +
          </button>
        </div>
      </div>
    </div>
  );
} 
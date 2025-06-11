"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import Link from "next/link";

type NavigationItemProps = {
  href: string;
  label: string;
  isActive: boolean;
  onClick: () => void;
};

type IconButtonProps = {
  href: string;
  icon: string;
  alt: string;
};

type BannerImage = {
  id: number;
  documentId: string;
  url: string;
};

type Banner = {
  id: number;
  documentId: string;
  name: string;
  bannerimage: BannerImage;
};

const NavigationItem = ({ href, label, isActive, onClick }: NavigationItemProps) => (
  <div className="px-4">
    <Link
      href={href}
      className={`text-white hover:cursor-pointer text-lg font-semibold tracking-wider transition-colors ${
        isActive ? "underline-offset-15 underline decoration-yellow-500" : ""
      }`}
      onClick={onClick}
    >
      {label}
    </Link>
  </div>
);

const IconButton = ({ href, icon, alt }: IconButtonProps) => (
  <Link href={href}>
    <div className="bg-[#1a1a1a] p-2 rounded-lg hover:bg-[#2a2a2a] transition-colors">
      <Image src={icon} alt={alt} width={24} height={24} />
    </div>
  </Link>
);

const BannerCarousel = ({ banners }: { banners: Banner[] }) => {
  const [activeImage, setActiveImage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveImage((prev) => (prev + 1) % banners.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [banners.length]);

  return (
    <div className="relative w-full lg:h-[75vh] sm:h-[300px] md:h-[400px]">
      {banners.map((banner, index) => (
        <div
          key={banner.id}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === activeImage ? "opacity-100" : "opacity-0"
          }`}
        >
          <Image
            src={banner.bannerimage.url}
            alt={banner.name}
            fill
            className="object-cover"
            priority={index === 0}
          />
        </div>
      ))}
    </div>
  );
};

export default function Header({ dialogOpen = false }: { dialogOpen?: boolean }) {
  const [selectedNav, setSelectedNav] = useState("home");
  const [banners, setBanners] = useState<Banner[]>([]);

  useEffect(() => {
    const fetchBanners = async () => {
      try {
        const response = await fetch(
          "https://genuine-presence-df48c40f5e.strapiapp.com/api/catogaries/vc4kp69nhaesqg5zct8w5tjw?populate[banners][populate][bannerimage][fields][0]=url"
        );
        const data = await response.json();
        if (data.data && data.data.banners) {
          setBanners(data.data.banners);
        }
      } catch (error) {
        console.error("Error fetching banners:", error);
      }
    };

    fetchBanners();
  }, []);

  return (
    <header className={`bg-[#121212] ${dialogOpen ? 'backdrop-blur-sm pointer-events-none' : ''}`}>
      <div className="fixed top-0 left-0 right-0 z-[100] bg-[#121212] shadow-md">
        <div className="container px-4">
          <div className="flex py-4">
            <Link href="/" className="flex items-center ml-15">
              <Image
                src="/Logo.webp"
                alt="Logo"
                width={200}
                height={80}
                className="h-12 w-auto"
              />
            </Link>

            <nav className="hidden md:flex items-center ml-20 space-x-4">
              <NavigationItem
                href="/"
                label="Home"
                isActive={selectedNav === "home"}
                onClick={() => setSelectedNav("home")}
              />
              <NavigationItem
                href="/ranchers-expansion"
                label="Ranchers Expansion"
                isActive={selectedNav === "menu"}
                onClick={() => setSelectedNav("menu")}
              />
              <NavigationItem
                href="/about"
                label="About Us"
                isActive={selectedNav === "about"}
                onClick={() => setSelectedNav("about")}
              />
            </nav>

            <div className="flex items-center space-x-4 ml-auto">
              <IconButton
                href="/account"
                icon="/icons8-account-50.png"
                alt="User Account"
              />
              <IconButton
                href="/cart"
                icon="/icons8-shopping-bag-50.png"
                alt="Shopping Bag"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="h-[72px]"></div> {/* Spacer for fixed header */}

      {banners.length > 0 && <BannerCarousel banners={banners} />}
    </header>
  );
}
"use client";
import Image from "next/image";
import Link from "next/link";

const FooterLink = ({ href, children }: { href: string; children: React.ReactNode }) => (
  <Link href={href} className="text-gray-300 hover:text-yellow-500 text-sm transition-colors block">
    {children}
  </Link>
);

export default function Footer() {
  return (
    <footer className="bg-[#121212] text-white px-4 pt-12 pb-6">
      {/* Top: Logo | bar | follow us */}
      <div className="flex flex-col items-center mb-8">
        <div className="flex flex-row items-center justify-center w-full gap-8 mb-8">
          {/* Logo */}
          <Image src="/Logo.webp" alt="Ranchers Logo" width={120} height={70} />
          {/* Bar */}
          <div className="h-12 w-px bg-gray-400 mx-4" />
          {/* Follow Us */}
          <div className="flex flex-col items-center">
            <span className="font-bold text-lg mb-2">Follow Us</span>
            <div className="flex space-x-4">
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                <div className="bg-white p-1 rounded-full flex items-center justify-center">
                  <Image src="/footer/instagram.png" alt="Instagram" width={24} height={24} />
                </div>
              </a>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                <div className="bg-white p-1 rounded-full flex items-center justify-center">
                  <Image src="/footer/facebook.png" alt="Facebook" width={24} height={24} />
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Main grid */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-10">
        {/* Menu Section */}
        <div>
          <h3 className="text-lg font-bold mb-4">Menu</h3>
          <div className="space-y-2">
            <FooterLink href="#">Deals</FooterLink>
            <FooterLink href="#">Chicken Burgers</FooterLink>
            <FooterLink href="#">Beef Burgers</FooterLink>
            <FooterLink href="#">Pizza</FooterLink>
            <FooterLink href="#">Quick Bites</FooterLink>
            <FooterLink href="#">Fries</FooterLink>
          </div>
        </div>

        {/* Ranchers Section */}
        <div>
          <h3 className="text-lg font-bold mb-4">Ranchers</h3>
          <div className="space-y-2">
            <FooterLink href="#">About us</FooterLink>
            <FooterLink href="#">Ranchers Expansion</FooterLink>
          </div>
        </div>

        {/* Locations Section */}
        <div>
          <h3 className="text-lg font-bold mb-4">Locations</h3>
          <div className="space-y-2">
            {["Islamabad","Rawalpindi","Lahore","Sialkot","Gujranwala","Faisalabad","Sargodha","Peshawar"].map((location) => (
              <FooterLink key={location} href="#">{location}</FooterLink>
            ))}
          </div>
        </div>

        {/* App Buttons */}
        <div className="flex flex-col items-center lg:items-start space-y-4 mt-2">
          <a href="https://play.google.com" target="_blank" rel="noopener noreferrer">
            <Image src="/footer/googleplaybutton.svg" alt="Google Play" width={150} height={50} />
          </a>
          <a href="https://apps.apple.com" target="_blank" rel="noopener noreferrer">
            <Image src="/footer/applestore.svg" alt="App Store" width={150} height={50} />
          </a>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="mt-8 text-center text-sm text-gray-400 space-y-2">
        <p className="font-semibold">
          All Rights Reserved. {new Date().getFullYear()}© Ranchers Café
        </p>
        <p className="tracking-widest">POWERED BY CODISTAN.</p>
      </div>
    </footer>
  );
}

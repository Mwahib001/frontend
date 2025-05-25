import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-zinc-900 to-yellow-950 text-yellow-300 font-sans">
      <header className="w-full py-6 flex flex-col items-center gap-2 bg-black/80 shadow-lg">
        <Image
          src="/next.svg"
          alt="Logo"
          width={120}
          height={40}
          className="dark:invert"
        />
        <h1 className="text-3xl font-extrabold tracking-tight text-yellow-400 drop-shadow-lg">
          Ranchers Cafe
        </h1>
        <nav className="flex gap-8 mt-2">
          <Link
            href="#about"
            className="hover:underline underline-offset-4 transition text-yellow-200 hover:text-yellow-400"
          >
            About Us
          </Link>
          <Link
            href="#gallery"
            className="hover:underline underline-offset-4 transition text-yellow-200 hover:text-yellow-400"
          >
            Gallery
          </Link>
          <Link
            href="/menu"
            className="hover:underline underline-offset-4 transition text-yellow-200 hover:text-yellow-400"
          >
            Menu
          </Link>
          <Link
            href="#locations"
            className="hover:underline underline-offset-4 transition text-yellow-200 hover:text-yellow-400"
          >
            Locations
          </Link>
          <Link
            href="#contact"
            className="hover:underline underline-offset-4 transition text-yellow-200 hover:text-yellow-400"
          >
            Contact
          </Link>
        </nav>
      </header>

      {/* About Us */}
      <section
        id="about"
        className="max-w-3xl mx-auto py-12 px-4 text-center bg-black/60 rounded-lg mt-8 shadow-lg"
      >
        <h2 className="text-2xl font-bold mb-4 text-yellow-300">
          About Us
        </h2>
        <p className="text-yellow-100 text-lg">
          Welcome to{" "}
          <span className="font-bold text-yellow-400">Burger House</span>! We serve the juiciest, most delicious burgers in town, made with fresh ingredients and a passion for flavor. Whether you crave classic beef, spicy chicken, or a cheesy delight, we have something for everyone. Visit us for a taste experience you won't forget!
        </p>
        <div className="mt-6">
          <Link
            href="/"
            className="inline-block bg-yellow-400 text-black font-bold px-4 py-2 rounded hover:bg-yellow-500 transition"
          >
            Back to Top
          </Link>
        </div>
      </section>

      {/* Gallery */}
      <section id="gallery" className="max-w-5xl mx-auto py-12 px-4 mt-8 bg-zinc-900/70 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-6 text-yellow-300 text-center">
          Gallery
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Image
            src="/gallery1.jpg"
            alt="Burger 1"
            width={300}
            height={200}
            className="rounded shadow-lg object-cover border-2 border-yellow-700"
          />
          <Image
            src="/gallery2.jpg"
            alt="Burger 2"
            width={300}
            height={200}
            className="rounded shadow-lg object-cover border-2 border-yellow-700"
          />
          <Image
            src="/gallery3.jpg"
            alt="Burger 3"
            width={300}
            height={200}
            className="rounded shadow-lg object-cover border-2 border-yellow-700"
          />
          <Image
            src="/gallery4.jpg"
            alt="Burger 4"
            width={300}
            height={200}
            className="rounded shadow-lg object-cover border-2 border-yellow-700"
          />
        </div>
        <div className="mt-6 text-center">
          <Link
            href="/"
            className="inline-block bg-yellow-400 text-black font-bold px-4 py-2 rounded hover:bg-yellow-500 transition"
          >
            Back to Top
          </Link>
        </div>
      </section>

      {/* Locations */}
      <section id="locations" className="max-w-3xl mx-auto py-12 px-4 mt-8 bg-black/60 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-4 text-yellow-300 text-center">
          Our Locations
        </h2>
        <ul className="text-yellow-100 text-lg space-y-2 text-center">
          <li>
            <span className="font-semibold text-yellow-400">Main Branch:</span> 123 Burger Street, Food City
          </li>
          <li>
            <span className="font-semibold text-yellow-400">Downtown:</span> 456 Grill Avenue, Downtown
          </li>
          <li>
            <span className="font-semibold text-yellow-400">Mall Outlet:</span> 789 Tasty Plaza, Mall Road
          </li>
        </ul>
        <div className="mt-6">
          <Link
            href="/"
            className="inline-block bg-yellow-400 text-black font-bold px-4 py-2 rounded hover:bg-yellow-500 transition"
          >
            Back to Top
          </Link>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="max-w-2xl mx-auto py-12 px-4 mt-8 bg-zinc-900/70 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-4 text-yellow-300 text-center">
          Contact Us
        </h2>
        <form className="flex flex-col gap-4 bg-yellow-900 bg-opacity-20 p-6 rounded shadow-lg">
          <input
            type="text"
            placeholder="Your Name"
            className="px-4 py-2 rounded bg-black border border-yellow-400 text-yellow-200 focus:outline-none"
          />
          <input
            type="email"
            placeholder="Your Email"
            className="px-4 py-2 rounded bg-black border border-yellow-400 text-yellow-200 focus:outline-none"
          />
          <textarea
            placeholder="Your Message"
            className="px-4 py-2 rounded bg-black border border-yellow-400 text-yellow-200 focus:outline-none"
            rows={4}
          />
          <button
            type="submit"
            className="bg-yellow-400 text-black font-bold px-6 py-2 rounded hover:bg-yellow-500 transition"
          >
            Send Message
          </button>
        </form>
        <div className="mt-6 text-center">
          <Link
            href="/"
            className="inline-block bg-yellow-400 text-black font-bold px-4 py-2 rounded hover:bg-yellow-500 transition"
          >
            Back to Top
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full py-6 text-center text-yellow-600 border-t border-yellow-900 mt-8 bg-black/80">
        &copy; {new Date().getFullYear()} Burger House. All rights reserved.
      </footer>
    </div>
  );
}
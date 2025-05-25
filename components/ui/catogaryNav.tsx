type CategoryNavProps = {
  categories: any[];
};

export default function CategoryNav({ categories }: CategoryNavProps) {
  return (
    <nav className="justify-center flex gap-4 mb-8">
      {categories.map((cat) => (
        <button
          key={cat.id}
          type="button"
          className="px-4 py-2 hover:uderline text-yellow-600 font-bold text-xl decoration-yellow-600 cursor-pointer"
          onClick={() => {
            const el = document.getElementById(`cat-${cat.id}`);
            if (el) el.scrollIntoView({ behavior: "smooth" });
          }}
        >
          {cat.name}
        </button>
      ))}
    </nav>
  );
}

import { Link } from "@tanstack/react-router";

export function Navbar() {
  return (
    <nav className="flex items-center justify-between p-4 sticky top-0 bg-pink-500 text-white shadow">
      <Link to="/" className="text-gray-200 text-sm">
        <h1 className="text-2xl font-bold tracking-tight hover:text-pink-300">
          K-Style
        </h1>
      </Link>

      <div className="flex space-x-4">
        <Link
          to="/brands"
          search={{ page: 1 }}
          className=" text-sm hover:text-pink-300"
        >
          Brands
        </Link>

        <Link
          to="/products"
          search={{ page: 1 }}
          className=" text-sm hover:text-pink-300"
        >
          Products
        </Link>
      </div>
    </nav>
  );
}

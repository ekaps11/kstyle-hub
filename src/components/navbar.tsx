import { Link } from "@tanstack/react-router";

export function Navbar() {
  return (
    <nav className="flex items-center justify-between p-4 sticky top-0 bg-primary text-white shadow">
      <Link to="/">
        <h1 className="text-2xl font-bold tracking-tight">K-Style</h1>
      </Link>

      <div className="flex space-x-4">
        <Link
          to="/brands"
          search={{ page: 1 }}
          activeProps={{ className: "underline" }}
        >
          Brands
        </Link>

        <Link
          to="/products"
          search={{ page: 1 }}
          activeProps={{ className: "underline" }}
        >
          Products
        </Link>
      </div>
    </nav>
  );
}

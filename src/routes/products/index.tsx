import {
  createFileRoute,
  useNavigate,
  useSearch,
} from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { fetchProducts } from "@/services/products";
import { ProductList } from "@/components/products/product-list";
import { CustomPagination } from "@/components/custom-pagination";

export type Product = {
  id: number;
  title: string;
  price: number;
  thumbnail: string;
  category: string;
  description: string;
  rating: number;
  discountPercentage: number;
  brand: string;
  stock: number;
};

export const Route = createFileRoute("/products/")({
  component: Products,
  validateSearch: (search) => ({
    page: search.page ? Number(search.page) : 1,
  }),
});

function Products() {
  const navigate = useNavigate({ from: "/products" });
  const search = useSearch({ from: "/products/" });
  const page = search.page ?? 1;
  const perPage = 12;

  const { data, isLoading, error } = useQuery<{ products: Product[] }>({
    queryKey: ["products"],
    queryFn: fetchProducts,
    staleTime: 1000 * 60 * 5,
  });

  const totalPages = Math.ceil((data?.products?.length || 0) / perPage);

  const paginatedProducts =
    data?.products?.slice((page - 1) * perPage, page * perPage) ?? [];

  if (isLoading) return <p className="text-gray-500">Loading...</p>;
  if (error) return <p className="text-red-500">Error: {error.message}</p>;
  if (!paginatedProducts) return;

  return (
    <div className="p-5">
      <h1 className="font-bold mb-3">
        Shop by <span className="text-pink-500 underline">Products</span>
      </h1>

      <ProductList products={paginatedProducts} />

      <CustomPagination
        page={page}
        totalPages={totalPages}
        onPageChange={(p: number) => navigate({ search: { page: p } })}
      />

      <p className="mx-auto text-gray-500 text-center">
        total products: {data?.products?.length}
      </p>
    </div>
  );
}

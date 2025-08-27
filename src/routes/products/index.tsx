import {
  createFileRoute,
  useNavigate,
  useSearch,
} from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { fetchProducts } from "@/services/products";
import { ProductList } from "@/components/products/product-list";
import { CustomPagination } from "@/components/custom-pagination";
import { Layout } from "@/components/layout";
import { getPaginatedProducts } from "@/lib/utils";
import { Seo } from "@/components/seo";

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
  });

  const { totalPages, paginatedProducts } = getPaginatedProducts(
    data?.products,
    data?.products?.length || 0,
    page,
    perPage
  );

  if (isLoading) return <p className="text-gray-500">Loading...</p>;
  if (error) return <p className="text-red-500">Error: {error.message}</p>;

  return (
    <div className="p-5">
      <Seo
        title="K-Style - Products"
        description="Explore a wide range of beauty products at K-Style Hub"
      />

      <Layout header="Products" total={data?.products || []}>
        <ProductList products={paginatedProducts} />

        <CustomPagination
          page={page}
          totalPages={totalPages}
          onPageChange={(p: number) => navigate({ search: { page: p } })}
        />
      </Layout>
    </div>
  );
}

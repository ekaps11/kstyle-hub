import { ProductList } from "@/components/products/product-list";
import { Capitalize } from "@/lib/helper";
import { fetchBrandProducts } from "@/services/brands";
import { useQuery } from "@tanstack/react-query";
import { createFileRoute, useParams } from "@tanstack/react-router";

export const Route = createFileRoute("/brands/$brandId")({
  component: RouteComponent,
});

function RouteComponent() {
  const { brandId } = useParams({ from: "/brands/$brandId" });

  const { data, isLoading, error } = useQuery({
    queryKey: ["products", "brand", brandId],
    queryFn: () => fetchBrandProducts(brandId),
  });

  if (isLoading) return <p className="text-gray-500">Loading...</p>;
  if (error) return <p className="text-red-500">Error: {error.message}</p>;

  return (
    <div className="p-5">
      <h1 className="font-bold mb-3">{Capitalize(brandId)} Products</h1>

      {/* products list */}
      <ProductList products={data} />
    </div>
  );
}

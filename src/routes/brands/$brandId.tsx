import { Capitalize } from "@/lib/helper";
import { useQuery } from "@tanstack/react-query";
import { createFileRoute, useParams } from "@tanstack/react-router";
import type { Product } from "../products";

export const Route = createFileRoute("/brands/$brandId")({
  component: RouteComponent,
});

function RouteComponent() {
  const { brandId } = useParams({ from: "/brands/$brandId" });

  const { data, isLoading, error } = useQuery<Product[]>({
    queryKey: ["products"],
    queryFn: async () => {
      const res = await fetch(`https://dummyjson.com/products?limit=194`);
      const allProducts = await res.json();

      return allProducts.products.filter(({ brand }: { brand: string }) => {
        if (brand === undefined) return;

        return brand.toLowerCase() === brandId.toLowerCase();
      }) as Product[];
    },
  });

  console.log(data);

  if (isLoading) return <p className="text-gray-500">Loading...</p>;
  if (error) return <p className="text-red-500">Error: {error.message}</p>;

  return (
    <div className="p-5">
      <h1 className="font-bold mb-3">{Capitalize(brandId)} Products</h1>

      {/* products list */}
    </div>
  );
}

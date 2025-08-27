import { createFileRoute, useParams } from "@tanstack/react-router";
import { ProductList } from "@/components/products/product-list";
import { capitalize } from "@/lib/utils";
import { fetchBrandProducts } from "@/services/brands";
import { useQuery } from "@tanstack/react-query";
import type { Product } from "../products";
import { Seo } from "@/components/seo";
import { Layout } from "@/components/layout";

export const Route = createFileRoute("/brands/$brandId")({
  component: RouteComponent,
});

function RouteComponent() {
  const { brandId } = useParams({ from: "/brands/$brandId" });

  const { data, isLoading, error } = useQuery({
    queryKey: ["products", "brand", brandId],
    queryFn: () => fetchBrandProducts(brandId),
  });

  const header = `${capitalize(brandId)} Product${(data?.length as number) > 1 ? "s" : ""}`;

  if (isLoading) return <p className="text-gray-500">Loading...</p>;
  if (error) return <p className="text-red-500">Error: {error.message}</p>;

  return (
    <div className="p-5">
      <Seo
        title={header}
        description={`Explore ${capitalize(brandId)} products at K-Style Hub`}
      />

      <Layout header={header} total={data as Product[]}>
        <ProductList products={data as Product[]} />
      </Layout>
    </div>
  );
}

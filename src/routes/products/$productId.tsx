import { createFileRoute, useParams } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import fetcher from "@/lib/fetcher";
import type { Product } from "@/routes/products";
import { formatPrice } from "@/lib/utils";
import { Stars } from "@/components/stars";
import { Button } from "@/components/ui/button";
import { Seo } from "@/components/seo";

export const Route = createFileRoute("/products/$productId")({
  component: RouteComponent,
});

function RouteComponent() {
  const { productId } = useParams({ from: "/products/$productId" });
  const [id] = productId.split("-");

  const { data, isLoading } = useQuery({
    queryKey: ["product", id],
    queryFn: () => fetcher<Product>(`/products/${id}`),
  });

  if (isLoading) return <p className="text-gray-500">Loading...</p>;

  if (!data) {
    return (
      <div className="flex justify-center items-center h-[50vh]">
        <span className="text-red-500">Product not found</span>
      </div>
    );
  }

  const {
    title,
    thumbnail,
    price,
    description,
    rating,
    category,
    brand,
    stock,
  } = data;

  return (
    <div className="p-5 md:p-10 max-w-6xl mx-auto">
      <Seo title={title} description={description} />

      <div className="flex flex-col md:flex-row gap-8">
        <div className="flex-shrink-0 md:w-1/3">
          <img
            src={thumbnail}
            alt={title}
            loading="lazy"
            className="mx-auto object-cover rounded-lg border border-primary shadow-sm"
          />
        </div>

        <div className="flex-1 flex flex-col gap-4">
          <h1 className="text-2xl md:text-3xl font-bold text-primary">
            {title}
          </h1>
          <p className="text-gray-500 font-medium">{brand}</p>
          <p className="text-gray-500 uppercase tracking-wide text-sm">
            {category}
          </p>

          <div className="flex items-center gap-2">
            <Stars rating={rating} />
          </div>

          <p className="text-lg font-semibold text-primary">
            {formatPrice(price)}
          </p>

          {stock !== undefined && (
            <p
              className={`font-medium ${stock > 0 ? "text-green-800" : "text-red-800"}`}
            >
              {stock > 0 ? `${stock} available` : "Out of stock"}
            </p>
          )}

          <p className="text-gray-700 mt-2">{description}</p>

          <div className="mt-4 flex flex-wrap gap-3">
            <Button>Add to Cart</Button>
            <Button variant="outline">Buy Now</Button>
          </div>
        </div>
      </div>
    </div>
  );
}

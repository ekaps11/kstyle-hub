import { createFileRoute, useParams } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import fetcher from "@/lib/fetcher";
import type { Product } from "@/routes/products";
import { formatPrice } from "@/lib/helper";
import { Stars } from "@/components/stars";

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
        <span className="text-red-500">Produk tidak ditemukan</span>
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
      <div className="flex flex-col md:flex-row gap-8">
        <div className="flex-shrink-0 md:w-1/3">
          <img
            src={thumbnail}
            alt={title}
            loading="lazy"
            className="mx-auto object-cover rounded-lg border border-gray-300 shadow-sm"
          />
        </div>

        <div className="flex-1 flex flex-col gap-4">
          <h1 className="text-2xl md:text-3xl font-bold text-pink-500">
            {title}
          </h1>
          <p className="text-gray-500 font-medium">{brand}</p>
          <p className="text-gray-400 uppercase tracking-wide text-sm">
            {category}
          </p>

          <div className="flex items-center gap-2">
            <Stars rating={rating} />
          </div>

          <p className="text-lg font-semibold text-pink-500">
            {formatPrice(price)}
          </p>

          {stock !== undefined && (
            <p
              className={`font-medium ${stock > 0 ? "text-green-600" : "text-red-600"}`}
            >
              {stock > 0 ? `${stock} available` : "Out of stock"}
            </p>
          )}

          <p className="text-gray-700 mt-2">{description}</p>

          <div className="mt-4 flex flex-wrap gap-3">
            <button className="bg-pink-500 text-white font-semibold py-2 px-4 rounded hover:bg-pink-600 transition">
              Add to Cart
            </button>
            <button className="border border-pink-500 text-pink-500 font-semibold py-2 px-4 rounded hover:bg-pink-50 transition">
              Buy Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

import { createSlug, formatPrice } from "@/lib/helper";
import type { Product } from "@/routes/products";
import { useNavigate } from "@tanstack/react-router";

export function ProductCard({
  item: { id, thumbnail, title, price },
}: {
  item: Product;
}) {
  const navigate = useNavigate();

  return (
    <div
      key={id}
      className="border border-pink-500 rounded-lg p-3 shadow hover:shadow-lg cursor-pointer"
      onClick={() =>
        navigate({
          to: `/products/$productId`,
          params: { productId: `${id}-${createSlug(title)}` },
        })
      }
    >
      <img
        src={thumbnail}
        alt={title}
        className="h-32 object-contain mx-auto"
        loading="lazy"
      />
      <h2 className="text-sm font-semibold mt-2 line-clamp-2 text-pink-500">
        {title}
      </h2>
      <p className="text-gray-700 font-bold">{formatPrice(price)}</p>
    </div>
  );
}

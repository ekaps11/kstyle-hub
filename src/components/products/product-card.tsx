import { createSlug, formatPrice } from "@/lib/utils";
import type { Product } from "@/routes/products";
import { useNavigate } from "@tanstack/react-router";

type ProductCardProps = {
  item: Product;
};

export function ProductCard({
  item: { id, title, price, thumbnail },
}: ProductCardProps) {
  const navigate = useNavigate();

  return (
    <div
      key={id}
      className="border border-primary rounded-lg p-3 shadow hover:shadow-lg cursor-pointer"
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

      <h2 className="text-sm font-semibold mt-2 line-clamp-2 text-primary">
        {title}
      </h2>

      <p className="text-gray-700 font-bold">{formatPrice(price)}</p>
    </div>
  );
}

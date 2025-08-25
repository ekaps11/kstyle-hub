import fetcher from "@/lib/fetcher";
import type { Product } from "@/routes/products";

export const PRODUCT_CATEGORIES = [
  "beauty",
  "fragrances",
  "skin-care",
  "sunglasses",
  "womens-bags",
  "womens-dresses",
  "womens-jewellery",
  "womens-shoes",
  "womens-watches",
];

export async function fetchProducts(): Promise<{ products: Product[] }> {
  const responses = await Promise.all(
    PRODUCT_CATEGORIES.map((cat) =>
      fetcher<{ products: Product[] }>(`/products/category/${cat}`)
    )
  );

  return { products: responses.flatMap((item) => item.products) };
}

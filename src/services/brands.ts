import type { Product } from "@/routes/products";
import fetcher from "@/lib/fetcher";
import { PRODUCT_CATEGORIES } from "./products";

export async function fetchBrands() {
  const res = await fetcher<{ products: Product[] }>(`/products?limit=194`);

  return [
    ...new Set(
      res.products
        ?.map((item: Product) =>
          PRODUCT_CATEGORIES.includes(item.category) ? item.brand : null
        )
        .filter(Boolean)
    ),
  ] as string[];
}

export async function fetchBrandProducts(brandId: string) {
  const res = await fetcher<{ products: Product[] }>(
    `/products?brand=${brandId}&limit=194`
  );

  return (
    res.products.filter((item) => item.brand?.toLowerCase() === brandId) || []
  );
}

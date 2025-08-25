import type { Product } from "@/routes/products";
import { PRODUCT_CATEGORIES } from "./products";

export async function fetchBrands(brand: string) {
  const res = await fetch("https://dummyjson.com/products?limit=194");
  const data = await res.json();

  return brand
    ? data.products.filter((item: Product) =>
        PRODUCT_CATEGORIES.includes(item.category)
      )
    : (data.products.filter(
        ({ brand }: { brand: string }) =>
          brand.toLowerCase() === brand.toLowerCase()
      ) as Product[]);
}

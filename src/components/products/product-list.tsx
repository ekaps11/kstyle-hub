import type { Product } from "@/routes/products";
import { ProductCard } from "./product-card";

export function ProductList({ products }: { products: Product[] | undefined }) {
  return (
    <main className="grid grid-cols-2 md:grid-cols-4 xl:grid-cols-5 gap-4">
      {products?.map((item) => (
        <ProductCard key={item.id} item={item} />
      ))}
    </main>
  );
}

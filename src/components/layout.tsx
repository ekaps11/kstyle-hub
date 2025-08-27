import type { Product } from "@/routes/products";

type LayoutProps = {
  header: string;
  children: React.ReactNode;
  total: Product[] | string[];
};

export function Layout({ header, children, total }: LayoutProps) {
  return (
    <>
      <h1 className="font-bold mb-3">{header}</h1>
      {children}
      <p className="mx-auto text-gray-500 text-center mt-1">
        total products: {total.length}
      </p>
    </>
  );
}

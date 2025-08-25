import {
  createFileRoute,
  useNavigate,
  useSearch,
} from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { CustomPagination } from "@/components/custom-pagination";
import { fetchBrands } from "@/services/brands";

export const Route = createFileRoute("/brands/")({
  component: RouteComponent,
  validateSearch: (search) => ({
    page: search.page ? Number(search.page) : 1,
  }),
});

function RouteComponent() {
  const navigate = useNavigate({ from: "/brands" });
  const search = useSearch({ from: "/brands/" });
  const page = search.page ?? 1;
  const perPage = 12;

  const { data, isLoading, error } = useQuery({
    queryKey: ["products", "brand"],
    queryFn: fetchBrands,
  });

  const totalPages = Math.ceil((data?.length || 0) / perPage);

  const paginatedProducts =
    data?.slice((page - 1) * perPage, page * perPage) || [];

  if (isLoading) return <p className="text-gray-500">Loading...</p>;
  if (error) return <p className="text-red-500">Error: {error.message}</p>;

  return (
    <div className="p-5">
      <h1 className="font-bold mb-3">
        Shop by <span className="text-pink-500 underline">Brands</span>
      </h1>

      <main className="grid grid-cols-2 md:grid-cols-4 xl:grid-cols-5 gap-4">
        {paginatedProducts.map((item) => (
          <div
            key={item}
            className="border border-pink-500 rounded-lg p-3 shadow hover:shadow-lg cursor-pointer text-center"
            onClick={() =>
              navigate({
                to: `/brands/$brandId`,
                params: { brandId: item.toLowerCase() },
              })
            }
          >
            <h2 className="text-sm font-semibold mt-2 line-clamp-2 text-pink-500">
              {item}
            </h2>
          </div>
        ))}
      </main>

      <CustomPagination
        page={page}
        totalPages={totalPages}
        onPageChange={(newPage) => {
          navigate({ search: { page: newPage } });
        }}
      />

      <p className="mx-auto text-gray-500 text-center">
        total brands: {data?.length}
      </p>
    </div>
  );
}

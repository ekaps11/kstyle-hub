import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationPrevious,
  PaginationLink,
  PaginationNext,
  PaginationEllipsis,
} from "@/components/ui/pagination";

type ProductPaginationProps = {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

export function CustomPagination({
  page,
  totalPages,
  onPageChange,
}: ProductPaginationProps) {
  if (totalPages <= 1) return null;

  const pages: (number | "...")[] = [];
  pages.push(1);

  const start = Math.max(2, page - 1);
  const end = Math.min(totalPages - 1, page + 1);

  if (start > 2) pages.push("...");
  for (let i = start; i <= end; i++) {
    if (!pages.includes(i)) pages.push(i);
  }
  if (end < totalPages - 1) pages.push("...");
  if (!pages.includes(totalPages)) pages.push(totalPages);

  const hrefFor = (p: number) => `/products/?page=${p}`;

  return (
    <Pagination className="pt-5">
      <PaginationContent className="text-primary">
        <PaginationItem>
          {page > 1 ? (
            <PaginationPrevious
              href={hrefFor(page - 1)}
              aria-label="Previous page"
              onClick={(e) => {
                e.preventDefault();
                onPageChange(page - 1);
              }}
            />
          ) : (
            <PaginationPrevious
              href={hrefFor(page)}
              aria-disabled
              aria-label="Previous page"
              onClick={(e) => e.preventDefault()}
            />
          )}
        </PaginationItem>

        {pages.map((p, idx) =>
          p === "..." ? (
            <PaginationItem key={`ellipsis-${idx}`}>
              <PaginationEllipsis />
            </PaginationItem>
          ) : (
            <PaginationItem key={p}>
              <PaginationLink
                href={hrefFor(p)}
                isActive={page === p}
                aria-current={page === p ? "page" : undefined}
                onClick={(e) => {
                  e.preventDefault();
                  onPageChange(p);
                }}
              >
                {p}
              </PaginationLink>
            </PaginationItem>
          )
        )}

        <PaginationItem>
          {page < totalPages ? (
            <PaginationNext
              href={hrefFor(page + 1)}
              aria-label="Next page"
              onClick={(e) => {
                e.preventDefault();
                onPageChange(page + 1);
              }}
            />
          ) : (
            <PaginationNext
              href={hrefFor(page)}
              aria-disabled
              aria-label="Next page"
              onClick={(e) => e.preventDefault()}
            />
          )}
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}

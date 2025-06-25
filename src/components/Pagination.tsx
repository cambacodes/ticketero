import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { paginatedTicketMetadata } from "@/features/ticket/types";
import { type ParsedSearchParams } from "@/lib/searchParams";

type SearchParams = Awaited<ParsedSearchParams>;
type PageAndSize = {
  page: SearchParams["page"];
  size: SearchParams["size"];
};
type PaginationProps = {
  pagination: PageAndSize;
  onPaginate: (pageAndSize: PageAndSize) => void;
  paginatedTicketMetadata: paginatedTicketMetadata;
};

export default function Pagination({
  pagination,
  onPaginate,
  paginatedTicketMetadata: { count, hasNextPage },
}: PaginationProps) {
  const startOffset = pagination.page;
  const endOffset = Math.ceil(count / pagination.size);

  const label = `Showing ${startOffset} out of ${endOffset}`;

  const handleNextPage = () => {
    onPaginate({ ...pagination, page: pagination.page + 1 });
  };
  const handlePreviousPage = () => {
    onPaginate({ ...pagination, page: pagination.page - 1 });
  };

  const handleChangeSize = (size: string) => {
    const parsedSize = parseInt(size);

    onPaginate({ page: 1, size: parsedSize });
  };

  return (
    <div className="flex justify-between items-center w-full ">
      <p className="text-sm text-muted-foreground">{label}</p>
      <div className="flex gap-x-2">
        <Select
          onValueChange={handleChangeSize}
          defaultValue={pagination.size.toString()}
        >
          <SelectTrigger className="h-[36px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="5">5</SelectItem>
            <SelectItem value="10">10</SelectItem>
            <SelectItem value="25">25</SelectItem>
            <SelectItem value="50">50</SelectItem>
            <SelectItem value="100">100</SelectItem>
          </SelectContent>
        </Select>
        <Button
          variant={"outline"}
          size={"sm"}
          disabled={pagination.page <= 1}
          onClick={handlePreviousPage}
        >
          Previous
        </Button>
        <Button
          variant={"outline"}
          size={"sm"}
          disabled={!hasNextPage}
          onClick={handleNextPage}
        >
          Next
        </Button>
      </div>
    </div>
  );
}

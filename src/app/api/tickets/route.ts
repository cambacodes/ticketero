import { getTickets } from "@/features/ticket/queries/getTickets";
import { searchParamsCache, type ParsedSearchParams } from "@/lib/searchParams";

export async function GET(request: Request) {
  const url = new URL(request.url);

  const parsedSearchParams = searchParamsCache.parse(
    url.searchParams as unknown as ParsedSearchParams
  );
  const userId = url.searchParams.get("userId") ?? "";

  const { list, metadata } = await getTickets(userId, parsedSearchParams);

  return Response.json({ list, metadata });
}

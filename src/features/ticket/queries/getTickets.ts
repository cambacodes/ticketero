import { getSortColumn, getSortDirection } from "@/lib/drizzle";
import { searchParamsCache, type ParsedSearchParams } from "@/lib/searchParams";
import { db } from "@/server/db";
import { ticket } from "@/server/db/schema";
import { and, eq, getTableColumns, ilike, type SQLWrapper } from "drizzle-orm";

export const getTickets = async (
  userId?: string,
  searchParams?: ParsedSearchParams
) => {
  const {
    search,
    sortKey = "createdAt",
    sortValue = "desc",
    page = 1,
    size = 5,
  } = (await searchParamsCache.parse(searchParams!)) ?? {};

  const column = getSortColumn(getTableColumns(ticket), sortKey, "createdAt");
  const orderByDirection = getSortDirection(sortValue, "desc");
  const offset = (page - 1) * size;

  const andConditions: SQLWrapper[] = [];

  if (userId) {
    andConditions.push(eq(ticket.authorId, userId));
  }

  if (search) {
    andConditions.push(ilike(ticket.title, `%${search}%`));
  }

  const [list, total] = await db.transaction(async (tx) => {
    const list = await tx.query.ticket.findMany({
      with: {
        author: {
          columns: {
            id: true,
            name: true,
          },
        },
      },
      where: and(...andConditions),
      orderBy: [orderByDirection(column)],
      limit: size,
      offset: offset,
    });

    const total = await tx.$count(ticket, and(...andConditions));

    return [list, total] as const;
  });

  return {
    list,
    metadata: {
      count: total,
      hasNextPage: offset + list.length < total,
    },
  };
};

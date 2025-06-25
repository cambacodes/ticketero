import { getSortColumn, getSortDirection } from "@/lib/drizzle";
import type { ParsedSearchParams } from "@/lib/searchParams";
import { db } from "@/server/db";
import { ticket } from "@/server/db/schema";
import { and, eq, getTableColumns, ilike } from "drizzle-orm";

export const getTickets = async (
  userId?: string,
  searchParams?: ParsedSearchParams
) => {
  const {
    search,
    sortKey = "createdAt",
    sortValue = "desc",
  } = (await searchParams) ?? {};

  const column = getSortColumn(getTableColumns(ticket), sortKey, "createdAt");
  const orderByDirection = getSortDirection(sortValue, "desc");

  const andConditions = [];

  if (userId) {
    andConditions.push(eq(ticket.authorId, userId));
  }

  if (search) {
    andConditions.push(ilike(ticket.title, `%${search}%`));
  }

  const dbTickets = await db.query.ticket.findMany({
    with: {
      author: {
        columns: {
          id: true,
          name: true,
        },
      },
    },
    where: andConditions.length > 0 ? and(...andConditions) : undefined,
    orderBy: orderByDirection(column),
  });

  return dbTickets;
};

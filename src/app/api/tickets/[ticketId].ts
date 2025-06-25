import { getTicket } from "@/features/ticket/queries/getTicket";

export async function GET(_request: Request, { userId }: { userId: string }) {
  const ticket = await getTicket(userId);
  return Response.json(ticket);
}

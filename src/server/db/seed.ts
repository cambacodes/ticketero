import { db } from "./index";
import { ticket } from "./schema";

const tickets = [
  {
    title: "Ticket 1",
    content: "This is the first ticket from DB",
    deadline: new Date(),
    bounty: 499,
    status: "OPEN" as const,
  },
  {
    title: "Ticket 2",
    content: "This is the second ticket from DB",
    deadline: new Date(),
    bounty: 399,
    status: "DONE" as const,
  },
  {
    title: "Ticket 3",
    content: "This is the third ticket from DB",
    deadline: new Date(),
    bounty: 599,
    status: "IN_PROGRESS" as const,
  },
];

let t0: number;
const main = async () => {
  t0 = performance.now();

  // eslint-disable-next-line drizzle/enforce-delete-with-where
  await db.delete(ticket);

  console.log("db seed started...");
  for (const ticketData of tickets) {
    await db.insert(ticket).values(ticketData);
  }
};

main()
  .catch((e) => {
    console.error("Unexpected error:", e);
    process.exit(1);
  })
  .finally(() => {
    const t1 = performance.now();
    console.log(`db seed finished (${(t1 - t0).toFixed(2)})ms`);
    process.exit(0);
  });

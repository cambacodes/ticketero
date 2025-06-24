/* eslint-disable drizzle/enforce-delete-with-where */
import { hashPassword } from "better-auth/crypto";

import { db } from "./index";
import { account, ticket, user } from "./schema";

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

const main = async () => {
  const t0 = performance.now();

  console.log("🚨 Resetting DB...");
  await db.delete(ticket);
  await db.delete(account);
  await db.delete(user);

  console.log("🔐 Creating admin user...");
  const email = "admin@admin.com";
  const password = "123456789";
  const hashedPassword = await hashPassword(password);

  await db.transaction(async (tx) => {
    const [adminUser] = await tx
      .insert(user)
      .values({
        id: crypto.randomUUID(),
        email,
        name: "Admin",
      })
      .returning();

    if (!adminUser) throw new Error("Failed to insert admin user");

    await tx.insert(account).values({
      id: crypto.randomUUID(),
      accountId: "admin",
      createdAt: new Date(),
      updatedAt: new Date(),
      providerId: "credential",
      password: hashedPassword,
      userId: adminUser.id,
    });

    console.log("🎟️  Inserting test tickets...");
    for (const ticketData of tickets) {
      await tx.insert(ticket).values({
        ...ticketData,
        authorId: adminUser.id,
      });
    }
  });

  const t1 = performance.now();
  console.log(`✅ DB seeded in ${(t1 - t0).toFixed(2)}ms`);
};

main()
  .catch((e) => {
    console.error("❌ Seed failed:", e);
    process.exit(1);
  })
  .finally(() => process.exit(0));

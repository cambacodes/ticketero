import { hashPassword } from "better-auth/crypto";

import { account, invitation, member, organization, user } from "./auth-schema";
import { db } from "./index";
import { resetDatabase } from "./reset";
import { ticket } from "./schema";

const orgNames = ["Alpha Org", "Beta Org", "Gamma Org"];
const orgSlugs = ["alpha-org", "beta-org", "gamma-org"];

const ticketStatus = ["OPEN", "DONE", "IN_PROGRESS"] as const;

type Organization = {
  name: string;
  slug?: string | null;
  id: string;
};

const generateTickets = (
  organizations: Organization[],
  users: { id: string }[]
) => {
  return users.flatMap((user) =>
    organizations.flatMap((organization) =>
      ticketStatus.map((status, index) => ({
        title: `Ticket #${index}`,
        content: `This is the ${status} ticket from Organization ${organization.name}`,
        deadline: new Date(),
        bounty: Math.floor(Math.random() * (10000 - 500 + 1) + 500),
        status,
        organizationId: organization.id,
        authorId: user.id,
      }))
    )
  );
};

const main = async () => {
  const t0 = performance.now();

  console.log("🚨 Resetting DB...");
  await resetDatabase("delete");

  console.log(
    "🔐 Creating users and organizations with complete Better Auth structure..."
  );

  const password = "123456789";
  const hashedPassword = await hashPassword(password);

  // Define user data outside transaction for logging
  const userData = [
    { id: crypto.randomUUID(), name: "Admin", email: "admin@admin.com" },
    { id: crypto.randomUUID(), name: "User", email: "user@user.com" },
    { id: crypto.randomUUID(), name: "Developer", email: "dev@dev.com" },
  ];

  // Create users and organizations using Drizzle but with complete Better Auth structure
  await db.transaction(async (tx) => {
    // Clean up existing data first
    // console.log("🧹 Cleaning up existing data...");
    // await tx.delete(ticket);
    // await tx.delete(invitation);
    // await tx.delete(member);
    // await tx.delete(organization);
    // await tx.delete(account);
    // await tx.delete(user);

    // Insert users
    const insertedUsers = await tx.insert(user).values(userData).returning();

    // Insert accounts with proper Better Auth structure
    await tx.insert(account).values(
      insertedUsers.map((u) => ({
        id: crypto.randomUUID(),
        accountId: u.email,
        providerId: "credential",
        createdAt: new Date(),
        updatedAt: new Date(),
        password: hashedPassword,
        userId: u.id,
      }))
    );

    // Create organizations
    const orgData = orgNames.map((name, idx) => ({
      id: crypto.randomUUID(),
      name,
      slug: orgSlugs[idx],
      createdAt: new Date(),
      metadata: null,
    }));

    const insertedOrganizations = await tx
      .insert(organization)
      .values(orgData)
      .returning();

    // Add all users as members to each organization
    for (const org of insertedOrganizations) {
      for (const user of insertedUsers) {
        await tx.insert(member).values({
          id: crypto.randomUUID(),
          organizationId: org.id,
          userId: user.id,
          role: user.name === "Admin" ? "admin" : "member",
          createdAt: new Date(),
        });
      }
    }

    // Create invitations for Better Auth (required for organization functionality)
    // Create some sample invitations to demonstrate the invitation system
    for (const org of insertedOrganizations) {
      // Create invitations from Admin user to other users
      const adminUser = insertedUsers.find((u) => u.name === "Admin");
      if (adminUser) {
        // Create invitations for external users (not in our system yet)
        const externalEmails = [
          "external1@example.com",
          "external2@example.com",
          "external3@example.com",
        ];

        for (const email of externalEmails) {
          await tx.insert(invitation).values({
            id: crypto.randomUUID(),
            organizationId: org.id,
            email,
            role: "member",
            status: "pending",
            expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days from now
            inviterId: adminUser.id,
          });
        }

        // Create some accepted invitations (for users who joined)
        const acceptedEmails = [
          "accepted1@example.com",
          "accepted2@example.com",
        ];

        for (const email of acceptedEmails) {
          await tx.insert(invitation).values({
            id: crypto.randomUUID(),
            organizationId: org.id,
            email,
            role: "member",
            status: "accepted",
            expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
            inviterId: adminUser.id,
          });
        }

        // Create some expired invitations
        const expiredEmails = ["expired1@example.com", "expired2@example.com"];

        for (const email of expiredEmails) {
          await tx.insert(invitation).values({
            id: crypto.randomUUID(),
            organizationId: org.id,
            email,
            role: "member",
            status: "pending",
            expiresAt: new Date(Date.now() - 24 * 60 * 60 * 1000), // 1 day ago
            inviterId: adminUser.id,
          });
        }
      }
    }

    console.log("🎟️  Inserting test tickets...");
    const ticketData = generateTickets(insertedOrganizations, insertedUsers);
    await tx.insert(ticket).values(ticketData);
  });

  const t1 = performance.now();
  console.log(`✅ DB seeded in ${(t1 - t0).toFixed(2)}ms`);
  console.log(
    `📊 Created ${userData.length} users and ${orgNames.length} organizations`
  );
  console.log("🔐 Complete Better Auth structure with invitations created");
  console.log("📧 Sample invitations created for demonstration");
};

main()
  .catch((e) => {
    console.error("❌ Seed failed:", e);
    process.exit(1);
  })
  .finally(() => process.exit(0));

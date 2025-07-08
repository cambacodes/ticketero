import Heading from "@/components/Heading";
import { Button } from "@/components/ui/button";
import { getAuthSessionOrRedirect } from "@/features/auth/actions/getAuth";
import MembershipTable from "@/features/organization/components/MembershipTable";
import { getOrganization } from "@/features/organization/queries/getOrganization";
import type {
  InvitationStatus,
  MemberRole,
} from "@/features/organization/types";
import { organizationEditPath } from "@/routes";
import { format } from "date-fns";
import { LucidePen } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

interface OrganizationPageProps {
  params: Promise<{
    organizationSlug: string;
  }>;
}

const OrganizationPage = async ({ params }: OrganizationPageProps) => {
  const pathParams = await params;
  const organization = await getOrganization(pathParams.organizationSlug);
  if (!organization) {
    notFound();
  }
  // Get current user
  const { user } = await getAuthSessionOrRedirect();
  // Map members to Member type
  const members = organization.members.map((m) => ({
    id: m.id,
    userId: m.userId,
    organizationId: m.organizationId,
    name: m.user.name,
    email: m.user.email,
    role:
      m.role === "owner"
        ? "owner"
        : m.role === "admin"
          ? "admin"
          : ("user" as MemberRole),
    createdAt:
      typeof m.createdAt === "string"
        ? m.createdAt
        : new Date(m.createdAt).toISOString(),
  }));
  // Map invitations to Invitation type
  const invitations = (organization.invitations || []).map((inv) => ({
    id: inv.id,
    organizationId: inv.organizationId,
    email: inv.email,
    role:
      inv.role === "owner"
        ? "owner"
        : inv.role === "admin"
          ? "admin"
          : ("user" as MemberRole),
    status: inv.status as InvitationStatus,
    expiresAt:
      typeof inv.expiresAt === "string"
        ? inv.expiresAt
        : new Date(inv.expiresAt).toISOString(),
    inviterId: inv.inviterId,
  }));
  // Find current user's membership
  const membership = members.find((m) => m.userId === user.id) ?? {
    userId: user.id,
    role: "user" as MemberRole,
  };
  return (
    <div className="flex-1 flex flex-col gap-y-8">
      <Heading
        title={organization.name}
        description={`Organization details for ${organization.name}`}
        actions={
          <Button asChild>
            <Link href={organizationEditPath(pathParams.organizationSlug)}>
              <LucidePen className="w-4 h-4" />
              Edit Organization
            </Link>
          </Button>
        }
      />
      <div className="grid gap-6">
        <div className="grid gap-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h3 className="text-sm font-medium text-muted-foreground">
                Slug
              </h3>
              <p className="text-sm">{organization.slug}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-muted-foreground">
                Created At
              </h3>
              <p className="text-sm">
                {format(new Date(organization.createdAt), "yyyy-MM-dd, HH:mm")}
              </p>
            </div>
          </div>
          <div>
            <h3 className="text-sm font-medium text-muted-foreground">
              Members
            </h3>
            <p className="text-sm">{members.length} members</p>
          </div>
          {organization.logo && (
            <div>
              <h3 className="text-sm font-medium text-muted-foreground">
                Logo
              </h3>
              <Image
                sizes="(max-width: 768px) 100vw, 33vw"
                src={organization.logo}
                alt={`${organization.name} logo`}
                className="w-16 h-16 object-contain"
              />
            </div>
          )}
        </div>
      </div>
      {/* Membership management table */}
      <MembershipTable
        organizationId={organization.id}
        members={members}
        invitations={invitations}
        membership={membership}
      />
    </div>
  );
};

export default OrganizationPage;

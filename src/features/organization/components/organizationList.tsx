"use client";

import SubmitButton from "@/components/form/SubmitButton";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { CanI } from "@/lib/auth/CanI";
import { organizationEditPath, organizationPath } from "@/routes";
import { type InvitationStatus } from "better-auth/plugins";
import { format } from "date-fns";
import {
  LucideArrowLeftRight,
  LucideArrowUpRightFromSquare,
  LucidePen,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { switchActiveOrganization } from "../actions/switchActiveOrganization";
import { OrganizationDeleteButton } from "./OrganizationDeleteButton";
import { OrganizationLeaveButton } from "./OrganizationLeaveButton";

type OrganizationListProps = {
  organizations: {
    isActive: boolean;
    members: {
      id: string;
      organizationId: string;
      role: "user" | "admin" | "owner";
      createdAt: Date;
      userId: string;
      user: {
        email: string;
        name: string;
        image?: string | undefined;
      };
    }[];
    invitations: {
      id: string;
      organizationId: string;
      email: string;
      role: "user" | "admin" | "owner";
      status: InvitationStatus;
      inviterId: string;
      expiresAt: Date;
    }[];
    id: string;
    name: string;
    createdAt: Date;
    slug: string;
    logo?: string | null | undefined;
    role: "user" | "admin" | "owner";
  }[];
};
const OrganizationList = ({ organizations }: OrganizationListProps) => {
  const router = useRouter();
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Slug</TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Created At</TableHead>
          <TableHead>Members</TableHead>
          <TableHead className="flex justify-end mr-15">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {organizations?.map((organization) => {
          if (!organization?.slug) {
            return null;
          }
          const switchButton = (
            <form
              action={switchActiveOrganization.bind(null, organization.slug)}
            >
              <SubmitButton
                variant={organization.isActive ? "default" : "outline"}
                disabled={organization.isActive}
                onSuccess={() => router.refresh()}
                label={organization.isActive ? "Active" : "Switch"}
                icon={<LucideArrowLeftRight className="w-4 h-4" />}
              />
            </form>
          );

          const detailButton = (
            <Button variant="outline" size="icon" asChild>
              <Link href={organizationPath(organization.slug)}>
                <LucideArrowUpRightFromSquare className="w-4 h-4" />
              </Link>
            </Button>
          );

          const editButton = (
            <Button variant="outline" size="icon">
              <Link href={organizationEditPath(organization.slug)}>
                <LucidePen className="w-4 h-4" />
              </Link>
            </Button>
          );

          const deleteButton = (
            <OrganizationDeleteButton
              organizationName={organization?.name}
              organizationSlug={organization?.slug}
            />
          );
          const leaveButton = (
            <OrganizationLeaveButton
              organizationName={organization?.name}
              organizationSlug={organization?.slug}
            />
          );

          const buttons = (
            <>
              {switchButton}
              <CanI
                role={organization.role}
                action="update"
                permission="organization"
              >
                {detailButton}
                {editButton}
              </CanI>
              <CanI
                role={organization.role}
                action="delete"
                permission="organization"
              >
                {deleteButton}
              </CanI>
              {leaveButton}
            </>
          );

          return (
            <TableRow key={organization?.id}>
              <TableCell>{organization?.slug}</TableCell>
              <TableCell>{organization?.name}</TableCell>
              <TableCell>
                {format(
                  organization?.createdAt ?? new Date(),
                  "yyyy-MM-dd, HH:mm"
                )}
              </TableCell>
              <TableCell>{organization?.members.length}</TableCell>
              <TableCell className="flex justify-end gap-x-2">
                {buttons}
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
};

export { OrganizationList };

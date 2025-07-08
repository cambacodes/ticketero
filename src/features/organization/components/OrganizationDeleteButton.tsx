"use client";

import ConfirmDialog from "@/components/ConfirmDialog";
import { Button } from "@/components/ui/button";
import { LucideTrash } from "lucide-react";
import { useRouter } from "next/navigation";

import { deleteOrganization } from "../actions/deleteOrganization";

interface OrganizationDeleteButtonProps {
  organizationSlug: string;
  organizationName: string;
}

const OrganizationDeleteButton = ({
  organizationSlug,
  organizationName,
}: OrganizationDeleteButtonProps) => {
  const router = useRouter();
  return (
    <ConfirmDialog
      title="Delete Organization"
      onSuccess={() => router.refresh()}
      description={`Are you sure you want to delete "${organizationName}"? This action cannot be undone.`}
      trigger={
        <Button variant="destructive" size="icon">
          <LucideTrash className="w-4 h-4" />
        </Button>
      }
      action={deleteOrganization.bind(null, organizationSlug)}
    />
  );
};

export { OrganizationDeleteButton };

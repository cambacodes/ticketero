"use client";

import ConfirmDialog from "@/components/ConfirmDialog";
import { Button } from "@/components/ui/button";
import { LucideDoorOpen } from "lucide-react";
import { useRouter } from "next/navigation";

import { leaveOrganization } from "../actions/leaveOrganization";

interface OrganizationLeaveProps {
  organizationSlug: string;
  organizationName: string;
}

const OrganizationLeaveButton = ({
  organizationSlug,
  organizationName,
}: OrganizationLeaveProps) => {
  const router = useRouter();
  return (
    <ConfirmDialog
      title="Leave Organization"
      onSuccess={() => router.refresh()}
      description={`Are you sure you want to leave "${organizationName}"? This action cannot be undone.`}
      trigger={
        <Button variant="secondary" size="icon">
          <LucideDoorOpen className="w-4 h-4" />
        </Button>
      }
      action={leaveOrganization.bind(null, organizationSlug)}
    />
  );
};

export { OrganizationLeaveButton };

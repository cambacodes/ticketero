import CardCompact from "@/components/CardCompact";
import { OrganizationEditForm } from "@/features/organization/components/OrganizationEditForm";
import { getOrganization } from "@/features/organization/queries/getOrganization";
import { notFound } from "next/navigation";

interface EditOrganizationPageProps {
  params: Promise<{
    organizationSlug: string;
  }>;
}

const EditOrganizationPage = async ({ params }: EditOrganizationPageProps) => {
  const pathParams = await params;
  const organization = await getOrganization(pathParams.organizationSlug);

  if (!organization) {
    notFound();
  }

  return (
    <div className="flex-1 flex flex-col justify-center items-center">
      <CardCompact
        title="Edit organization"
        description="Update your organization details"
        className="w-full max-w-[420px] animate-fade-from-top"
        content={<OrganizationEditForm organization={organization} />}
      />
    </div>
  );
};

export default EditOrganizationPage;

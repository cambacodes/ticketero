import Heading from "@/components/Heading";
import { Button } from "@/components/ui/button";
import { getOrganization } from "@/features/organization/queries/getOrganization";
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
            <p className="text-sm">{organization.members.length} members</p>
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
    </div>
  );
};

export default OrganizationPage;

import { Suspense } from "react";

import Heading from "@/components/Heading";
import Spinner from "@/components/Spinner";
import { Button } from "@/components/ui/button";
import { OrganizationList } from "@/features/organization/components/organizationList";
import { organizationCreatePath } from "@/routes";
import { LucidePlus } from "lucide-react";
import Link from "next/link";

const OrganizationPage = () => {
  return (
    <div className="flex-1 flex flex-col gap-y-8">
      <Heading
        title="Organizations"
        description="All your organizations"
        actions={
          <Button asChild>
            <Link href={organizationCreatePath()}>
              <LucidePlus className="w-4 h-4" />
              Create Organization
            </Link>
          </Button>
        }
      />

      <Suspense fallback={<Spinner />}>
        <OrganizationList />
      </Suspense>
    </div>
  );
};

export default OrganizationPage;

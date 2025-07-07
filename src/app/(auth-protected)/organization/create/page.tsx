import CardCompact from "@/components/CardCompact";
import { OrganizationCreateForm } from "@/features/organization/components/OrganizationCreateForm";

const CreateOrganizationPage = () => {
  return (
    <div className="flex-1 flex flex-col justify-center items-center">
      <CardCompact
        title="Create organization"
        description="Create an new organization for your team"
        className="w-full max-w-[420px] animate-fade-from-top"
        content={<OrganizationCreateForm />}
      />
    </div>
  );
};

export default CreateOrganizationPage;

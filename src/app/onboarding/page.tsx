import CardCompact from "@/components/CardCompact";
import { OrganizationCreateForm } from "@/features/organization/components/OrganizationCreateForm";

const OnboardingPage = () => {
  return (
    <div className="flex-1 flex flex-col justify-center items-center">
      <CardCompact
        title="Create organization"
        description="Create an organization to get started"
        className="w-full max-w-[420px] animate-fade-from-top"
        content={<OrganizationCreateForm />}
      />
    </div>
  );
};

export default OnboardingPage;

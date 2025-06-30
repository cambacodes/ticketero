import CardCompact from "@/components/CardCompact";
import { PasswordResetForm } from "@/features/auth/components/PasswordResetForm";

type PasswordResetPageProps = {
  params: Promise<{ token: string }>;
};

export default async function PasswordResetPage({
  params,
}: PasswordResetPageProps) {
  const { token } = await params;
  return (
    <div className="flex-1 flex flex-col justify-center items-center">
      <CardCompact
        title="New Password"
        description="Enter a new password for your account"
        className="w-full max-w-[420px] animate-fade-from-top"
        content={<PasswordResetForm token={token} />}
      />
    </div>
  );
}

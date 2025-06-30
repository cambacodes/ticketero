import CardCompact from "@/components/CardCompact";
import Heading from "@/components/Heading";
import { AccountTabs } from "@/features/account/components/AccountTabs";
import { PasswordChangeForm } from "@/features/auth/components/PasswordChangeForm";

export default function PasswordPage() {
  return (
    <div className="flex-1 flex flex-col gap-y-8">
      <Heading
        title="Password"
        description="Keep ypur account secure"
        tabs={<AccountTabs />}
      />

      <div className="flex-1 flex flex-col justify-start items-center">
        <CardCompact
          title="Forgot Password"
          description="Enter your email address to reset your password"
          className="w-full max-w-[420px] animate-fade-from-top"
          content={<PasswordChangeForm />}
        />
      </div>
    </div>
  );
}

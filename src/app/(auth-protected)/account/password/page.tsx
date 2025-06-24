import CardCompact from "@/components/CardCompact";
import Heading from "@/components/Heading";
import { AccountTabs } from "@/features/account/components/AccountTabs";

export default function PasswordPage() {
  return (
    <div className="flex-1 flex flex-col gap-y-8">
      <Heading
        title="Password"
        description="Keep ypur account secure"
        tabs={<AccountTabs />}
      />

      <div className="flex-1 flex flex-col items-center">
        <CardCompact
          title="Change Password"
          description="Enter your current password"
          className="w-full max-w-[420px] animate-fade-from-top"
          content={"asdf|"}
        />
      </div>
    </div>
  );
}

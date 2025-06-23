import CardCompact from "@/components/CardCompact";
import SignUpForm from "@/features/auth/components/SignUpForm";
import { signInPath } from "@/routes";
import Link from "next/link";

export default function SignUpPage() {
  return (
    <div className="flex-1 flex flex-col justify-center items-center">
      <CardCompact
        className="w-full max-w-[420px] animate-fade-from-top"
        title="Sign up"
        description="Create an account to get started"
        content={<SignUpForm />}
        footer={
          <div className="flex justify-end  w-full gap-x-2">
            <Link href={signInPath()} className="text-sm hover:underline">
              Already have an account? Sign in now.
            </Link>
          </div>
        }
      />
    </div>
  );
}

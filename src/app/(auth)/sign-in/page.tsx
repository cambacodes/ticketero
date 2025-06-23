import CardCompact from "@/components/CardCompact";
import SignInForm from "@/features/auth/components/SignInForm";
import { forgotPasswordPath, signInPath } from "@/routes";
import Link from "next/link";

export default function SignInPage() {
  return (
    <div className="flex-1 flex flex-col justify-center items-center">
      <CardCompact
        className="w-full max-w-[420px] animate-fade-from-top"
        title="Sign in"
        description="Sign in to your account"
        content={<SignInForm />}
        footer={
          <div className="flex justify-between  w-full gap-x-2">
            <Link href={signInPath()} className="text-sm hover:underline">
              {`Don't have an account?`}
            </Link>
            <Link
              href={forgotPasswordPath()}
              className="text-sm hover:underline"
            >
              {`Forgot your password?`}
            </Link>
          </div>
        }
      />
    </div>
  );
}

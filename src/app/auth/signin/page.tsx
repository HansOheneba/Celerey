import AuthLayout from "@/Features/auth/components/templates/authLayout";
import { SignInTemplate } from "@/Features/auth/components/templates/signinTemplate";

export default function SignInPage() {
  return (
    <AuthLayout>
      <SignInTemplate />
    </AuthLayout>
  );
}

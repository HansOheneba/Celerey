import AuthLayout from "@/Features/auth/components/templates/authLayout";
import { SignUpTemplate } from "@/Features/auth/components/templates/signupTemplate";

export default function SignInPage() {
  return (
    <AuthLayout>
      <SignUpTemplate />
    </AuthLayout>
  );
}

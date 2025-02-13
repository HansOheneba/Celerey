import AuthLayout from "@/Features/auth/components/templates/authLayout";
import { SignupOTPTemplate } from "@/Features/auth/components/templates/signupOtpTemplate";

export default function OTPPage() {
  return (
    <AuthLayout>
      <SignupOTPTemplate />
    </AuthLayout>
  );
}

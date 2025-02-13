import AuthLayout from "@/Features/auth/components/templates/authLayout";
import { OTPTemplate } from "@/Features/auth/components/templates/otpTemplate";

export default function OTPPage() {
  return (
    <AuthLayout>
      <OTPTemplate />
    </AuthLayout>
  );
}

import { Button } from "@/components/ui/button";
import Image from "next/image";
import { SocialSignupButtonProps } from "../../types";

export const SocialSignupButton = ({
  provider,
  onClick,
}: SocialSignupButtonProps) => {
  const text =
    provider === "google" ? "signup with Google" : "signup with LinkedIn";
  const icon =
    provider === "google"
      ? "/assets/googleLogo.svg"
      : "/assets/linkedinLogo.svg";

  return (
    <Button
      variant="outline"
      className="w-full flex items-center justify-center gap-2 mb-2"
      onClick={onClick}
    >
      <Image src={icon} alt={provider} width={20} height={20} />
      <span className="text-sm font-helvetica">{text}</span>
    </Button>
  );
};

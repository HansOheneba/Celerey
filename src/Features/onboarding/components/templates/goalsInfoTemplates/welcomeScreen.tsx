import { Button } from "@/components/ui/button";

export const WelcomeScreen = ({ onContinue }: { onContinue: () => void }) => (
  <div className="text-center max-w-xl mx-auto my-auto">
    <h1 className="text-4xl font-cirka mb-6">
      Thanks for providing your financial information. What&apos;s on the
      horizon for you?
    </h1>
    <Button
      onClick={onContinue}
      className="md:w-[380px] w-full bg-navy text-white hover:bg-navyLight px-8"
    >
      Let&apos;s Get Started
    </Button>

    <p className="text-gray-500 mt-6 font-thin">Tell us your goals and aspirations</p>
  </div>
);

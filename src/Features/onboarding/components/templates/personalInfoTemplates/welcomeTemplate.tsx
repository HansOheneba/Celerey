import { Button } from "@/components/ui/button";

export const WelcomeTemplate = ({ onStart }: { onStart: () => void }) => (
  <div className="text-center max-w-xl mx-auto my-auto">
    <h1 className="text-4xl font-cirka mb-6">Welcome to Celerey</h1>
    <p className="text-gray-600 mb-12 font-helvetica text-sm">
      To be able to assist you in making informed decisions about your wealth,
      <br></br>
      we need to know some basic information that will ensure the Celerey&apos;s
      <br></br>
      financial modelling fits your personal situation, ambition and goals
    </p>
    <Button
      onClick={onStart}
      className="md:w-[380px] w-full bg-navy text-white hover:bg-navyLight px-8"
    >
      Let&apos;s Get Started
    </Button>
  </div>
);

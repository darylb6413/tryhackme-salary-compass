import { CompensationCalculator } from "@/components/CompensationCalculator";

const Compensation = () => {
  return (
    <div className="min-h-screen bg-background py-16 md:py-24">
      <CompensationCalculator />
      <footer className="text-center mt-16 pb-8">
        <p className="text-xs text-muted-foreground">
          © {new Date().getFullYear()} TryHackMe. All rights reserved.
        </p>
      </footer>
    </div>
  );
};

export default Compensation;

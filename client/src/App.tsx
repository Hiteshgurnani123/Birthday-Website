import { BirthdayPage } from "@/pages/BirthdayPage";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";

function App() {
  return (
    <TooltipProvider>
      <Toaster />
      <BirthdayPage />
    </TooltipProvider>
  );
}

export default App;

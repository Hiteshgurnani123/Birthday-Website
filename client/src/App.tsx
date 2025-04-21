import { Route, Switch } from "wouter";
import { BirthdayPage } from "@/pages/BirthdayPage";
import { MessagesPage } from "@/pages/MessagesPage";
import { GalleryPage } from "@/pages/GalleryPage";
import { HuntPage } from "@/pages/HuntPage";
import NotFound from "@/pages/not-found";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { PromisesPage } from "@/pages/PromisesPage"; //Import the new page component


function App() {
  return (
    <TooltipProvider>
      <Toaster />
      <Switch>
        <Route path="/" component={BirthdayPage} />
        <Route path="/messages" component={MessagesPage} />
        <Route path="/gallery" component={GalleryPage} />
        <Route path="/hunt" component={HuntPage} />
        <Route path="/promises" component={PromisesPage} /> {/* Added route for PromisesPage */}
        <Route component={NotFound} />
      </Switch>
    </TooltipProvider>
  );
}

export default App;
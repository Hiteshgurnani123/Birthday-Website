import { Route, Switch } from "wouter";
import { BirthdayPage } from "@/pages/BirthdayPage";
import { MessagesPage } from "@/pages/MessagesPage";
import { GalleryPage } from "@/pages/GalleryPage";
import NotFound from "@/pages/not-found";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";

function App() {
  return (
    <TooltipProvider>
      <Toaster />
      <Switch>
        <Route path="/" component={BirthdayPage} />
        <Route path="/messages" component={MessagesPage} />
        <Route path="/gallery" component={GalleryPage} />
        <Route component={NotFound} />
      </Switch>
    </TooltipProvider>
  );
}

export default App;

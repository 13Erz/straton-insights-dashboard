
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import AchatJournalReception from "./pages/achat/JournalReception";
import AchatJournalFacture from "./pages/achat/JournalFacture";
import VenteJournalLivraison from "./pages/vente/JournalLivraison";
import VenteJournalFacture from "./pages/vente/JournalFacture";
import ProductionJournal from "./pages/production/JournalProduction";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/achat/journal-reception" element={<AchatJournalReception />} />
          <Route path="/achat/journal-facture" element={<AchatJournalFacture />} />
          <Route path="/vente/journal-livraison" element={<VenteJournalLivraison />} />
          <Route path="/vente/journal-facture" element={<VenteJournalFacture />} />
          <Route path="/production/journal-production" element={<ProductionJournal />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

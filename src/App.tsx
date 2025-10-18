import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { I18nextProvider } from "react-i18next";
import i18n from "./i18n/config";
import { AuthProvider } from "./contexts/AuthContext";
import Index from "./pages/Index";
import Products from "./pages/Products";
import ProductDetail from "./pages/ProductDetail";
import CustomDesign from "./pages/CustomDesign";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Auth from "./pages/Auth";
import Admin from "./pages/Admin";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <I18nextProvider i18n={i18n}>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner position="top-center" />
          <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/products" element={<Products />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/custom-design" element={<CustomDesign />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </AuthProvider>
    </I18nextProvider>
  </QueryClientProvider>
);

export default App;

import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Stock from "./pages/Stock";
import Contact from "./pages/Contact";
import About from "./pages/About";
import Chat from "./pages/Chat";
import NotFound from "./pages/NotFound";
import Continer from "./components/Continer";
import { AppProvider } from "./context/userContext";
import Login from "./pages/auth/loginComp";
import Register from "./pages/auth/register";
import AddProduct from "./pages/addProduct";

const queryClient = new QueryClient();

// Component to conditionally show Navbar based on route
const Layout = () => {
  const location = useLocation();
  const hideNavbarRoutes = ['/login','/register']; // Add routes where you want to hide navbar
  
  const shouldShowNavbar = !hideNavbarRoutes.includes(location.pathname);

  return (
    <div className="flex flex-col min-h-screen">
      {shouldShowNavbar && <Navbar />}
      <Continer>
      
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
<Route path="/products/add" element={<AddProduct />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/stock" element={<Stock />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/about" element={<About />} />
            <Route path="/chat" element={<Chat />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
      </Continer>
    </div>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AppProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Layout />
        </BrowserRouter>
      </TooltipProvider>
    </AppProvider>
  </QueryClientProvider>
);

export default App;

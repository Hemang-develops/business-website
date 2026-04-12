import { BrowserRouter, Route, Routes } from "react-router-dom";
import AdminDashboard from "./components/AdminDashboard";
import AdminLogin from "./components/AdminLogin";
import MaintenancePage from "./components/MaintenancePage";
import ScrollToTop from "./components/ScrollToTop";
import Index from "./pages/Index";
import Buy from "./pages/Buy";
import NotFound from "./pages/NotFound";
import ConnectDemo from "./pages/ConnectDemo";
import Storefront from "./pages/Storefront";
import ConnectCheckoutStatus from "./pages/ConnectCheckoutStatus";
import { useMaintenanceMode } from "./hooks/useMaintenanceMode";

function App() {
  const isMaintenanceMode = useMaintenanceMode();

  // Show maintenance page if enabled (except for admin routes)
  if (isMaintenanceMode) {
    return <MaintenancePage />;
  }

  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/super-admin-418" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/buy" element={<Buy />} />
        <Route path="/buy/:productId" element={<Buy />} />
        <Route path="/buy/:productId/status/:status" element={<Buy />} />
        <Route path="/connect-demo" element={<ConnectDemo />} />
        <Route path="/storefront/:accountId" element={<Storefront />} />
        <Route path="/connect/checkout-status" element={<ConnectCheckoutStatus />} />
        <Route path="/" element={<Index />} />
        {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

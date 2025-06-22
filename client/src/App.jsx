import { BrowserRouter, Route, Routes } from "react-router-dom"
import Index  from "./pages/Index"
import NotFound from "./pages/NotFound"
import AdminLogin from "./components/AdminLogin"
import AdminDashboard from "./components/AdminDashboard"

function App() {
  return (
    <> <BrowserRouter>
    <Routes>
    <Route path="/super-admin-418" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
      <Route path="/" element={<Index />} />
      {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  </BrowserRouter></>
  )
}

export default App

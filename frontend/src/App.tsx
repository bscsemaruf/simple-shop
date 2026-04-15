import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import Admin from "./pages/Admin";
import About from "./pages/About";
import Contact from "./pages/Contact";

export default function App() {
  return (
    <BrowserRouter>
      {/* FULL PAGE LAYOUT */}
      <div className="min-h-screen flex flex-col">
        {/* NAVBAR */}
        <nav className="w-full bg-white/80 backdrop-blur-md border-b border-gray-100 sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
            {/* LOGO */}
            <div className="text-2xl font-extrabold tracking-wide text-gray-800">
              🛍️ Garment's Store
            </div>

            {/* NAV LINKS */}
            <div className="hidden md:flex items-center gap-8 text-gray-700 font-medium">
              <Link
                to="/"
                className="relative group hover:text-black transition"
              >
                Home
                <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-black group-hover:w-full transition-all duration-300"></span>
              </Link>

              <Link
                to="/about"
                className="relative group hover:text-black transition"
              >
                About
                <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-black group-hover:w-full transition-all duration-300"></span>
              </Link>

              <Link
                to="/contact"
                className="relative group hover:text-black transition"
              >
                Contact
                <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-black group-hover:w-full transition-all duration-300"></span>
              </Link>
            </div>

            {/* ADMIN */}
            <div>
              <Link
                to="/admin"
                className="px-4 py-2 text-sm font-medium rounded-lg
                bg-black text-white hover:bg-gray-800
                transition"
              >
                Admin
              </Link>
            </div>
          </div>
        </nav>

        {/* PAGE CONTENT (IMPORTANT PART) */}
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </main>

        {/* FOOTER */}
        <footer className="bg-gray-900 text-white text-center py-6">
          © 2026 Store
        </footer>
      </div>
    </BrowserRouter>
  );
}

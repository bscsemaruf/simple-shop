import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import Admin from "./pages/Admin";
import About from "./pages/About";
import Contact from "./pages/Contact";

export default function App() {
  return (
    <BrowserRouter>
      {/* FULL PAGE LAYOUT */}
      <div className="min-h-screen flex flex-col ">
        {/* NAVBAR */}
        <nav className="w-full bg-green-100 backdrop-blur-md border-b border-green-300 sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between flex-wrap gap-2">
            {/* LOGO */}
            <div className="text-lg md:text-2xl font-extrabold tracking-wide text-gray-800">
              <Link to="/"> 🛍️ Garment's Store</Link>
            </div>

            {/* MOBILE MENU */}
            <div className="flex md:hidden items-center gap-3 text-sm font-medium text-gray-700">
              <Link
                to="/"
                className="relative group hover:text-black active:text-black transition"
              >
                Home
                <span
                  className="absolute left-0 -bottom-1 w-0 h-[2px] bg-black 
group-hover:w-full 
group-active:w-full 
transition-all duration-300"
                ></span>
              </Link>
              <Link
                to="/about"
                className="relative group hover:text-black active:text-black transition"
              >
                About
                <span
                  className="absolute left-0 -bottom-1 w-0 h-[2px] bg-black 
group-hover:w-full 
group-active:w-full 
transition-all duration-300"
                ></span>
              </Link>
              <Link
                to="/contact"
                className="relative group hover:text-black active:text-black transition"
              >
                Contact
                <span
                  className="absolute left-0 -bottom-1 w-0 h-[2px] bg-black 
group-hover:w-full 
group-active:w-full 
transition-all duration-300"
                ></span>
              </Link>
            </div>

            {/* DESKTOP MENU */}
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

            {/* ADMIN BUTTON */}
            <div>
              <Link
                to="/admin"
                className="px-3 md:px-4 py-1.5 md:py-2 text-xs md:text-sm font-medium rounded-lg
                bg-black text-white hover:bg-gray-800
                transition"
              >
                Admin
              </Link>
            </div>
          </div>
        </nav>

        {/* PAGE CONTENT */}
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </main>

        {/* FOOTER */}
        <footer className="bg-gray-900 text-gray-400 py-4 text-center text-sm">
          © 2026 Garments Shop. All Rights Reserved. Trusted source for premium
          garments accessories.
        </footer>
      </div>
    </BrowserRouter>
  );
}

import { useState } from "react";
import Swal from "sweetalert2";

export default function Admin() {
  const API = import.meta.env.VITE_API_URL;
  const [key, setKey] = useState(localStorage.getItem("admin") || "");
  const [logged, setLogged] = useState(!!localStorage.getItem("admin"));

  const [form, setForm] = useState<any>({});
  const [fileKey, setFileKey] = useState(0);

  const [cats, setCats] = useState<string[]>([
    "Poly",
    "Pin",
    "Hanger",
    "Carton",
  ]);
  const [newCat, setNewCat] = useState("");

  // LOGIN
  const login = () => {
    if (key === "admin123") {
      localStorage.setItem("admin", key);
      setLogged(true);
    } else {
      Swal.fire({
        position: "center",
        icon: "error",
        title: "Your admin key is invalid!",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };

  // LOGOUT
  const logout = () => {
    localStorage.removeItem("admin");
    setLogged(false);
  };

  // ADD CATEGORY
  const addCategory = () => {
    if (newCat && !cats.includes(newCat)) {
      setCats([...cats, newCat]);
      setNewCat("");
    }
  };

  // ADD PRODUCT
  const addProduct = async () => {
    if (!form.name || !form.price || !form.category || !form.image) {
      Swal.fire({
        position: "center",
        icon: "warning",
        title: "All fields are not filled!",
        showConfirmButton: false,
        timer: 1500,
      });
      return;
    }

    const data = new FormData();
    data.append("name", form.name);
    data.append("price", form.price);
    data.append("category", form.category);
    data.append("image", form.image);

    const res = await fetch(`${API}/products`, {
      method: "POST",
      headers: { key: "admin123" },
      body: data,
    });

    const result = await res.json();

    if (result) {
      // ✅ RESET FORM
      setForm({});
      setFileKey((prev) => prev + 1);

      Swal.fire({
        position: "center",
        icon: "success",
        title: "Your product has been added!",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };

  // LOGIN SCREEN
  if (!logged) {
    return (
      <div className="flex flex-col items-center mt-20 gap-4">
        <h2 className="text-xl font-bold">Admin Login</h2>

        <input
          className="border border-green-400 p-2 mb-2 rounded-md"
          placeholder="Enter Admin Key"
          value={key}
          onChange={(e) => setKey(e.target.value)}
        />

        <button
          className="px-4 py-2 rounded-lg text-md font-medium
  bg-blue-500 text-white
  shadow-md hover:shadow-lg
  hover:bg-blue-600 hover:scale-[1.02]
  transition-all duration-200"
          onClick={login}
        >
          Login
        </button>
      </div>
    );
  }

  // ADMIN PANEL
  return (
    <div className="p-6 max-w-md mx-auto mt-8">
      <div className="mb-6">
        <button
          onClick={logout}
          className="px-4 py-2 rounded-lg text-md font-medium
                    bg-red-500 text-white
                    shadow-md hover:shadow-lg
                    hover:bg-red-600 hover:scale-[1.02]
                    transition-all duration-200"
        >
          Logout
        </button>
      </div>

      <h2 className="text-xl font-bold mb-4">Admin Panel</h2>

      {/* NAME */}
      <input
        value={form.name || ""}
        className="border border-green-400 p-2 w-full mb-2 rounded-md"
        placeholder="Product Name"
        onChange={(e) => setForm({ ...form, name: e.target.value })}
      />

      {/* PRICE */}
      <input
        value={form.price || ""}
        className="border border-green-400 p-2 w-full mb-2 rounded-md"
        placeholder="Price"
        type="number"
        onChange={(e) => setForm({ ...form, price: e.target.value })}
      />

      {/* CATEGORY */}
      <select
        value={form.category || ""}
        className="border border-green-400 p-2 w-full mb-2 rounded-md"
        onChange={(e) => setForm({ ...form, category: e.target.value })}
      >
        <option value="">Select Category</option>
        {cats.map((c, i) => (
          <option key={i}>{c}</option>
        ))}
      </select>

      {/* FILE */}
      <input
        key={fileKey}
        type="file"
        className="border border-green-400 p-2 mb-2 rounded-md w-full"
        onChange={(e) => setForm({ ...form, image: e.target.files?.[0] })}
      />

      {/* BUTTON */}
      <button
        onClick={addProduct}
        className="px-4 py-2 w-full mb-2 rounded-lg text-md font-medium
    bg-green-500 text-white
    shadow-md hover:shadow-lg
    hover:bg-green-600 hover:scale-[1.02]
    transition-all duration-200"
      >
        Add Product
      </button>

      {/* ADD CATEGORY */}
      <div className="flex gap-2">
        <input
          className="border border-green-400 p-2 w-full rounded-md"
          placeholder="New Category"
          value={newCat}
          onChange={(e) => setNewCat(e.target.value)}
        />

        <button
          onClick={addCategory}
          className="bg-blue-500 text-white px-3 rounded"
        >
          Add
        </button>
      </div>
    </div>
  );
}

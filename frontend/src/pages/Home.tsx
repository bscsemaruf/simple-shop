import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

interface Product {
  _id: string;
  name: string;
  price: number;
  category: string;
  image: string;
}

export default function Home() {
  const API = import.meta.env.VITE_API_URL;
  const [products, setProducts] = useState<Product[]>([]);
  const [selected, setSelected] = useState("All");
  const [loading, setLoading] = useState(true);
  const [loadingId, setLoadingId] = useState<string | null>(null);
  const [updating, setUpdating] = useState(false);

  const [isOpen, setIsOpen] = useState(false);
  const [editItem, setEditItem] = useState<Product | null>(null);
  const [form, setForm] = useState({ name: "", price: "" });

  const isAdmin = localStorage.getItem("admin") === "admin123";

  // LOAD PRODUCTS

  useEffect(() => {
    const loadProducts = async () => {
      try {
        setLoading(true);
        const res = await fetch(`${API}/products`);
        const data = await res.json();

        setProducts(data);
      } catch (err) {
        console.error("Error loading products", err);
      } finally {
        setLoading(false);
      }
    };
    loadProducts();
  }, [API]);

  // CATEGORY LIST
  const categories = ["All", ...new Set(products.map((p) => p.category))];

  const filtered =
    selected === "All"
      ? products
      : products.filter((p) => p.category === selected);

  // DELETE
  // const deleteProduct = async (id: string) => {
  //   console.log({ id });
  //   const result = await fetch(`${API}/products/${id}`, {
  //     method: "DELETE",
  //     headers: { key: "admin123" },
  //   });

  //   if (result) {
  //     console.log("result", result);
  //   }

  //   setProducts(products.filter((p) => p._id !== id));
  // };

  const deleteProduct = async (id: string) => {
    try {
      setLoadingId(id);
      const res = await fetch(`${API}/products/${id}`, {
        method: "DELETE",
        headers: { key: "admin123" },
      });

      // ❗ check success
      if (!res.ok) throw new Error("Delete failed");

      // ✅ read backend response
      // const data = await res.json();
      // console.log("deleted:", data);

      // ✅ update UI
      setProducts((prev) => prev.filter((p) => p._id !== id));

      // ✅ show success popup
      Swal.fire({
        icon: "success",
        title: "Product deleted successfully!",
        timer: 1500,
        showConfirmButton: false,
      });
    } catch (err) {
      console.log(err);

      Swal.fire({
        icon: "error",
        title: "Delete failed!",
      });
    } finally {
      setLoadingId(null);
    }
  };

  // OPEN EDIT
  const openEditModal = (p: Product) => {
    setEditItem(p);
    setForm({
      name: p.name,
      price: p.price.toString(),
    });
    setIsOpen(true);
  };

  // UPDATE
  const handleUpdate = async () => {
    if (!editItem) return;
    setUpdating(true);
    try {
      const result = await fetch(`${API}/products/${editItem._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          key: "admin123",
        },
        body: JSON.stringify({
          name: form.name,
          price: Number(form.price),
        }),
      });
      // ❗ check success
      if (!result.ok) throw new Error("Edited failed");

      // ✅ update UI
      setProducts(
        products.map((p) =>
          p._id === editItem._id
            ? { ...p, name: form.name, price: Number(form.price) }
            : p,
        ),
      );

      setIsOpen(false);
      setEditItem(null);
      Swal.fire({
        icon: "success",
        title: "Product updated successfully!",
        timer: 1500,
        showConfirmButton: false,
      });
    } catch (err) {
      console.log(err);

      Swal.fire({
        icon: "error",
        title: "Delete failed!",
      });
    } finally {
      setUpdating(false);
    }
  };

  return (
    <div className="pb-6">
      {/* HERO */}
      <div className="bg-linear-to-br from-green-50 via-emerald-50 to-green-200 min-h-[45vh] rounded-xl p-16 mb-6 shadow-sm flex flex-col justify-center text-center">
        <h1 className="text-3xl font-bold bg-linear-to-r from-green-400 to-emerald-200 bg-clip-text text-transparent ">
          Premium Garments Materials and Accessories Collection
        </h1>
        <p className="text-gray-800 font-semibold mt-2">
          Poly • Hanger • Cartons • Wholesale
        </p>
      </div>

      {/* CATEGORY */}
      <div className="flex flex-wrap gap-3 justify-center mb-6">
        {categories.map((c) => (
          <button
            key={c}
            onClick={() => setSelected(c)}
            className={`px-4 py-1 rounded-full border border-green-300
            ${
              selected === c
                ? "bg-linear-to-br from-green-50 via-emerald-50 to-green-200 font-semibold scale-110"
                : "bg-gray-200"
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      {/* 🔥 LOADING / SKELETON / DATA */}
      {loading ? (
        // SKELETON
        <div className="grid md:grid-cols-3 sm:grid-cols-2 gap-6">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="animate-pulse bg-gray-200 h-72 rounded-xl">
              <span className="font-semibold">
                Loading....
                <div className="flex justify-center items-center h-40">
                  <div className="w-10 h-10 border-4 border-green-200 border-t-green-600 rounded-full animate-spin"></div>
                </div>
              </span>
            </div>
          ))}
        </div>
      ) : (
        // REAL DATA
        <div className="grid md:grid-cols-3 sm:grid-cols-2 gap-6">
          {filtered.map((p) => (
            <div
              key={p._id}
              className="bg-linear-to-br from-green-50 via-emerald-50 to-green-200 rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              {/* IMAGE */}
              <div className="w-full h-56 bg-gray-100 overflow-hidden">
                <img
                  src={p.image}
                  alt={p.name}
                  loading="lazy"
                  className="w-full h-full object-contain hover:scale-105 transition"
                />
              </div>

              {/* CONTENT */}
              <div className="p-4 text-center">
                <div className="flex justify-between items-center ">
                  <div className="text-left">
                    <h3 className="font-semibold">Name: {p.name}</h3>
                    <p className="text-green-700 font-semibold">
                      Price: {p.price}৳{" "}
                    </p>
                  </div>
                  <div>
                    <Link
                      to="/contact"
                      className="px-5 py-2 bg-green-600 text-white rounded-lg 
                    hover:bg-green-700 active:scale-95 
                    transition duration-200 shadow-md hover:shadow-l"
                    >
                      Contact
                    </Link>
                  </div>
                </div>

                {isAdmin && (
                  <div className="flex justify-end gap-2 mt-3">
                    <button
                      onClick={() => openEditModal(p)}
                      className="px-4 py-1.5 bg-linear-to-r from-yellow-400 to-yellow-500 text-white 
           font-semibold rounded-md shadow hover:shadow-lg 
           hover:from-yellow-500 hover:to-yellow-600 
           active:scale-95 transition duration-200"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => deleteProduct(p._id)}
                      disabled={loadingId == p._id}
                      className="px-4 py-1.5 bg-red-500 text-white font-medium rounded-md shadow-sm
             hover:bg-red-600 hover:shadow-md active:scale-95
             transition-all duration-200 ease-in-out
             focus:outline-none focus:ring-2 focus:ring-red-300"
                    >
                      {loadingId == p._id ? "Deleting..." : "Delete"}
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* MODAL */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
          <div className="bg-white p-6 rounded-xl w-80">
            <h2 className="mb-3 font-semibold">Edit Product</h2>

            <input
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="border border-green-400 w-full mb-2 p-2 rounded-md"
            />

            <input
              type="number"
              value={form.price}
              onChange={(e) => setForm({ ...form, price: e.target.value })}
              className="border w-full border-green-400 mb-3 p-2 rounded-md"
            />

            <div className="flex justify-end gap-2">
              <button
                onClick={() => setIsOpen(false)}
                className="px-5 py-2 rounded-lg border border-gray-300 text-gray-600 
    hover:bg-gray-100 hover:text-gray-800 
    focus:outline-none focus:ring-2 focus:ring-gray-300 
    transition"
              >
                Cancel
              </button>
              <button
                onClick={handleUpdate}
                disabled={updating}
                className="px-5 py-2 rounded-lg bg-linear-to-r from-green-500 to-green-600 
    text-white font-semibold 
    hover:from-green-600 hover:to-green-700 
    active:scale-95 
    focus:outline-none focus:ring-2 focus:ring-green-400 
    shadow-md hover:shadow-lg 
    disabled:opacity-50 disabled:cursor-not-allowed 
    transition"
              >
                {updating ? "Updating" : "Update"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

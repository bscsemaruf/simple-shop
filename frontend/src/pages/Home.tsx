// import { useEffect, useState } from "react";
// import { Link } from "react-router-dom";

// interface Product {
//   _id: string;
//   name: string;
//   price: number;
//   category: string;
//   image: string;
// }

// export default function Home() {
//   const [products, setProducts] = useState<Product[]>([]);
//   const [selected, setSelected] = useState("All");

//   const [loading, setLoading] = useState(true);

//   const [isOpen, setIsOpen] = useState(false);
//   const [editItem, setEditItem] = useState<Product | null>(null);
//   const [form, setForm] = useState({ name: "", price: "" });

//   const isAdmin = localStorage.getItem("admin") === "admin123";

//   // LOAD PRODUCTS
//   const loadProducts = async () => {
//     setLoading(true);
//     const res = await fetch("http://localhost:5000/products");
//     const data = await res.json();
//     setProducts(data);
//     setLoading(false);
//   };

//   useEffect(() => {
//     loadProducts();
//   }, []);

//   // CATEGORY LIST
//   const categories = ["All", ...new Set(products.map((p) => p.category))];

//   const filtered =
//     selected === "All"
//       ? products
//       : products.filter((p) => p.category === selected);

//   // DELETE PRODUCT
//   const deleteProduct = async (id: string) => {
//     await fetch(`http://localhost:5000/products/${id}`, {
//       method: "DELETE",
//       headers: { key: "admin123" },
//     });

//     setProducts(products.filter((p) => p._id !== id));
//   };

//   // OPEN EDIT MODAL
//   const openEditModal = (p: Product) => {
//     setEditItem(p);
//     setForm({
//       name: p.name,
//       price: p.price.toString(),
//     });
//     setIsOpen(true);
//   };

//   // UPDATE PRODUCT
//   const handleUpdate = async () => {
//     if (!editItem) return;

//     await fetch(`http://localhost:5000/products/${editItem._id}`, {
//       method: "PUT",
//       headers: {
//         "Content-Type": "application/json",
//         key: "admin123",
//       },
//       body: JSON.stringify({
//         name: form.name,
//         price: Number(form.price),
//       }),
//     });

//     // UPDATE UI
//     setProducts(
//       products.map((p) =>
//         p._id === editItem._id
//           ? { ...p, name: form.name, price: Number(form.price) }
//           : p,
//       ),
//     );

//     setIsOpen(false);
//     setEditItem(null);
//   };

//   return (
//     <div className=" p-6">
//       {/* HERO */}
//       <div className="bg-linear-to-br from-green-50 via-emerald-50 to-green-200 min-h-[40vh]  rounded-xl p-16  mb-6 shadow-sm flex flex-col justify-center text-center">
//         <h1 className="text-3xl font-bold">
//           Premium Garments Materials and Accessories Collection
//         </h1>
//         <p className="text-gray-800 font-semibold mt-2">
//           Poly • Hanger • Cartons • Wholesale
//         </p>
//       </div>

//       {/* CATEGORY FILTER */}
//       <div className="flex flex-wrap gap-3 justify-center mb-6">
//         {categories.map((c) => (
//           <button
//             key={c}
//             onClick={() => setSelected(c)}
//             className={`px-4 py-1 rounded-full border border-green-300
//               ${selected === c ? "bg-linear-to-br from-green-50 via-emerald-50 to-green-200 text-black font-semibold scale-110 transition-all duration-300" : "bg-gray-200"}`}
//           >
//             {c}
//           </button>
//         ))}
//       </div>

//       {/* PRODUCT GRID */}

//       <div className="grid md:grid-cols-3 sm:grid-cols-2 gap-6">
//         {filtered.map((p) => (
//           <div
//             key={p._id}
//             className="bg-linear-to-br from-green-50 via-emerald-50 to-green-200 rounded-2xl overflow-hidden
//                           shadow-md hover:shadow-xl
//                           border border-gray-100
//                           transition-all duration-300
//                           hover:-translate-y-1"
//           >
//             {/* IMAGE */}
//             <div className="w-full h-56 overflow-hidden bg-gray-100">
//               <img
//                 src={p.image}
//                 alt={p.name}
//                 className="w-full h-full object-contain hover:scale-105 transition duration-300"
//               />
//             </div>

//             {/* CONTENT */}
//             <div className="p-4 text-center space-y-2">
//               <div className="flex justify-between items-center">
//                 <div className="text-left">
//                   <h3 className="text-lg font-semibold text-gray-800">
//                     Name: {p.name}
//                   </h3>

//                   <h3 className="text-green-700 font-semibold text-lg">
//                     Price: {p.price} ৳
//                   </h3>
//                 </div>

//                 <div>
//                   <button
//                     className="px-4 py-2 rounded-lg text-md font-medium
//                           bg-linear-to-r from-blue-500 to-blue-600 text-white
//                           shadow-md hover:shadow-lg hover:scale-[1.02]
//                           transition-all duration-200"
//                   >
//                     <Link to={"/contact"}> Contact</Link>
//                   </button>
//                 </div>
//               </div>

//               {/* ADMIN */}
//               {isAdmin && (
//                 <div className="flex justify-end gap-3 mt-3">
//                   <button
//                     onClick={() => openEditModal(p)}
//                     className="px-4 py-2 rounded-lg text-md font-medium
//     bg-yellow-500/10 text-yellow-600 border border-yellow-400
//     hover:bg-yellow-500 hover:text-white
//     shadow-sm hover:shadow-md hover:scale-[1.02]
//     transition-all duration-200"
//                   >
//                     Edit
//                   </button>

//                   <button
//                     onClick={() => deleteProduct(p._id)}
//                     className="px-4 py-2 rounded-lg text-md font-medium
//     bg-red-500/10 text-red-600 border border-red-400
//     hover:bg-red-500 hover:text-white
//     shadow-sm hover:shadow-md hover:scale-[1.02]
//     transition-all duration-200"
//                   >
//                     Delete
//                   </button>
//                 </div>
//               )}
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* ================= EDIT MODAL ================= */}
//       {isOpen && (
//         <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
//           <div className="bg-white p-6 rounded-xl w-80 shadow-lg">
//             <h2 className="text-lg font-semibold mb-4">Edit Product</h2>

//             {/* NAME */}
//             <label>Name</label>
//             <input
//               type="text"
//               value={form.name}
//               onChange={(e) => setForm({ ...form, name: e.target.value })}
//               className="w-full border border-green-400 px-3 py-2 rounded-lg mb-3"
//               placeholder="Product Name"
//             />

//             <label>Price </label>

//             {/* PRICE */}
//             <input
//               type="number"
//               value={form.price}
//               onChange={(e) => setForm({ ...form, price: e.target.value })}
//               className="w-full border border-green-400 px-3 py-2 rounded-lg mb-4"
//               placeholder="Price"
//             />

//             {/* ACTIONS */}
//             <div className="flex justify-end gap-2">
//               <button
//                 onClick={() => {
//                   setIsOpen(false);
//                   setEditItem(null);
//                 }}
//                 className="px-4 py-2 rounded-lg text-md font-medium
//     bg-gray-100 text-gray-700 border border-gray-300
//     hover:bg-gray-200 hover:text-gray-900
//     transition-all duration-200"
//               >
//                 Cancel
//               </button>

//               <button
//                 onClick={handleUpdate}
//                 className="px-4 py-2 rounded-lg text-md font-medium
//     bg-green-500 text-white
//     shadow-md hover:shadow-lg
//     hover:bg-green-600 hover:scale-[1.02]
//     transition-all duration-200"
//               >
//                 Update
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

interface Product {
  _id: string;
  name: string;
  price: number;
  category: string;
  image: string;
}

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [selected, setSelected] = useState("All");
  const [loading, setLoading] = useState(true);

  const [isOpen, setIsOpen] = useState(false);
  const [editItem, setEditItem] = useState<Product | null>(null);
  const [form, setForm] = useState({ name: "", price: "" });

  const isAdmin = localStorage.getItem("admin") === "admin123";

  // LOAD PRODUCTS
  const loadProducts = async () => {
    try {
      setLoading(true);
      const res = await fetch("http://localhost:5000/products");
      const data = await res.json();
      setProducts(data);
    } catch (err) {
      console.error("Error loading products", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  // CATEGORY LIST
  const categories = ["All", ...new Set(products.map((p) => p.category))];

  const filtered =
    selected === "All"
      ? products
      : products.filter((p) => p.category === selected);

  // DELETE
  const deleteProduct = async (id: string) => {
    await fetch(`http://localhost:5000/products/${id}`, {
      method: "DELETE",
      headers: { key: "admin123" },
    });

    setProducts(products.filter((p) => p._id !== id));
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

    await fetch(`http://localhost:5000/products/${editItem._id}`, {
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

    setProducts(
      products.map((p) =>
        p._id === editItem._id
          ? { ...p, name: form.name, price: Number(form.price) }
          : p,
      ),
    );

    setIsOpen(false);
    setEditItem(null);
  };

  return (
    <div className="p-6">
      {/* HERO */}
      <div className="bg-linear-to-br from-green-50 via-emerald-50 to-green-200 min-h-[40vh] rounded-xl p-16 mb-6 shadow-sm flex flex-col justify-center text-center">
        <h1 className="text-3xl font-bold">
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
            <div
              key={i}
              className="animate-pulse bg-gray-200 h-72 rounded-xl"
            ></div>
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
                <h3 className="font-semibold">{p.name}</h3>
                <p className="text-green-700 font-semibold">{p.price} ৳</p>

                <Link
                  to="/contact"
                  className="inline-block mt-2 px-4 py-2 bg-blue-500 text-white rounded-lg"
                >
                  Contact
                </Link>

                {isAdmin && (
                  <div className="flex justify-center gap-2 mt-3">
                    <button
                      onClick={() => openEditModal(p)}
                      className="px-3 py-1 bg-yellow-400 rounded"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => deleteProduct(p._id)}
                      className="px-3 py-1 bg-red-500 text-white rounded"
                    >
                      Delete
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
              className="border w-full mb-2 p-2"
            />

            <input
              type="number"
              value={form.price}
              onChange={(e) => setForm({ ...form, price: e.target.value })}
              className="border w-full mb-3 p-2"
            />

            <div className="flex justify-end gap-2">
              <button onClick={() => setIsOpen(false)}>Cancel</button>
              <button onClick={handleUpdate}>Update</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

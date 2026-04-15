import { useState } from "react";
import Swal from "sweetalert2";
export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    message: "",
  });

  const submit = () => {
    Swal.fire({
      position: "center",
      icon: "success",
      title: "Your message has been sent!",
      showConfirmButton: false,
      timer: 1500,
    });
    //alert("Message sent! (demo only)");
    setForm({ name: "", message: "" });
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      {/* HERO */}
      <div className="bg-linear-to-br from-green-50 via-emerald-50 to-green-100 p-8 rounded-xl text-center mb-6 shadow">
        <h1 className="text-3xl font-bold">Contact Us</h1>
        <p className="text-gray-800 mt-2">
          Get in touch for business inquiries
        </p>
      </div>

      {/* CONTACT INFO */}
      <div className="bg-white shadow p-6 rounded-xl mb-6 space-y-2 text-gray-700">
        <p>📞 Phone: 01XXXXXXXXX</p>
        <p>📧 Email: example@gmail.com</p>
        <p>📍 Location: Dhaka, Bangladesh</p>
      </div>

      {/* FORM */}
      <div className="bg-white shadow p-6 rounded-xl space-y-4">
        <input
          className="border p-3 w-full rounded"
          placeholder="Your Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />

        <textarea
          className="border p-3 w-full rounded"
          placeholder="Your Message"
          rows={4}
          value={form.message}
          onChange={(e) => setForm({ ...form, message: e.target.value })}
        />

        <button
          onClick={submit}
          className="bg-black text-white w-full py-2 rounded hover:bg-gray-800"
        >
          Send Message
        </button>
      </div>
    </div>
  );
}

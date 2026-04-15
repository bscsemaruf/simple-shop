import React from "react";

export default function About() {
  return (
    <div className="p-6 max-w-4xl mx-auto mt-6">
      {/* HERO */}
      <div className="bg-linear-to-br from-green-50 via-emerald-50 to-green-200 p-8 rounded-xl text-center mb-6 shadow">
        <h1 className="text-3xl font-bold">About Us</h1>
        <p className="text-gray-800 mt-2">
          We provide high-quality garments for wholesale buyers
        </p>
      </div>

      {/* CONTENT */}
      <div className="space-y-4 text-gray-800 leading-relaxed">
        <p>
          Welcome to our garments store. We specialize in providing premium
          quality clothing products including shirts, pants, jackets, and more.
        </p>

        <p>
          Our goal is to connect buyers with reliable garment products at the
          best price. We focus on quality, consistency, and long-term business
          relationships.
        </p>

        <p>
          Whether you are a retailer, wholesaler, or business partner, we are
          here to support your needs.
        </p>
      </div>

      {/* HIGHLIGHTS */}
      <div className="grid md:grid-cols-3 gap-4 mt-8 text-center">
        <div className="bg-linear-to-br from-green-50 via-emerald-50 to-green-200 shadow p-4 rounded-xl">
          <h3 className="font-semibold">High Quality</h3>
          <p className="text-sm text-gray-800">Premium fabrics</p>
        </div>

        <div className="bg-linear-to-br from-green-50 via-emerald-50 to-green-200 shadow p-4 rounded-xl">
          <h3 className="font-semibold">Affordable</h3>
          <p className="text-sm text-gray-800">Best wholesale price</p>
        </div>

        <div className="bg-linear-to-br from-green-50 via-emerald-50 to-green-200 shadow p-4 rounded-xl">
          <h3 className="font-semibold">Trusted</h3>
          <p className="text-sm text-gray-800">Reliable service</p>
        </div>
      </div>
    </div>
  );
}

import React, { useEffect, useState } from "react";
import API from "../../api/api";

const Suppliers = () => {
  const [suppliers, setSuppliers] = useState([]);

  useEffect(() => {
    API.get("/api/distributor/products")
      .then((res) => {
        const products = res.data || [];

        const grouped = {};
        products.forEach((p) => {
          if (!grouped[p.farmerId]) {
            grouped[p.farmerId] = {
              farmerId: p.farmerId,
              totalProducts: 0,
              totalQuantity: 0,
            };
          }
          grouped[p.farmerId].totalProducts += 1;
          grouped[p.farmerId].totalQuantity += p.quantity;
        });

        setSuppliers(Object.values(grouped));
      })
      .catch((err) => {
        console.error("Suppliers API error:", err.response?.status);
        setSuppliers([]);
      });
  }, []);

  return (
    <>
      <h1 className="text-2xl font-black mb-6">👨‍🌾 Suppliers</h1>

      {suppliers.length === 0 ? (
        <p className="text-gray-500">No suppliers found</p>
      ) : (
        <div className="grid md:grid-cols-3 gap-6">
          {suppliers.map((s) => (
            <div key={s.farmerId} className="bg-white p-5 rounded-xl shadow">
              <h3 className="font-bold">Farmer #{s.farmerId}</h3>
              <p className="text-sm text-gray-500">
                Products: {s.totalProducts}
              </p>
              <p className="text-sm">
                Total Quantity: {s.totalQuantity} kg
              </p>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default Suppliers;

import React, { useEffect, useState, useCallback } from "react";
import Farmerlayout from "../../Layouts/Farmerlayout";
import API from "../../api/api";
import { getAiHistoryForCrop } from "../../utils/aiHistory";

const Mycrops = () => {
  const [crops, setCrops] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingCrop, setEditingCrop] = useState(null);

  const token = localStorage.getItem("token");

  // ✅ FETCH MY CROPS (FIXED ENDPOINT + AUTH)
  const fetchMyCrops = useCallback(async () => {
    try {
      const res = await API.get("/api/products/my-crops", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log("MY CROPS 👉", res.data);
      setCrops(res.data || []);
    } catch (err) {
      console.error("Error fetching crops", err);
    } finally {
      setLoading(false);
    }
  }, [token]);

  // ✅ DELETE CROP (FIXED AUTH)
  const handleDelete = async (id) => {
    if (!window.confirm("Remove this crop?")) return;

    try {
      await API.delete(`/api/products/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setCrops((prev) => prev.filter((c) => c.id !== id));
    } catch (err) {
      console.error("Delete failed", err);
    }
  };

  // ✅ UPDATE CROP (FIXED AUTH)
  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      await API.put(
        `/api/products/${editingCrop.id}`,
        editingCrop,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setEditingCrop(null);
      fetchMyCrops();
    } catch (err) {
      console.error("Update failed", err);
    }
  };

  useEffect(() => {
    fetchMyCrops();
  }, [fetchMyCrops]);

  return (
    <Farmerlayout>
      <h1 className="text-2xl font-black mb-8 dark:text-white">
        My Warehouse
      </h1>

      {loading && <p>Loading...</p>}

      {!loading && crops.length === 0 && (
        <p className="text-gray-500">No crops added yet.</p>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {crops.map((crop) => {
          const aiHistory = getAiHistoryForCrop(crop.name);

          return (
            <div
              key={crop.id}
              className="bg-white dark:bg-gray-800 rounded-2xl shadow border overflow-hidden"
            >
              {/* ✅ SAFE IMAGE RENDER */}
              {crop.imageUrls?.length > 0 && (
                <img
                  src={crop.imageUrls[0]}
                  alt={crop.name}
                  className="h-40 w-full object-cover"
                />
              )}

              <div className="p-4">
                <h3 className="font-bold dark:text-white">
                  {crop.name}
                </h3>

                <p className="text-green-600 font-bold">
                  ₹{crop.price}/kg
                </p>

                <p className="text-xs text-gray-500">
                  Stock: {crop.quantity}kg
                </p>

                <p className="text-xs">
                  Sell To: <b>{crop.sellTo}</b>
                </p>

                <p className="text-xs">
                  AI Grade:{" "}
                  <b className="text-green-600">
                    {crop.qualityGrade || "B"}
                  </b>
                </p>

                {/* 🤖 AI HISTORY */}
                {aiHistory && (
                  <div className="mt-3 p-3 bg-green-50 dark:bg-gray-900 rounded border">
                    <p className="text-xs font-bold text-green-600">
                      🤖 Last AI Diagnosis
                    </p>
                    <p className="text-xs">
                      {aiHistory.condition} (
                      {aiHistory.confidence}%)
                    </p>
                  </div>
                )}

                <div className="flex gap-2 mt-4">
                  <button
                    onClick={() => setEditingCrop(crop)}
                    className="flex-1 bg-gray-100 dark:bg-gray-700 py-2 rounded-lg text-xs font-bold"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => handleDelete(crop.id)}
                    className="flex-1 bg-red-50 text-red-600 py-2 rounded-lg text-xs font-bold"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* ✏️ EDIT MODAL */}
      {editingCrop && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
          <form
            onSubmit={handleUpdate}
            className="bg-white dark:bg-gray-800 p-6 rounded-3xl w-full max-w-md"
          >
            <h2 className="font-bold mb-4">
              Edit {editingCrop.name}
            </h2>

            <input
              type="number"
              value={editingCrop.price}
              onChange={(e) =>
                setEditingCrop({
                  ...editingCrop,
                  price: e.target.value,
                })
              }
              className="w-full p-3 rounded mb-3"
            />

            <input
              type="number"
              value={editingCrop.quantity}
              onChange={(e) =>
                setEditingCrop({
                  ...editingCrop,
                  quantity: e.target.value,
                })
              }
              className="w-full p-3 rounded mb-3"
            />

            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => setEditingCrop(null)}
                className="flex-1 py-2"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex-1 py-2 bg-green-600 text-white rounded"
              >
                Save
              </button>
            </div>
          </form>
        </div>
      )}
    </Farmerlayout>
  );
};

export default Mycrops;

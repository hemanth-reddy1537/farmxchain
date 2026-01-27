import { useState } from "react";
import Farmerlayout from "../../Layouts/Farmerlayout";
import API from "../../api/api";

const Addcrop = () => {
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [harvestDate, setHarvestDate] = useState("");
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState("");
  const [discount, setDiscount] = useState("");
  const [sellTo, setSellTo] = useState("customer");
  const [images, setImages] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const finalPrice =
    price && discount ? price - (price * discount) / 100 : price;

  // ✅ SUBMIT HANDLER
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const token = localStorage.getItem("token");
    if (!token) {
      setError("Login required");
      setLoading(false);
      return;
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("type", type);
    formData.append("harvestDate", harvestDate);
    formData.append("quantity", quantity);
    formData.append("price", price);
    formData.append("discount", discount || 0);
    formData.append("sellTo", sellTo);

    for (let i = 0; i < images.length; i++) {
      formData.append("images", images[i]);
    }

    try {
      await API.post("/api/products/add", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      alert("✅ Crop added successfully");

      // Reset form
      setName("");
      setType("");
      setHarvestDate("");
      setQuantity("");
      setPrice("");
      setDiscount("");
      setSellTo("customer");
      setImages([]);
    } catch (err) {
      console.error(err);

      // 🔥 SAFE ERROR EXTRACTION (THIS FIXES THE CRASH)
      const message =
        err.response?.data?.message ||
        err.response?.data?.error ||
        "Failed to add crop. Please check inputs.";

      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Farmerlayout>
      <h1 className="text-2xl font-bold text-gray-800 mb-6">
        ➕ Add New Crop
      </h1>

      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-xl shadow p-6 space-y-8"
      >
        {/* ❌ Error Message */}
        {error && (
          <div className="bg-red-100 text-red-700 p-3 rounded-lg text-sm">
            {error}
          </div>
        )}

        {/* 🌾 Crop Details */}
        <div>
          <h2 className="text-lg font-semibold mb-4">🌾 Crop Details</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <input
              type="text"
              placeholder="Crop Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="border rounded-lg p-3 w-full"
              required
            />

            <select
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="border rounded-lg p-3 w-full"
              required
            >
              <option value="">Crop Type</option>
              <option value="Vegetable">Vegetable</option>
              <option value="Fruit">Fruit</option>
              <option value="Grain">Grain</option>
              <option value="Pulses">Pulses</option>
            </select>

            <input
              type="date"
              value={harvestDate}
              onChange={(e) => setHarvestDate(e.target.value)}
              className="border rounded-lg p-3 w-full"
              required
            />
          </div>
        </div>

        {/* 💰 Quantity & Pricing */}
        <div>
          <h2 className="text-lg font-semibold mb-4">💰 Quantity & Pricing</h2>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <input
              type="number"
              placeholder="Quantity (kg)"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              className="border rounded-lg p-3 w-full"
              required
            />

            <input
              type="number"
              placeholder="Price per kg (₹)"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="border rounded-lg p-3 w-full"
              required
            />

            <input
              type="number"
              placeholder="Discount (%)"
              value={discount}
              onChange={(e) => setDiscount(e.target.value)}
              className="border rounded-lg p-3 w-full"
            />

            <div className="border rounded-lg p-3 bg-gray-50 flex items-center">
              <span className="font-semibold text-gray-700">
                Final: ₹{finalPrice || 0}/kg
              </span>
            </div>
          </div>
        </div>

        {/* 🛒 Sell To */}
        <div>
          <h2 className="text-lg font-semibold mb-4">🛒 Sell To</h2>

          <div className="flex gap-6">
            <button
              type="button"
              onClick={() => setSellTo("customer")}
              className={`px-6 py-3 rounded-lg border ${
                sellTo === "customer"
                  ? "bg-green-600 text-white"
                  : "bg-white"
              }`}
            >
              🧑 Customer
            </button>

            <button
              type="button"
              onClick={() => setSellTo("distributor")}
              className={`px-6 py-3 rounded-lg border ${
                sellTo === "distributor"
                  ? "bg-green-600 text-white"
                  : "bg-white"
              }`}
            >
              🚚 Distributor
            </button>
          </div>
        </div>

        {/* 📷 Images */}
        <div>
          <h2 className="text-lg font-semibold mb-4">📷 Product Images</h2>

          <input
            type="file"
            multiple
            onChange={(e) => setImages(e.target.files)}
            className="border rounded-lg p-3 w-full"
            required
          />
        </div>

        {/* ✅ Submit */}
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={loading}
            className={`px-8 py-3 rounded-lg text-white ${
              loading ? "bg-gray-400" : "bg-green-600 hover:bg-green-700"
            }`}
          >
            {loading ? "Submitting..." : "Submit Crop"}
          </button>
        </div>
      </form>
    </Farmerlayout>
  );
};

export default Addcrop;

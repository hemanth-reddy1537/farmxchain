import { useState } from "react";
import API from "../api/api";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);

  const submit = async () => {
    try {
      await API.post("/users/forgot-password", { email });
    } catch (e) {
      // intentionally silent (security)
    }
    setDone(true);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-xl shadow w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4">
          Reset Password
        </h2>

        {done ? (
          <p className="text-green-600">
            If the email exists, a reset link has been sent.
          </p>
        ) : (
          <>
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full p-3 border rounded mb-4"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <button
              onClick={submit}
              className="w-full bg-green-600 text-white p-3 rounded"
            >
              Send Reset Link
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default ForgotPassword;

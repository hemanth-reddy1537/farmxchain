
import React from 'react';
import { useNavigate } from 'react-router-dom';

const OrderSuccessModal = ({ isOpen, onClose }) => {
  const navigate = useNavigate();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="bg-white dark:bg-gray-800 rounded-3xl p-8 max-w-sm w-full text-center shadow-2xl animate-in fade-in zoom-in duration-300">
        <div className="w-20 h-20 bg-green-100 dark:bg-green-900/30 text-green-600 rounded-full flex items-center justify-center text-4xl mx-auto mb-6">
          ✅
        </div>
        <h2 className="text-2xl font-black text-gray-800 dark:text-white mb-2">Order Placed!</h2>
        <p className="text-gray-500 dark:text-gray-400 mb-8">
          Your request has been sent to the farmer. You can track the progress in your orders tab.
        </p>
        <div className="flex flex-col gap-3">
          <button
            onClick={() => { onClose(); navigate('/customer/orders'); }}
            className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 rounded-xl transition-all shadow-lg shadow-green-600/20"
          >
            Track My Order
          </button>
          <button
            onClick={onClose}
            className="w-full text-gray-500 font-bold py-2 hover:underline"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderSuccessModal;
import OrderTable from "../../components/Distributor/OrderTable";

const Orders = () => {
  const orders = [
    { id: "ORD001", product: "Tomato", qty: 50, status: "PLACED" },
    { id: "ORD002", product: "Onion", qty: 100, status: "ACCEPTED" },
    { id: "ORD003", product: "Potato", qty: 200, status: "DELIVERED" },
  ];

  return (
    <div className="p-6 space-y-4">
      <h2 className="text-2xl font-semibold">My Orders</h2>
      <OrderTable orders={orders} />
    </div>
  );
};

export default Orders;

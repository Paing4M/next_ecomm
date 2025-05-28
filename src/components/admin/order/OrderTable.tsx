interface OrderTableProps {
  orders: OrderI[];
}

const OrderTable = ({orders}: OrderTableProps) => {
  if (orders && orders.length === 0)
    return (
      <p className="text-sm text-redBackground text-center py-3">
        No Order Found.
      </p>
    );

  return (
    <div className="overflow-x-auto z-[1]">
      <table className="w-full text-left">
        <thead className="text-gray-700 uppercase bg-white">
        <tr>
          <th scope="col" className="table_p hidden md:table-cell">
            ID
          </th>
          <th scope="col" className="table_p">Stripe SessionId</th>
          <th scope="col" className="table_p">User Email</th>
          <th scope="col" className="table_p">Total Amount</th>
        </tr>
        </thead>

        <tbody>
        {orders.map((order) => (
          <tr key={order._id} className="border-b border-gray-300">
            <th
              scope="row"
              className="table_p font-bold hidden md:table-cell max-w-[150px] truncate"
            >
              {order._id}
            </th>
            <td className="table_p font-bold max-w-[200px] truncate overflow-hidden whitespace-nowrap">
              {order.stripeSessionId}
            </td>
            <td className="table_p text-gray-600 max-w-[200px] truncate overflow-hidden whitespace-nowrap">
              {order.userEmail}
            </td>
            <td className="table_p text-gray-600">$ {order.totalAmount}</td>
          </tr>
        ))}
        </tbody>
      </table>
    </div>
  );
};

export default OrderTable;

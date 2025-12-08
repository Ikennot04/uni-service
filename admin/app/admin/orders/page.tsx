"use client";

import { useState, useMemo } from "react";

interface Order {
  id: number;
  orderId: string;
  buyerId: string;
  buyerName: string;
  sellerId: string;
  sellerName: string;
  totalAmount: number;
  deliveryAddress: string;
  status: "pending" | "processing" | "for_delivery" | "delivered" | "cancelled";
  paymentId: string;
  createdAt: string;
  updatedAt: string;
}

const mockOrders: Order[] = [
  {
    id: 1,
    orderId: "ORD-2024-001",
    buyerId: "USR-001",
    buyerName: "John Smith",
    sellerId: "USR-101",
    sellerName: "BuildCo",
    totalAmount: 2500,
    deliveryAddress: "123 Main St, Manila",
    status: "delivered",
    paymentId: "PAY-001",
    createdAt: "2024-12-01",
    updatedAt: "2024-12-05",
  },
  {
    id: 2,
    orderId: "ORD-2024-002",
    buyerId: "USR-002",
    buyerName: "Sarah Johnson",
    sellerId: "USR-102",
    sellerName: "ToolMaster",
    totalAmount: 5200,
    deliveryAddress: "456 Oak Ave, Cebu",
    status: "for_delivery",
    paymentId: "PAY-002",
    createdAt: "2024-12-03",
    updatedAt: "2024-12-08",
  },
  {
    id: 3,
    orderId: "ORD-2024-003",
    buyerId: "USR-003",
    buyerName: "Mike Wilson",
    sellerId: "USR-103",
    sellerName: "PlumbTech",
    totalAmount: 1800,
    deliveryAddress: "789 Pine Rd, Davao",
    status: "processing",
    paymentId: "PAY-003",
    createdAt: "2024-12-05",
    updatedAt: "2024-12-06",
  },
  {
    id: 4,
    orderId: "ORD-2024-004",
    buyerId: "USR-004",
    buyerName: "Emma Davis",
    sellerId: "USR-104",
    sellerName: "ElectroSupply",
    totalAmount: 3600,
    deliveryAddress: "321 Elm St, Quezon City",
    status: "pending",
    paymentId: "PAY-004",
    createdAt: "2024-12-07",
    updatedAt: "2024-12-07",
  },
  {
    id: 5,
    orderId: "ORD-2024-005",
    buyerId: "USR-005",
    buyerName: "Alex Brown",
    sellerId: "USR-105",
    sellerName: "ArtPro",
    totalAmount: 2100,
    deliveryAddress: "654 Maple Dr, Makati",
    status: "delivered",
    paymentId: "PAY-005",
    createdAt: "2024-11-28",
    updatedAt: "2024-12-02",
  },
  {
    id: 6,
    orderId: "ORD-2024-006",
    buyerId: "USR-006",
    buyerName: "Lisa Anderson",
    sellerId: "USR-106",
    sellerName: "CementCo",
    totalAmount: 4500,
    deliveryAddress: "987 Cedar Ln, Pasig",
    status: "for_delivery",
    paymentId: "PAY-006",
    createdAt: "2024-12-04",
    updatedAt: "2024-12-09",
  },
  {
    id: 7,
    orderId: "ORD-2024-007",
    buyerId: "USR-007",
    buyerName: "David Martinez",
    sellerId: "USR-107",
    sellerName: "CutMaster",
    totalAmount: 1200,
    deliveryAddress: "456 Birch St, Taguig",
    status: "cancelled",
    paymentId: "PAY-007",
    createdAt: "2024-12-02",
    updatedAt: "2024-12-03",
  },
  {
    id: 8,
    orderId: "ORD-2024-008",
    buyerId: "USR-008",
    buyerName: "Jennifer Garcia",
    sellerId: "USR-108",
    sellerName: "LightBright",
    totalAmount: 6800,
    deliveryAddress: "789 Walnut Ave, Cavite",
    status: "processing",
    paymentId: "PAY-008",
    createdAt: "2024-12-06",
    updatedAt: "2024-12-07",
  },
  {
    id: 9,
    orderId: "ORD-2024-009",
    buyerId: "USR-009",
    buyerName: "Robert Taylor",
    sellerId: "USR-109",
    sellerName: "BuildCo",
    totalAmount: 3300,
    deliveryAddress: "123 Spruce St, Las Piñas",
    status: "pending",
    paymentId: "PAY-009",
    createdAt: "2024-12-08",
    updatedAt: "2024-12-08",
  },
  {
    id: 10,
    orderId: "ORD-2024-010",
    buyerId: "USR-010",
    buyerName: "Michelle Lee",
    sellerId: "USR-110",
    sellerName: "ToolMaster",
    totalAmount: 5100,
    deliveryAddress: "654 Ash Rd, Parañaque",
    status: "delivered",
    paymentId: "PAY-010",
    createdAt: "2024-11-25",
    updatedAt: "2024-12-01",
  },
];

export default function OrdersPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);

  const filteredOrders = useMemo(() => {
    return mockOrders.filter((order) => {
      const matchesSearch =
        order.orderId
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        order.buyerName
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        order.sellerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.deliveryAddress.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesStatus =
        statusFilter === "All" || order.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [searchTerm, statusFilter]);

  const totalPages = Math.ceil(filteredOrders.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedOrders = filteredOrders.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const handleItemsPerPageChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setItemsPerPage(parseInt(e.target.value));
    setCurrentPage(1);
  };

  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case "pending":
        return "badge badge-warning text-[13px]";
      case "processing":
        return "badge badge-info text-[13px]";
      case "for_delivery":
        return "badge badge-primary text-[13px]";
      case "delivered":
        return "badge badge-success text-[13px]";
      case "cancelled":
        return "badge badge-error text-[13px]";
      default:
        return "badge";
    }
  };

  return (
    <div className="overflow-auto text-[13px] h-full pb-5">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-4">Orders Management</h1>
        <p className="text-gray-600">
          Total Orders: {filteredOrders.length} of {mockOrders.length}
        </p>
      </div>

      {/* Filters and Search */}
      <div className="bg-base-100 border border-base-300 rounded-lg p-4 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          {/* Search Input */}
          <div className="md:col-span-2">
            <label className="label">
              <span className="label-text font-semibold">Search</span>
            </label>
            <input
              type="text"
              placeholder="Search by order ID, buyer, seller, or address..."
              className="input input-bordered w-full"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* Status Filter */}
          <div>
            <label className="label">
              <span className="label-text font-semibold">Status</span>
            </label>
            <select
              className="select select-bordered w-full"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option>All</option>
              <option value="pending">Pending</option>
              <option value="processing">Processing</option>
              <option value="for_delivery">For Delivery</option>
              <option value="delivered">Delivered</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="bg-base-100 border border-base-300 rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="table table-zebra w-full text-[13px]">
            <thead>
              <tr className="bg-base-200">
                <th className="font-bold"></th>
                <th className="font-bold">Buyer</th>
                <th className="font-bold">Seller</th>
                <th className="font-bold">Total Amount</th>
                <th className="font-bold">Delivery Address</th>
                <th className="font-bold">Status</th>
                <th className="font-bold">Action</th>
              </tr>
            </thead>
            <tbody>
              {paginatedOrders.length > 0 ? (
                paginatedOrders.map((order) => (
                  <tr key={order.id}>
                    <td>{order.id}</td>
                    <td>{order.buyerName}</td>
                    <td>{order.sellerName}</td>
                    <td>₱{order.totalAmount.toLocaleString()}</td>
                    <td className="max-w-xs truncate">{order.deliveryAddress}</td>
                    <td>
                      <span className={getStatusBadgeColor(order.status)}>
                        {order.status.replace("_", " ").toUpperCase()}
                      </span>
                    </td>
                    <td>
                      <div className="flex gap-2">
                        <button className="btn btn-xs text-[13px] btn-info">
                          View
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="text-center py-4 text-gray-500">
                    No orders found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination */}
      <div className="mt-6 flex items-center justify-between gap-4 flex-wrap">
        <div className="flex items-center gap-4">
          <div className="text-sm text-gray-600">
            Showing {startIndex + 1} to{" "}
            {Math.min(startIndex + itemsPerPage, filteredOrders.length)} of{" "}
            {filteredOrders.length} orders
          </div>
          <div className="flex items-center gap-2">
            <label className="text-sm font-semibold w-60">
              Items per page:
            </label>
            <select
              className="select select-bordered select-sm"
              value={itemsPerPage}
              onChange={handleItemsPerPageChange}
            >
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={15}>15</option>
              <option value={20}>20</option>
            </select>
          </div>
        </div>
        <div className="join">
          <button
            className="join-item btn btn-sm"
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            «
          </button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              className={`join-item btn btn-sm ${
                currentPage === page ? "btn-active" : ""
              }`}
              onClick={() => handlePageChange(page)}
            >
              {page}
            </button>
          ))}
          <button
            className="join-item btn btn-sm"
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            »
          </button>
        </div>
      </div>
    </div>
  );
}

"use client";

import { useState, useMemo } from "react";

interface Appointment {
  id: number;
  customerName: string;
  serviceName: string;
  provider: string;
  appointmentDate: string;
  appointmentTime: string;
  status: "Confirmed" | "Pending" | "Completed" | "Cancelled";
  amount: number;
  createdDate: string;
}

const mockAppointments: Appointment[] = [
  {
    id: 1,
    customerName: "John Smith",
    serviceName: "Plumbing Repair",
    provider: "John Smith",
    appointmentDate: "2024-12-15",
    appointmentTime: "10:00 AM",
    status: "Confirmed",
    amount: 500,
    createdDate: "2024-12-01",
  },
  {
    id: 2,
    customerName: "Sarah Johnson",
    serviceName: "Electrical Installation",
    provider: "Sarah Johnson",
    appointmentDate: "2024-12-16",
    appointmentTime: "02:00 PM",
    status: "Confirmed",
    amount: 2500,
    createdDate: "2024-12-02",
  },
  {
    id: 3,
    customerName: "Mike Wilson",
    serviceName: "AC Maintenance",
    provider: "Mike Wilson",
    appointmentDate: "2024-12-17",
    appointmentTime: "09:00 AM",
    status: "Pending",
    amount: 800,
    createdDate: "2024-12-03",
  },
  {
    id: 4,
    customerName: "Emma Davis",
    serviceName: "Pest Control",
    provider: "Emma Davis",
    appointmentDate: "2024-12-10",
    appointmentTime: "03:00 PM",
    status: "Completed",
    amount: 1200,
    createdDate: "2024-11-28",
  },
  {
    id: 5,
    customerName: "Alex Brown",
    serviceName: "Wall Painting",
    provider: "Alex Brown",
    appointmentDate: "2024-12-20",
    appointmentTime: "08:00 AM",
    status: "Cancelled",
    amount: 1500,
    createdDate: "2024-12-05",
  },
  {
    id: 6,
    customerName: "Lisa Anderson",
    serviceName: "Carpet Cleaning",
    provider: "Lisa Anderson",
    appointmentDate: "2024-12-18",
    appointmentTime: "11:00 AM",
    status: "Confirmed",
    amount: 600,
    createdDate: "2024-12-04",
  },
  {
    id: 7,
    customerName: "David Martinez",
    serviceName: "Water Tank Cleaning",
    provider: "David Martinez",
    appointmentDate: "2024-12-19",
    appointmentTime: "01:00 PM",
    status: "Pending",
    amount: 900,
    createdDate: "2024-12-06",
  },
  {
    id: 8,
    customerName: "Jennifer Garcia",
    serviceName: "Door Installation",
    provider: "Jennifer Garcia",
    appointmentDate: "2024-12-21",
    appointmentTime: "10:00 AM",
    status: "Confirmed",
    amount: 2000,
    createdDate: "2024-12-07",
  },
  {
    id: 9,
    customerName: "John Smith",
    serviceName: "Garden Landscaping",
    provider: "John Smith",
    appointmentDate: "2024-12-22",
    appointmentTime: "02:00 PM",
    status: "Completed",
    amount: 3000,
    createdDate: "2024-11-30",
  },
  {
    id: 10,
    customerName: "Sarah Johnson",
    serviceName: "Window Repair",
    provider: "Sarah Johnson",
    appointmentDate: "2024-12-23",
    appointmentTime: "04:00 PM",
    status: "Pending",
    amount: 700,
    createdDate: "2024-12-08",
  },
];

export default function AppointmentsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);

  const filteredAppointments = useMemo(() => {
    return mockAppointments.filter((appointment) => {
      const matchesSearch =
        appointment.customerName
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        appointment.serviceName
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        appointment.provider.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesStatus =
        statusFilter === "All" || appointment.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [searchTerm, statusFilter]);

  const totalPages = Math.ceil(filteredAppointments.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedAppointments = filteredAppointments.slice(
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
      case "Confirmed":
        return "badge badge-success text-[13px]";
      case "Pending":
        return "badge badge-warning text-[13px]";
      case "Completed":
        return "badge badge-info text-[13px]";
      case "Cancelled":
        return "badge badge-error text-[13px]";
      default:
        return "badge";
    }
  };

  return (
    <div className="overflow-auto text-[13px] h-full pb-5">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-4">Appointments Management</h1>
        <p className="text-gray-600">
          Total Appointments: {filteredAppointments.length} of{" "}
          {mockAppointments.length}
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
              placeholder="Search by customer, service, or provider..."
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
              <option>Confirmed</option>
              <option>Pending</option>
              <option>Completed</option>
              <option>Cancelled</option>
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
                <th className="font-bold">Customer</th>
                <th className="font-bold">Service</th>
                <th className="font-bold">Provider</th>
                <th className="font-bold">Date</th>
                <th className="font-bold">Time</th>
                <th className="font-bold">Amount</th>
                <th className="font-bold">Status</th>
                <th className="font-bold">Action</th>
              </tr>
            </thead>
            <tbody>
              {paginatedAppointments.length > 0 ? (
                paginatedAppointments.map((appointment) => (
                  <tr key={appointment.id}>
                    <td>{appointment.id}</td>
                    <td className="font-semibold">{appointment.customerName}</td>
                    <td>{appointment.serviceName}</td>
                    <td>{appointment.provider}</td>
                    <td>{appointment.appointmentDate}</td>
                    <td>{appointment.appointmentTime}</td>
                    <td>₱{appointment.amount.toLocaleString()}</td>
                    <td>
                      <span className={getStatusBadgeColor(appointment.status)}>
                        {appointment.status}
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
                  <td colSpan={9} className="text-center py-4 text-gray-500">
                    No appointments found
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
            {Math.min(startIndex + itemsPerPage, filteredAppointments.length)}{" "}
            of {filteredAppointments.length} appointments
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

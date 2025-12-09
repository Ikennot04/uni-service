"use client";

import { useState, useMemo } from "react";

interface Drone {
  id: number;
  name: string;
  model: string;
  serialNumber: string;
  status: "Active" | "Inactive" | "Maintenance";
  batteryHealth: number;
  lastMaintenance: string;
  registrationDate: string;
}

const mockDrones: Drone[] = [
  {
    id: 1,
    name: "Sky Courier 1",
    model: "DC-500",
    serialNumber: "SN-001",
    status: "Active",
    batteryHealth: 95,
    lastMaintenance: "2024-11-15",
    registrationDate: "2024-01-10",
  },
  {
    id: 2,
    name: "Sky Courier 2",
    model: "DC-500",
    serialNumber: "SN-002",
    status: "Active",
    batteryHealth: 88,
    lastMaintenance: "2024-10-20",
    registrationDate: "2024-01-15",
  },
  {
    id: 3,
    name: "Swift Delivery",
    model: "DC-400",
    serialNumber: "SN-003",
    status: "Maintenance",
    batteryHealth: 45,
    lastMaintenance: "2024-12-01",
    registrationDate: "2024-02-05",
  },
  {
    id: 4,
    name: "Express Air",
    model: "DC-600",
    serialNumber: "SN-004",
    status: "Active",
    batteryHealth: 92,
    lastMaintenance: "2024-11-10",
    registrationDate: "2024-03-01",
  },
  {
    id: 5,
    name: "Horizon Alpha",
    model: "DC-500",
    serialNumber: "SN-005",
    status: "Inactive",
    batteryHealth: 30,
    lastMaintenance: "2024-08-15",
    registrationDate: "2024-04-12",
  },
  {
    id: 6,
    name: "Thunder Wings",
    model: "DC-400",
    serialNumber: "SN-006",
    status: "Active",
    batteryHealth: 85,
    lastMaintenance: "2024-11-20",
    registrationDate: "2024-02-20",
  },
  {
    id: 7,
    name: "Velocity Pro",
    model: "DC-600",
    serialNumber: "SN-007",
    status: "Active",
    batteryHealth: 98,
    lastMaintenance: "2024-11-25",
    registrationDate: "2024-05-10",
  },
  {
    id: 8,
    name: "Cloud Runner",
    model: "DC-500",
    serialNumber: "SN-008",
    status: "Maintenance",
    batteryHealth: 55,
    lastMaintenance: "2024-12-05",
    registrationDate: "2024-03-18",
  },
];

const DRONE_MODELS = ["DC-400", "DC-500", "DC-600"];

export default function DronesPage() {
  const [drones, setDrones] = useState<Drone[]>(mockDrones);
  const [searchTerm, setSearchTerm] = useState("");
  const [modelFilter, setModelFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    model: "DC-500",
    serialNumber: "",
  });

  const filteredDrones = useMemo(() => {
    return drones.filter((drone) => {
      const matchesSearch = drone.serialNumber
        .toLowerCase()
        .includes(searchTerm.toLowerCase());

      const matchesModel = modelFilter === "All" || drone.model === modelFilter;
      const matchesStatus =
        statusFilter === "All" || drone.status === statusFilter;

      return matchesSearch && matchesModel && matchesStatus;
    });
  }, [searchTerm, modelFilter, statusFilter, drones]);

  const totalPages = Math.ceil(filteredDrones.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedDrones = filteredDrones.slice(
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

  const handleAddDrone = (e: React.FormEvent) => {
    e.preventDefault();
    const newDrone: Drone = {
      id: Math.max(...drones.map((d) => d.id), 0) + 1,
      name: `Drone-${formData.serialNumber}`,
      model: formData.model,
      serialNumber: formData.serialNumber,
      status: "Active",
      batteryHealth: 100,
      lastMaintenance: new Date().toISOString().split("T")[0],
      registrationDate: new Date().toISOString().split("T")[0],
    };
    setDrones([...drones, newDrone]);
    setFormData({ model: "DC-500", serialNumber: "" });
    setIsModalOpen(false);
  };

  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case "Active":
        return "badge badge-success text-[13px]";
      case "Inactive":
        return "badge badge-error text-[13px]";
      case "Maintenance":
        return "badge badge-warning text-[13px]";
      default:
        return "badge";
    }
  };

  const getBatteryHealthColor = (health: number) => {
    if (health >= 80) return "text-success";
    if (health >= 50) return "text-warning";
    return "text-error";
  };

  return (
    <div className="overflow-auto text-[13px] h-full pb-5">
      {/* Header */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-3xl font-bold">Drones Management</h1>
          <button
            className="btn btn-primary"
            onClick={() => setIsModalOpen(true)}
          >
            + Add Drone
          </button>
        </div>
        <p className="text-gray-600">
          Total Drones: {filteredDrones.length} of {drones.length}
        </p>
      </div>

      {/* Filters and Search */}
      <div className="bg-base-100 border border-base-300 rounded-lg p-4 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* Search Input */}
          <div className="md:col-span-2">
            <label className="label">
              <span className="label-text font-semibold">Search</span>
            </label>
            <input
              type="text"
              placeholder="Search by serial number..."
              className="input input-bordered w-full"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* Model Filter */}
          <div>
            <label className="label">
              <span className="label-text font-semibold">Model</span>
            </label>
            <select
              className="select select-bordered w-full"
              value={modelFilter}
              onChange={(e) => setModelFilter(e.target.value)}
            >
              <option>All</option>
              {DRONE_MODELS.map((model) => (
                <option key={model} value={model}>
                  {model}
                </option>
              ))}
            </select>
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
              <option>Active</option>
              <option>Inactive</option>
              <option>Maintenance</option>
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
                <th className="font-bold">ID</th>
                <th className="font-bold">Model</th>
                <th className="font-bold">Serial Number</th>
                <th className="font-bold">Status</th>
                <th className="font-bold">Battery Health</th>
                <th className="font-bold">Last Maintenance</th>
                <th className="font-bold">Registration Date</th>
                <th className="font-bold">Action</th>
              </tr>
            </thead>
            <tbody>
              {paginatedDrones.length > 0 ? (
                paginatedDrones.map((drone) => (
                  <tr key={drone.id}>
                    <td>{drone.id}</td>
                    <td>{drone.model}</td>
                    <td>{drone.serialNumber}</td>
                    <td>
                      <span className={getStatusBadgeColor(drone.status)}>
                        {drone.status}
                      </span>
                    </td>
                    <td>
                      <div className="flex items-center gap-2">
                        <div className="w-12 bg-gray-200 rounded-full h-2">
                          <div
                            className={`h-2 rounded-full ${
                              drone.batteryHealth >= 80
                                ? "bg-success"
                                : drone.batteryHealth >= 50
                                  ? "bg-warning"
                                  : "bg-error"
                            }`}
                            style={{
                              width: `${drone.batteryHealth}%`,
                            }}
                          ></div>
                        </div>
                        <span
                          className={`font-semibold ${getBatteryHealthColor(drone.batteryHealth)}`}
                        >
                          {drone.batteryHealth}%
                        </span>
                      </div>
                    </td>
                    <td>{drone.lastMaintenance}</td>
                    <td>{drone.registrationDate}</td>
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
                  <td colSpan={8} className="text-center py-4 text-gray-500">
                    No drones found
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
            Showing {paginatedDrones.length === 0 ? 0 : startIndex + 1} to{" "}
            {Math.min(startIndex + itemsPerPage, filteredDrones.length)} of{" "}
            {filteredDrones.length} drones
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

      {/* Add Drone Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-base-100 rounded-lg p-6 w-full max-w-md">
            <h2 className="text-2xl font-bold mb-4">Add New Drone</h2>
            <form onSubmit={handleAddDrone} className="space-y-4">
              <div>
                <label className="label">
                  <span className="label-text font-semibold">Model</span>
                </label>
                <select
                  className="select select-bordered w-full"
                  value={formData.model}
                  onChange={(e) =>
                    setFormData({ ...formData, model: e.target.value })
                  }
                >
                  {DRONE_MODELS.map((model) => (
                    <option key={model} value={model}>
                      {model}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="label">
                  <span className="label-text font-semibold">Serial Number</span>
                </label>
                <input
                  type="text"
                  placeholder="e.g., SN-009"
                  className="input input-bordered w-full"
                  value={formData.serialNumber}
                  onChange={(e) =>
                    setFormData({ ...formData, serialNumber: e.target.value })
                  }
                  required
                />
                <p className="text-xs text-gray-500 mt-1">Drone name will be auto-generated based on serial number</p>
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  className="btn btn-ghost flex-1"
                  onClick={() => setIsModalOpen(false)}
                >
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary flex-1">
                  Add Drone
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

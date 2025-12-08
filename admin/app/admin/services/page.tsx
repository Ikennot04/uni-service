"use client";

import { useState, useMemo } from "react";

interface Service {
  id: number;
  name: string;
  category: string;
  description: string;
  basePrice: number;
  provider: string;
  providerCategory: string;
  rating: number;
  status: "Active" | "Inactive" | "Pending";
  createdDate: string;
}

const mockServices: Service[] = [
  {
    id: 1,
    name: "Plumbing Repair",
    category: "Maintenance",
    description: "Fix leaks and pipe issues",
    basePrice: 500,
    provider: "John Smith",
    providerCategory: "Plumber",
    rating: 4.8,
    status: "Active",
    createdDate: "2024-01-15",
  },
  {
    id: 2,
    name: "Electrical Installation",
    category: "Installation",
    description: "Home electrical wiring setup",
    basePrice: 2500,
    provider: "Sarah Johnson",
    providerCategory: "Electrician",
    rating: 4.9,
    status: "Active",
    createdDate: "2024-02-20",
  },
  {
    id: 3,
    name: "AC Maintenance",
    category: "Maintenance",
    description: "Air conditioning system check and cleaning",
    basePrice: 800,
    provider: "Mike Wilson",
    providerCategory: "HVAC Technician",
    rating: 4.6,
    status: "Active",
    createdDate: "2023-12-10",
  },
  {
    id: 4,
    name: "Pest Control",
    category: "Cleaning",
    description: "Professional pest removal service",
    basePrice: 1200,
    provider: "Emma Davis",
    providerCategory: "Cleaner",
    rating: 4.7,
    status: "Active",
    createdDate: "2024-03-05",
  },
  {
    id: 5,
    name: "Wall Painting",
    category: "Painting",
    description: "Interior and exterior wall painting",
    basePrice: 1500,
    provider: "Alex Brown",
    providerCategory: "Painter",
    rating: 4.5,
    status: "Pending",
    createdDate: "2024-04-01",
  },
  {
    id: 6,
    name: "Carpet Cleaning",
    category: "Cleaning",
    description: "Professional carpet and upholstery cleaning",
    basePrice: 600,
    provider: "Lisa Anderson",
    providerCategory: "Cleaner",
    rating: 4.8,
    status: "Active",
    createdDate: "2024-01-22",
  },
  {
    id: 7,
    name: "Water Tank Cleaning",
    category: "Maintenance",
    description: "Deep cleaning of water tanks",
    basePrice: 900,
    provider: "David Martinez",
    providerCategory: "Maintenance Worker",
    rating: 4.9,
    status: "Active",
    createdDate: "2024-02-14",
  },
  {
    id: 8,
    name: "Door Installation",
    category: "Installation",
    description: "Install new doors and frames",
    basePrice: 2000,
    provider: "Jennifer Garcia",
    providerCategory: "Carpenter",
    rating: 4.4,
    status: "Inactive",
    createdDate: "2023-11-30",
  },
  {
    id: 9,
    name: "Garden Landscaping",
    category: "Gardening",
    description: "Professional garden design and maintenance",
    basePrice: 3000,
    provider: "John Smith",
    providerCategory: "Gardener",
    rating: 4.9,
    status: "Active",
    createdDate: "2024-03-15",
  },
  {
    id: 10,
    name: "Window Repair",
    category: "Maintenance",
    description: "Fix broken windows and frames",
    basePrice: 700,
    provider: "Sarah Johnson",
    providerCategory: "Electrician",
    rating: 4.7,
    status: "Active",
    createdDate: "2024-02-28",
  },
];

export default function ServicesPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [serviceCategoryFilter, setServiceCategoryFilter] = useState("All");
  const [providerCategoryFilter, setProviderCategoryFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);

  const filteredServices = useMemo(() => {
    return mockServices.filter((service) => {
      const matchesSearch =
        service.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        service.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        service.provider.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesServiceCategory =
        serviceCategoryFilter === "All" || service.category === serviceCategoryFilter;
      const matchesProviderCategory =
        providerCategoryFilter === "All" || service.providerCategory === providerCategoryFilter;
      const matchesStatus =
        statusFilter === "All" || service.status === statusFilter;

      return matchesSearch && matchesServiceCategory && matchesProviderCategory && matchesStatus;
    });
  }, [searchTerm, serviceCategoryFilter, providerCategoryFilter, statusFilter]);

  const totalPages = Math.ceil(filteredServices.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedServices = filteredServices.slice(
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
      case "Active":
        return "badge badge-success text-[13px]";
      case "Inactive":
        return "badge badge-error text-[13px]";
      case "Pending":
        return "badge badge-warning text-[13px]";
      default:
        return "badge";
    }
  };

  const categories = [
    "All",
    ...new Set(mockServices.map((service) => service.category)),
  ];

  const providerCategories = [
    "All",
    ...new Set(mockServices.map((service) => service.providerCategory)),
  ];

  return (
    <div className="overflow-auto text-[13px] h-full pb-5">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-4">Services Management</h1>
        <p className="text-gray-600">
          Total Services: {filteredServices.length} of {mockServices.length}
        </p>
      </div>

      {/* Filters and Search */}
      <div className="bg-base-100 border border-base-300 rounded-lg p-4 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          {/* Search Input */}
          <div className="md:col-span-3">
            <label className="label">
              <span className="label-text font-semibold">Search</span>
            </label>
            <input
              type="text"
              placeholder="Search by name, description, or provider..."
              className="input input-bordered w-full"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Service Category Filter */}
          <div>
            <label className="label">
              <span className="label-text font-semibold">Service Category</span>
            </label>
            <select
              className="select select-bordered w-full"
              value={serviceCategoryFilter}
              onChange={(e) => setServiceCategoryFilter(e.target.value)}
            >
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>

          {/* Provider Category Filter */}
          <div>
            <label className="label">
              <span className="label-text font-semibold">Provider Category</span>
            </label>
            <select
              className="select select-bordered w-full"
              value={providerCategoryFilter}
              onChange={(e) => setProviderCategoryFilter(e.target.value)}
            >
              {providerCategories.map((providerCategory) => (
                <option key={providerCategory} value={providerCategory}>
                  {providerCategory}
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
              <option>Pending</option>
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
                <th className="font-bold">Name</th>
                <th className="font-bold">Category</th>
                <th className="font-bold">Base Price</th>
                <th className="font-bold">Provider</th>
                <th className="font-bold">Rating</th>
                <th className="font-bold">Status</th>
                <th className="font-bold">Created Date</th>
                <th className="font-bold">Action</th>
              </tr>
            </thead>
            <tbody>
              {paginatedServices.length > 0 ? (
                paginatedServices.map((service) => (
                  <tr key={service.id}>
                    <td>{service.id}</td>
                    <td className="font-semibold">{service.name}</td>
                    <td>{service.category}</td>
                    <td>₱{service.basePrice.toLocaleString()}</td>
                    <td>{service.provider}</td>
                    <td>
                      <div className="flex items-center gap-1">
                        <span className="font-semibold">{service.rating}</span>
                        <span className="text-yellow-500">★</span>
                      </div>
                    </td>
                    <td>
                      <span className={getStatusBadgeColor(service.status)}>
                        {service.status}
                      </span>
                    </td>
                    <td>{service.createdDate}</td>
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
                    No services found
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
            {Math.min(startIndex + itemsPerPage, filteredServices.length)} of{" "}
            {filteredServices.length} services
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

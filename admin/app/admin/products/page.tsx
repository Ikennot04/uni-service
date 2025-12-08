"use client";

import { useState, useMemo } from "react";

interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  stock: number;
  seller: string;
  status: "Available" | "Out of Stock" | "Discontinued";
  createdDate: string;
}

const mockProducts: Product[] = [
  {
    id: 1,
    name: "Power Drill",
    category: "Tools",
    price: 1500,
    stock: 45,
    seller: "BuildCo",
    status: "Available",
    createdDate: "2024-01-10",
  },
  {
    id: 2,
    name: "Hammer Set",
    category: "Tools",
    price: 800,
    stock: 120,
    seller: "ToolMaster",
    status: "Available",
    createdDate: "2024-01-15",
  },
  {
    id: 3,
    name: "PVC Pipes",
    category: "Plumbing",
    price: 2000,
    stock: 0,
    seller: "PlumbTech",
    status: "Out of Stock",
    createdDate: "2024-02-01",
  },
  {
    id: 4,
    name: "Electrical Wire",
    category: "Electrical",
    price: 3500,
    stock: 85,
    seller: "ElectroSupply",
    status: "Available",
    createdDate: "2024-02-05",
  },
  {
    id: 5,
    name: "Paint Brush Set",
    category: "Painting",
    price: 950,
    stock: 200,
    seller: "ArtPro",
    status: "Available",
    createdDate: "2024-02-10",
  },
  {
    id: 6,
    name: "Cement Bags",
    category: "Materials",
    price: 400,
    stock: 500,
    seller: "CementCo",
    status: "Available",
    createdDate: "2024-02-15",
  },
  {
    id: 7,
    name: "Saw Blades",
    category: "Tools",
    price: 1200,
    stock: 0,
    seller: "CutMaster",
    status: "Out of Stock",
    createdDate: "2024-03-01",
  },
  {
    id: 8,
    name: "Screwdriver Set",
    category: "Tools",
    price: 600,
    stock: 150,
    seller: "ToolMaster",
    status: "Available",
    createdDate: "2024-03-05",
  },
  {
    id: 9,
    name: "LED Lights",
    category: "Electrical",
    price: 2500,
    stock: 30,
    seller: "LightBright",
    status: "Available",
    createdDate: "2024-03-10",
  },
  {
    id: 10,
    name: "Wood Stain",
    category: "Painting",
    price: 1100,
    stock: 0,
    seller: "ArtPro",
    status: "Discontinued",
    createdDate: "2024-01-20",
  },
];

export default function ProductsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);

  const filteredProducts = useMemo(() => {
    return mockProducts.filter((product) => {
      const matchesSearch =
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.seller.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.category.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesCategory =
        categoryFilter === "All" || product.category === categoryFilter;
      const matchesStatus =
        statusFilter === "All" || product.status === statusFilter;

      return matchesSearch && matchesCategory && matchesStatus;
    });
  }, [searchTerm, categoryFilter, statusFilter]);

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedProducts = filteredProducts.slice(
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
      case "Available":
        return "badge badge-success text-[13px]";
      case "Out of Stock":
        return "badge badge-warning text-[13px]";
      case "Discontinued":
        return "badge badge-error text-[13px]";
      default:
        return "badge";
    }
  };

  const categories = [
    "All",
    ...new Set(mockProducts.map((product) => product.category)),
  ];

  return (
    <div className="overflow-auto text-[13px] h-full pb-5">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-4">Products Management</h1>
        <p className="text-gray-600">
          Total Products: {filteredProducts.length} of {mockProducts.length}
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
              placeholder="Search by name, category, or supplier..."
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
              <option>Available</option>
              <option>Out of Stock</option>
              <option>Discontinued</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Category Filter */}
          <div>
            <label className="label">
              <span className="label-text font-semibold">Category</span>
            </label>
            <select
              className="select select-bordered w-full"
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
            >
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
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
                <th className="font-bold">Price</th>
                <th className="font-bold">Stock</th>
                <th className="font-bold">Seller</th>
                <th className="font-bold">Status</th>
                <th className="font-bold">Created Date</th>
                <th className="font-bold">Action</th>
              </tr>
            </thead>
            <tbody>
              {paginatedProducts.length > 0 ? (
                paginatedProducts.map((product) => (
                  <tr key={product.id}>
                    <td>{product.id}</td>
                    <td className="font-semibold">{product.name}</td>
                    <td>{product.category}</td>
                    <td>₱{product.price.toLocaleString()}</td>
                    <td>
                      <span
                        className={
                          product.stock === 0
                            ? "text-error font-semibold"
                            : "text-success font-semibold"
                        }
                      >
                        {product.stock}
                      </span>
                    </td>
                    <td>{product.seller}</td>
                    <td>
                      <span className={getStatusBadgeColor(product.status)}>
                        {product.status}
                      </span>
                    </td>
                    <td>{product.createdDate}</td>
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
                    No products found
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
            {Math.min(startIndex + itemsPerPage, filteredProducts.length)} of{" "}
            {filteredProducts.length} products
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

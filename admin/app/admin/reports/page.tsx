"use client";

import { useState } from "react";

interface Report {
  id: number;
  name: string;
  description: string;
  icon: string;
  generatedDate: string;
  dataPoints: number;
}

const reports: Report[] = [
  {
    id: 1,
    name: "Appointment Summary Report",
    description: "View comprehensive summary of all appointments including completion rates, cancellations, and trends",
    icon: "📅",
    generatedDate: "2024-12-09",
    dataPoints: 156,
  },
  {
    id: 2,
    name: "Drone Delivery Report",
    description: "Track drone delivery performance, flight hours, payload metrics, and maintenance schedules",
    icon: "🚁",
    generatedDate: "2024-12-08",
    dataPoints: 82,
  },
  {
    id: 3,
    name: "Revenue Report",
    description: "Analyze revenue streams, transaction history, payment methods, and financial performance",
    icon: "💰",
    generatedDate: "2024-12-09",
    dataPoints: 245,
  },
  {
    id: 4,
    name: "User Activity Report",
    description: "Monitor user engagement, login patterns, activity metrics, and user behavior analytics",
    icon: "👥",
    generatedDate: "2024-12-07",
    dataPoints: 312,
  },
];

export default function ReportsPage() {
  const [selectedReport, setSelectedReport] = useState<number | null>(null);
  const [exportFormat, setExportFormat] = useState<"csv" | "pdf" | null>(null);

  const handleExport = (format: "csv" | "pdf") => {
    setExportFormat(format);
    // Simulate export
    setTimeout(() => {
      alert(`Exporting ${selectedReport ? reports.find(r => r.id === selectedReport)?.name : "all reports"} as ${format.toUpperCase()}`);
      setExportFormat(null);
    }, 500);
  };

  const selectedReportData = selectedReport
    ? reports.find((r) => r.id === selectedReport)
    : null;

  return (
    <div className="overflow-auto text-[13px] h-full pb-5">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Reports</h1>
        <p className="text-gray-600">
          Generate and export business reports to analyze key metrics and performance
        </p>
      </div>

      {/* Reports Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {reports.map((report) => (
          <div
            key={report.id}
            onClick={() => setSelectedReport(report.id)}
            className={`p-6 rounded-lg border-2 cursor-pointer transition-all ${
              selectedReport === report.id
                ? "border-blue-200 bg-blue-200 bg-opacity-10"
                : "border-base-300 bg-base-100 hover:border-blue-200 hover:shadow-md"
            }`}
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-start gap-4">
                <span className="text-4xl">{report.icon}</span>
                <div className="flex-1">
                  <h3 className="font-bold text-lg mb-1">{report.name}</h3>
                  <p className="text-gray-600 text-[12px]">{report.description}</p>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-between text-[12px] text-gray-500">
              <span>Data Points: {report.dataPoints}</span>
              <span>Generated: {report.generatedDate}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Selected Report Details and Export */}
      {selectedReportData && (
        <div className="bg-base-100 border border-base-300 rounded-lg p-6">
          <div className="mb-6">
            <h2 className="text-2xl font-bold mb-2">{selectedReportData.name}</h2>
            <p className="text-gray-600 mb-4">{selectedReportData.description}</p>
            <div className="flex items-center gap-6 text-[13px]">
              <div className="flex items-center gap-2">
                <span className="font-semibold">Data Points:</span>
                <span className="badge bg-blue-200">{selectedReportData.dataPoints}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-semibold">Generated:</span>
                <span className="text-gray-600">{selectedReportData.generatedDate}</span>
              </div>
            </div>
          </div>

          {/* Sample Report Preview */}
          <div className="mb-6 p-4 bg-gray-50 rounded-lg">
            <h3 className="font-semibold mb-3">Report Preview</h3>
            <div className="space-y-2 text-[12px]">
              {selectedReportData.id === 1 && (
                <>
                  <p>Total Appointments: 156</p>
                  <p>Completed: 142 (91%)</p>
                  <p>Cancelled: 8 (5%)</p>
                  <p>Pending: 6 (4%)</p>
                  <p>Average Rating: 4.7/5</p>
                </>
              )}
              {selectedReportData.id === 2 && (
                <>
                  <p>Active Drones: 8</p>
                  <p>Most delivered place: Shuttle A</p>
                  <p>Average Payload: 4.5 kg</p>
                  <p>Success Rate: 97.5%</p>
                  <p>Maintenance Due: 2 drones</p>
                </>
              )}
              {selectedReportData.id === 3 && (
                <>
                  <p>Total Revenue: ₱52,500</p>
                  <p>GCash Transactions: ₱31,200 (59%)</p>
                  <p>Cash on Delivery: ₱21,300 (41%)</p>
                  <p>Average Transaction: ₱5,250</p>
                  <p>Period: December 2024</p>
                </>
              )}
              {selectedReportData.id === 4 && (
                <>
                  <p>Total Active Users: 312</p>
                  <p>New Users (This Month): 28</p>
                  <p>Average Session Duration: 12 min</p>
                  <p>Login Frequency: 2.3x/day</p>
                  <p>User Retention: 89%</p>
                </>
              )}
            </div>
          </div>

          {/* Export Buttons */}
          <div className="flex gap-3">
            <button
              onClick={() => handleExport("csv")}
              disabled={exportFormat !== null}
              className="btn btn-outline gap-2 flex-1"
            >
              {exportFormat === "csv" ? (
                <>
                  <span className="loading loading-spinner loading-sm"></span>
                  Exporting...
                </>
              ) : (
                <>
                  📥 Export CSV
                </>
              )}
            </button>
            <button
              onClick={() => handleExport("pdf")}
              disabled={exportFormat !== null}
              className="btn btn-outline gap-2 flex-1"
            >
              {exportFormat === "pdf" ? (
                <>
                  <span className="loading loading-spinner loading-sm"></span>
                  Exporting...
                </>
              ) : (
                <>
                  📥 Export PDF
                </>
              )}
            </button>
          </div>
        </div>
      )}

      {/* Empty State */}
      {!selectedReportData && (
        <div className="bg-base-100 border border-base-300 rounded-lg p-12 text-center">
          <p className="text-gray-500 text-lg">
            Select a report to view details and export options
          </p>
        </div>
      )}
    </div>
  );
}

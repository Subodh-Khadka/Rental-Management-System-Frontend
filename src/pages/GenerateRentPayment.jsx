import { useState } from "react";
import { generateRentPayment } from "../api/rentPayment";

export default function GenerateRentPayment() {
  const [selectedMonth, setSelectedMonth] = useState("");

  async function handleGeneratePayment() {
    if (!selectedMonth) {
      alert("Please select a month first");
      return;
    }

    const result = await generateRentPayment({ month: selectedMonth });
    alert(result.message);
  }

  return (
    <div className="p-6 bg-white rounded-2xl shadow">
      <h1 className="text-xl font-bold mb-4">Generate Rent Payments</h1>

      {/* Month Selector */}
      <div className="mb-4">
        <label className="mr-2 font-semibold">Select Month:</label>
        <input
          type="month"
          value={selectedMonth}
          onChange={(e) => setSelectedMonth(e.target.value)}
          className="border p-1 rounded"
        />
      </div>

      <button
        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded disabled:opacity-50"
        onClick={handleGeneratePayment}
      >
        Generate payment
      </button>
    </div>
  );
}

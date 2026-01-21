import { useState, useEffect } from "react";
import RentPaymentTable from "../Components/Rentpayments/RentPaymentTable";
import useRentPayments from "../hooks/useRentPayment";
import useRentalContracts from "../hooks/useRentalContract";

export default function PaymentPage() {
  const {
    rentPayments,
    loadRentPaymentsByMonth,
    createRentPaymentInState,
    updateRentPaymentInState,
    deleteRentPaymentInState,
    error,
    isLoading,
  } = useRentPayments();

  const { rentalContracts } = useRentalContracts();
  const [selectedMonth, setSelectedMonth] = useState(""); // YYYY-MM

  // Fetch payments when month changes
  useEffect(() => {
    if (selectedMonth) {
      loadRentPaymentsByMonth(selectedMonth);
    }
  }, [selectedMonth, loadRentPaymentsByMonth]);

  if (isLoading) return <h1>Loading data...</h1>;
  if (error) return <h1>{error}</h1>;

  return (
    <>
      <section className="bg-white p-4 rounded-2xl shadow-lg mb-4 flex flex-col md:flex-row md:items-end gap-3">
        <div className="flex flex-col">
          <label className="font-bold">Filter by Month</label>
          <input
            type="month"
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(e.target.value)}
            className="bg-stone-100 p-2 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-200"
          />
        </div>

        <button
          type="button"
          onClick={() => setSelectedMonth("")}
          className="px-4 py-2 rounded-md bg-gray-800 text-white hover:bg-gray-700"
          disabled={!selectedMonth}
        >
          Clear
        </button>

        <div className="md:ml-auto text-sm text-gray-600">
          Showing <span className="font-bold">{rentPayments.length}</span>{" "}
          payments
        </div>
      </section>

      <RentPaymentTable
        error={error}
        rentPaymentsData={rentPayments}
        onRentPaymentCreate={createRentPaymentInState}
        onRentPaymentUpdate={updateRentPaymentInState}
        onRentPaymentDelete={deleteRentPaymentInState}
        rentalContracts={rentalContracts}
      />
    </>
  );
}

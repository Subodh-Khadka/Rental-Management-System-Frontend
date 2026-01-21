import { useState, useEffect } from "react";
import useChargeTemplate from "../hooks/useChargeTemplate";
import { getRentPaymentsByMonth } from "../api/rentPayment";
import {
  getMeterReadingByPaymentAndMonth,
  updateMeterReading,
  createMeterReading,
} from "../api/meterReading";
import { generateMonthlyCharges } from "../api/monthlyCharge";

export default function GenerateMonthlyCharge() {
  const { chargeTemplates } = useChargeTemplate();
  const [rentPayments, setRentPayments] = useState([]);
  const [currentReadings, setCurrentReadings] = useState({});
  const [previousReadings, setPreviousReadings] = useState({});
  const [readingIds, setReadingIds] = useState({});
  const [unitsData, setUnitsData] = useState({});
  const [selectedMonth, setSelectedMonth] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);

  // Load rent payments and meter readings
  useEffect(() => {
    const fetchPayments = async () => {
      if (!selectedMonth) {
        setRentPayments([]);
        return;
      }

      const payments = await getRentPaymentsByMonth(selectedMonth);
      setRentPayments(payments);

      const current = {};
      const previous = {};
      const ids = {};

      for (let p of payments) {
        const reading = await getMeterReadingByPaymentAndMonth(
          p.paymentId,
          selectedMonth,
        );

        if (reading) {
          previous[p.paymentId] = reading.previousReading;
          current[p.paymentId] = reading.currentReading;
          ids[p.paymentId] = reading.meterReadingId;
        } else {
          previous[p.paymentId] = 0;
          current[p.paymentId] = 0;
          ids[p.paymentId] = null;
        }
      }

      setPreviousReadings(previous);
      setCurrentReadings(current);
      setReadingIds(ids);
    };

    fetchPayments();
  }, [selectedMonth]);

  // Handle electricity reading input
  const handleReadingChange = (paymentId, value) => {
    setCurrentReadings((prev) => ({
      ...prev,
      [paymentId]: value === "" ? 0 : Number(value),
    }));
  };

  // Handle other variable charge input
  const handleUnitChange = (paymentId, templateId, value) => {
    setUnitsData((prev) => ({
      ...prev,
      [paymentId]: {
        ...(prev[paymentId] || {}),
        [templateId]: value === "" ? 0 : parseFloat(value),
      },
    }));
  };

  // Calculate total charges for a payment (room)
  const calculateTotal = (paymentId) => {
    if (!chargeTemplates) return 0;

    return chargeTemplates.reduce((sum, t) => {
      let units = 0;

      if (t.chargeType === "Electricity") {
        units =
          (currentReadings[paymentId] || 0) -
          (previousReadings[paymentId] || 0);
        if (units < 0) units = 0;
      } else if (t.isVariable) {
        units = unitsData[paymentId]?.[t.chargeTemplateId] || 0;
      }

      const amount = t.isVariable ? units * t.defaultAmount : t.defaultAmount;
      return sum + amount;
    }, 0);
  };

  // Generate monthly charges (meter readings + variable charges)
  const handleGenerateCharges = async () => {
    if (!selectedMonth) {
      setMessage({ type: "error", text: "Select a month first!" });
      return;
    }

    setLoading(true);
    setMessage(null);

    try {
      const payload = {
        month: selectedMonth, // "2026-01"
        payments: rentPayments.map((p) => ({
          paymentId: p.paymentId,
          templates: chargeTemplates.map((t) => ({
            templateId: t.chargeTemplateId,
            units:
              t.chargeType === "Electricity"
                ? currentReadings[p.paymentId] || 0
                : unitsData[p.paymentId]?.[t.chargeTemplateId] || 0,
          })),
        })),
      };

      console.log("Payload sent to backend:", payload);

      const response = await generateMonthlyCharges(payload);

      if (response.success) {
        setMessage({
          type: "success",
          text: "Charges generated successfully!",
        });
      } else {
        setMessage({
          type: "error",
          text: response.message || "Error generating charges",
        });
      }
    } catch (error) {
      console.error("Error generating charges:", error);
      setMessage({ type: "error", text: "Error generating charges" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 bg-white rounded-2xl shadow">
      <h1 className="text-xl font-bold mb-4">Generate Monthly Charges</h1>

      {message && (
        <div
          className={`mb-4 p-2 rounded ${
            message.type === "success"
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          {message.text}
        </div>
      )}

      <div className="mb-4">
        <label className="mr-2 font-semibold">Select Month:</label>
        <input
          type="month"
          value={selectedMonth}
          onChange={(e) => setSelectedMonth(e.target.value)}
          className="border p-1 rounded"
        />
      </div>

      <div className="overflow-x-auto">
        <table className="table-auto w-full border text-sm">
          <thead>
            <tr className="bg-gray-200">
              <th className="border px-2 py-1">Room</th>
              <th className="border px-2 py-1">Tenant</th>
              {chargeTemplates?.map((t) => (
                <th key={t.chargeTemplateId} className="border px-2 py-1">
                  {t.chargeType} {t.isVariable ? "(Units)" : ""}
                </th>
              ))}
              <th className="border px-2 py-1">Total</th>
            </tr>
          </thead>
          <tbody>
            {rentPayments.map((p) => (
              <tr key={p.paymentId}>
                <td className="border px-2 py-1">{p.roomTitle}</td>
                <td className="border px-2 py-1">{p.tenantName}</td>
                {chargeTemplates.map((t) => (
                  <td key={t.chargeTemplateId} className="border px-2 py-1">
                    {t.chargeType === "Electricity" ? (
                      <input
                        type="number"
                        min={0}
                        value={currentReadings[p.paymentId] ?? ""}
                        onChange={(e) =>
                          handleReadingChange(p.paymentId, e.target.value)
                        }
                        className="w-20 border rounded p-1"
                      />
                    ) : t.isVariable ? (
                      <input
                        type="number"
                        min={0}
                        value={
                          unitsData[p.paymentId]?.[t.chargeTemplateId] ?? ""
                        }
                        onChange={(e) =>
                          handleUnitChange(
                            p.paymentId,
                            t.chargeTemplateId,
                            e.target.value,
                          )
                        }
                        className="w-20 border rounded p-1"
                      />
                    ) : (
                      t.defaultAmount
                    )}
                  </td>
                ))}
                <td className="border px-2 py-1 font-semibold">
                  {calculateTotal(p.paymentId).toFixed(2)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <button
        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded disabled:opacity-50"
        onClick={handleGenerateCharges}
        disabled={loading}
      >
        {loading ? "Generating..." : "Generate Charges"}
      </button>
    </div>
  );
}

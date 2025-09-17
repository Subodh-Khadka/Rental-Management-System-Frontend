import { useEffect, useState } from "react";
import useRentPayments from "../hooks/useRentPayment";
import useChargeTemplate from "../hooks/useChargeTemplate";
import { generateMonthlyCharges } from "../api/monthlyCharge";

export default function GenerateMonthlyCharge() {
  const [chargeTemplates, setChargeTemplates] = useState([]);
  const [rentPayments, setRentPayments] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState("");
  const [unitsData, setUnitsData] = useState({}); // { paymentId: { templateId: units } }
  const [loading, setLoading] = useState(false);

  const { chargeTemplates: templates } = useChargeTemplate();
  const { rentPayments: payments } = useRentPayments();

  // ✅ sync hook data into local state safely
  useEffect(() => {
    if (templates) setChargeTemplates(templates);
  }, [templates]);

  useEffect(() => {
    if (payments) setRentPayments(payments);
  }, [payments]);

  // Track unit input changes
  const handleUnitChange = (paymentId, templateId, value) => {
    setUnitsData((prev) => ({
      ...prev,
      [paymentId]: {
        ...prev[paymentId],
        [templateId]: parseFloat(value),
      },
    }));
    // console.log(unitsData);
  };

  // Bulk generate charges via backend
  const handleGenerateCharges = async () => {
    if (!selectedMonth) {
      alert("Select a month first!");
      return;
    }

    setLoading(true);
    try {
      await generateMonthlyCharges({
        month: selectedMonth,
        unitsData: unitsData,
      });

      alert("Monthly charges generated successfully!");
    } catch (err) {
      console.error(err);
      alert("Error generating charges");
    }
    setLoading(false);
  };

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Generate Monthly Charges</h1>

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
        <table className="table-auto w-full border">
          <thead>
            <tr className="bg-gray-200">
              <th className="border px-2 py-1">Room</th>
              <th className="border px-2 py-1">Tenant</th>
              {chargeTemplates.map((t) => (
                <th key={t.chargeTemplateId} className="border px-2 py-1">
                  {t.chargeType} {t.isVariable ? "(Units)" : ""}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rentPayments.map((p) => (
              <tr key={p.paymentId}>
                <td className="border px-2 py-1">{p.roomTitle}</td>
                <td className="border px-2 py-1">{p.tenantName}</td>
                {chargeTemplates.map((t) => (
                  <td key={t.chargeTemplateId} className="border px-2 py-1">
                    {t.isVariable ? (
                      <input
                        type="number"
                        min={0}
                        value={
                          unitsData[p.paymentId]?.[t.chargeTemplateId] || 0
                        }
                        onChange={(e) =>
                          handleUnitChange(
                            p.paymentId,
                            t.chargeTemplateId,
                            e.target.value
                          )
                        }
                        className="w-16 border rounded p-1"
                      />
                    ) : (
                      t.defaultAmount
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <button
        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded"
        onClick={handleGenerateCharges}
        disabled={loading}
      >
        {loading ? "Generating..." : "Generate Charges"}
      </button>
    </div>
  );
}

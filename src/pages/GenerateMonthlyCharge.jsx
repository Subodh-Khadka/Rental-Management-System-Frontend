import { useState, useEffect } from "react";
import useChargeTemplate from "../hooks/useChargeTemplate";
import { generateMonthlyCharges } from "../api/monthlyCharge";
import { getRentPaymentsByMonth } from "../api/rentPayment";

export default function GenerateMonthlyCharge() {
  const { chargeTemplates } = useChargeTemplate();
  const [rentPayments, setRentPayments] = useState([]);

  // const { rentPayments } = useRentPayments();

  const [selectedMonth, setSelectedMonth] = useState("");
  const [unitsData, setUnitsData] = useState({});
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);

  useEffect(() => {
    const fetchPayments = async () => {
      if (!selectedMonth) {
        setRentPayments([]);
        return;
      }

      const data = await getRentPaymentsByMonth(selectedMonth);
      setRentPayments(data);
    };

    fetchPayments();
  }, [selectedMonth]);

  // Track unit input changes safely
  const handleUnitChange = (paymentId, templateId, value) => {
    setUnitsData((prev) => ({
      ...prev,
      [paymentId]: {
        ...(prev[paymentId] || {}),
        [templateId]: value === "" ? 0 : parseFloat(value),
      },
    }));
  };

  // Calculate total charges for a given payment (room)
  const calculateTotal = (paymentId) => {
    if (!chargeTemplates) return 0;
    return chargeTemplates.reduce((sum, t) => {
      const units = unitsData[paymentId]?.[t.chargeTemplateId] || 0;
      const amount = t.isVariable ? units * t.defaultAmount : t.defaultAmount;
      return sum + amount;
    }, 0);
  };

  // Bulk generate charges via backend
  const handleGenerateCharges = async () => {
    if (!selectedMonth) {
      setMessage({ type: "error", text: "Select a month first!" });
      return;
    }

    // Check if all variable charges have values
    const missing = rentPayments.some((p) =>
      chargeTemplates.some(
        (t) =>
          t.isVariable &&
          (unitsData[p.paymentId]?.[t.chargeTemplateId] === undefined ||
            unitsData[p.paymentId]?.[t.chargeTemplateId] < 0)
      )
    );
    if (missing) {
      setMessage({ type: "error", text: "Please fill all required units!" });
      return;
    }

    setLoading(true);
    setMessage(null);

    const result = await generateMonthlyCharges({
      month: selectedMonth,
      unitsData: unitsData,
    });

    if (!result.success) {
      setMessage({ type: "error", text: result.message });
    } else {
      setMessage({ type: "success", text: result.message });
    }

    setLoading(false);
  };

  return (
    <div className="p-6 bg-white rounded-2xl shadow">
      <h1 className="text-xl font-bold mb-4">Generate Monthly Charges</h1>

      {/* Feedback message */}
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

      {/* Charges Table */}
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
            {rentPayments?.map((p) => (
              <tr key={p.paymentId}>
                <td className="border px-2 py-1">{p.roomTitle}</td>
                <td className="border px-2 py-1">{p.tenantName}</td>
                {chargeTemplates?.map((t) => (
                  <td key={t.chargeTemplateId} className="border px-2 py-1">
                    {t.isVariable ? (
                      <input
                        type="number"
                        min={0}
                        step="0.01"
                        value={
                          unitsData[p.paymentId]?.[t.chargeTemplateId] || ""
                        }
                        onChange={(e) =>
                          handleUnitChange(
                            p.paymentId,
                            t.chargeTemplateId,
                            e.target.value
                          )
                        }
                        className="w-20 border rounded p-1"
                        disabled={!selectedMonth}
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

      {/* Action Button */}
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

// import { useEffect, useState } from "react";
// import useRentPayments from "../hooks/useRentPayment";
// import useChargeTemplate from "../hooks/useChargeTemplate";
// import { generateMonthlyCharges } from "../api/monthlyCharge";

// export default function GenerateMonthlyCharge() {
//   const [chargeTemplates, setChargeTemplates] = useState([]);
//   const [rentPayments, setRentPayments] = useState([]);
//   const [selectedMonth, setSelectedMonth] = useState("");
//   const [unitsData, setUnitsData] = useState({}); // { paymentId: { templateId: units } }
//   const [loading, setLoading] = useState(false);

//   const { chargeTemplates: templates } = useChargeTemplate();
//   const { rentPayments: payments } = useRentPayments();

//   // sync hook data into local state safely
//   useEffect(() => {
//     if (templates) setChargeTemplates(templates);
//   }, [templates]);

//   useEffect(() => {
//     if (payments) setRentPayments(payments);
//   }, [payments]);

//   // Track unit input changes
//   const handleUnitChange = (paymentId, templateId, value) => {
//     setUnitsData((prev) => ({
//       ...prev,
//       [paymentId]: {
//         ...(prev[paymentId] || {}), // ensure object exists
//         [templateId]: value === "" ? 0 : parseFloat(value),
//       },
//     }));
//   };

//   // Bulk generate charges via backend
//   const handleGenerateCharges = async () => {
//     if (!selectedMonth) {
//       alert("Select a month first!");
//       return;
//     }

//     setLoading(true);
//     try {
//       await generateMonthlyCharges({
//         month: selectedMonth,
//         unitsData: unitsData,
//       });

//       alert("Monthly charges generated successfully!");
//     } catch (err) {
//       console.error(err);
//       alert("Error generating charges");
//     }
//     setLoading(false);
//   };

//   return (
//     <div className="p-6 bg-white rounded-2xl">
//       <h1 className="text-xl font-bold mb-4">Generate Monthly Charges</h1>

//       <div className="mb-4">
//         <label className="mr-2 font-semibold">Select Month:</label>
//         <input
//           type="month"
//           value={selectedMonth}
//           onChange={(e) => setSelectedMonth(e.target.value)}
//           className="border p-1 rounded"
//         />
//       </div>

//       <div className="overflow-x-auto">
//         <table className="table-auto w-full border">
//           <thead>
//             <tr className="bg-gray-200">
//               <th className="border px-2 py-1">Room</th>
//               <th className="border px-2 py-1">Tenant</th>
//               {chargeTemplates.map((t) => (
//                 <th key={t.chargeTemplateId} className="border px-2 py-1">
//                   {t.chargeType} {t.isVariable ? "(Units)" : ""}
//                 </th>
//               ))}
//             </tr>
//           </thead>
//           <tbody>
//             {rentPayments.map((p) => (
//               <tr key={p.paymentId}>
//                 <td className="border px-2 py-1">{p.roomTitle}</td>
//                 <td className="border px-2 py-1">{p.tenantName}</td>
//                 {chargeTemplates.map((t) => (
//                   <td key={t.chargeTemplateId} className="border px-2 py-1">
//                     {t.isVariable ? (
//                       <input
//                         type="number"
//                         min={0}
//                         value={
//                           unitsData[p.paymentId]?.[t.chargeTemplateId] || 0
//                         }
//                         onChange={(e) =>
//                           handleUnitChange(
//                             p.paymentId,
//                             t.chargeTemplateId,
//                             e.target.value
//                           )
//                         }
//                         className="w-16 border rounded p-1"
//                       />
//                     ) : (
//                       t.defaultAmount
//                     )}
//                   </td>
//                 ))}
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>

//       <button
//         className="mt-4 px-4 py-2 bg-blue-600 text-white rounded"
//         onClick={handleGenerateCharges}
//         disabled={loading}
//       >
//         {loading ? "Generating..." : "Generate Charges"}
//       </button>
//     </div>
//   );
// }

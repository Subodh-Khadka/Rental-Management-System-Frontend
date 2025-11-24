import { useEffect, useState } from "react";
import Button from "../Shared/Table/Button/Button"; // adjust if path differs
import { MdOutlineCancel } from "react-icons/md";
import { GrSave } from "react-icons/gr";
import { useNotification } from "../../context/NotificationContext";
import { getRentPayments } from "../../api/transactionService";

export default function TransactionForm({ transaction, onCancel, onSave }) {
  const { addNotification } = useNotification();

  const [rentPaymentId, setRentPaymentId] = useState(
    transaction?.rentPaymentId || ""
  );
  const [paymentDate, setPaymentDate] = useState(
    transaction?.paymentDate ? formatForInput(transaction.paymentDate) : ""
  );
  const [amountPaid, setAmountPaid] = useState(transaction?.amountPaid ?? "");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [rentPayments, setRentPayments] = useState([]);

  useEffect(() => {
    loadRentPayments();
  }, []);

  async function loadRentPayments() {
    try {
      const data = await getRentPayments();
      setRentPayments(data);
    } catch (err) {
      console.error("Failed to load rent payments", err);
    }
  }

  function formatForInput(dateString) {
    if (!dateString) return "";
    const d = new Date(dateString);
    const yyyy = d.getFullYear();
    const mm = String(d.getMonth() + 1).padStart(2, "0");
    const dd = String(d.getDate()).padStart(2, "0");
    return `${yyyy}-${mm}-${dd}`;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const payload = {
      rentPaymentId: rentPaymentId,
      paymentDate: paymentDate ? new Date(paymentDate).toISOString() : null,
      amountPaid: amountPaid === "" ? null : Number(amountPaid),
    };

    try {
      if (transaction && transaction.transactionId) {
        const updated = { ...transaction, ...payload };
        await onSave(updated);
        addNotification("success", "Transaction updated successfully");
      } else {
        await onSave(payload);
        addNotification("success", "Transaction created successfully");
      }
    } catch (err) {
      addNotification("error", "Failed to save transaction");
      setError(err.message || "Operation failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-3 mb-5 w-full bg-white p-4"
    >
      <p className="font-bold">
        {transaction ? "Edit Transaction" : "Create Transaction"}
      </p>

      <div className="flex flex-col gap-2">
        <label className="font-bold">Rent Payment</label>
        <select
          value={rentPaymentId}
          onChange={(e) => setRentPaymentId(e.target.value)}
          required
          className="bg-stone-100 shadow-sm p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-200"
        >
          <option value="">Select rent payment</option>
          {rentPayments.map((rp) => (
            <option key={rp.rentPaymentId} value={rp.rentPaymentId}>
              {rp.description ?? `${rp.rentPaymentId}`}{" "}
            </option>
          ))}
        </select>
      </div>

      <div className="flex flex-col gap-2">
        <label className="font-bold">Payment Date</label>
        <input
          type="date"
          value={paymentDate}
          onChange={(e) => setPaymentDate(e.target.value)}
          className="bg-stone-100 shadow-sm p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-200"
        />
      </div>

      <div className="flex flex-col gap-2">
        <label className="font-bold">Amount Paid</label>
        <input
          type="number"
          step="0.01"
          value={amountPaid}
          onChange={(e) => setAmountPaid(e.target.value)}
          placeholder="0.00"
          className="bg-stone-100 shadow-sm p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-200"
          required
        />
      </div>

      {error && <p className="text-red-500 text-sm">{error}</p>}

      <div className="form-div flex gap-3 p-2 items-center">
        <Button
          variant="black"
          size="sm"
          type="button"
          onClick={onCancel}
          className="flex gap-1 items-center"
        >
          <MdOutlineCancel /> Cancel
        </Button>

        <Button
          variant="danger"
          size="sm"
          className="flex items-center gap-1"
          type="submit"
          isLoading={loading}
          disabled={loading}
          loadingText="Saving..."
        >
          <GrSave /> Save
        </Button>
      </div>
    </form>
  );
}

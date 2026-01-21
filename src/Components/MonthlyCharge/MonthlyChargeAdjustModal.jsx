import { useState } from "react";
import Button from "../Shared/Table/Button/Button";
import { updateMonthlyCharge } from "../../api/monthlyCharge";
import { useNotification } from "../../context/NotificationContext";

export default function MonthlyChargeAdjustModal({
  charge,
  onClose,
  onUpdated,
}) {
  const { addNotification } = useNotification();
  const [amount, setAmount] = useState(charge.amount);
  const [units, setUnits] = useState(charge.units ?? "");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);

      const updated = await updateMonthlyCharge(charge.monthlyChargeId, {
        amount: parseFloat(amount),
        units: units ? parseFloat(units) : null,
      });

      // Update parent table
      onUpdated && onUpdated(updated);

      addNotification("success", "Charge adjusted successfully");
      onClose();
    } catch (err) {
      console.error("Update error:", err);
      addNotification("error", err.message || "Failed to adjust charge");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/30">
      <div className="bg-white w-full max-w-md rounded-xl p-5 shadow-lg">
        <h2 className="font-bold text-lg mb-3">Adjust Monthly Charge</h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <div>
            <label className="font-semibold">Units</label>
            <input
              type="number"
              value={units}
              onChange={(e) => setUnits(e.target.value)}
              className="w-full p-2 bg-stone-100 rounded"
            />
          </div>

          <div>
            <label className="font-semibold">Amount</label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full p-2 bg-stone-100 rounded"
              required
            />
          </div>

          <div className="flex justify-end gap-2 mt-3">
            <Button type="button" variant="black" size="sm" onClick={onClose}>
              Cancel
            </Button>

            <Button
              type="submit"
              variant="primary"
              size="sm"
              isLoading={loading}
              loadingText="Saving..."
            >
              Save
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

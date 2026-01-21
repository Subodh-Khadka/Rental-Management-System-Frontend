import { useState } from "react";
import TableHeaderCell from "../Shared/Table/TableHeaderCell";
import MonthlyChargeItem from "./MonthlyChargeItem";
import MonthlyChargeAdjustModal from "./MonthlyChargeAdjustModal";

export default function MonthlyChargeTable({ monthlyChargeData, onUpdate }) {
  const [editingCharge, setEditingCharge] = useState(null);

  const totalAmount = monthlyChargeData.reduce(
    (sum, item) => sum + parseFloat(item.amount),
    0,
  );

  // This handles update from the modal
  const handleChargeUpdate = (updatedCharge) => {
    if (onUpdate) {
      onUpdate(updatedCharge); // call the parent hook updater
    }
    setEditingCharge(null); // close modal
  };

  return (
    <section className="bg-white p-4 rounded-2xl shadow-lg">
      <h1 className="text-lg text-center font-bold mb-3">Monthly Charges</h1>

      {editingCharge && (
        <MonthlyChargeAdjustModal
          charge={editingCharge}
          onClose={() => setEditingCharge(null)}
          onUpdated={handleChargeUpdate}
        />
      )}

      <table className="w-full text-left table-auto text-sm">
        <thead>
          <tr>
            <TableHeaderCell>S.N</TableHeaderCell>
            <TableHeaderCell>Room</TableHeaderCell>
            <TableHeaderCell>Tenant</TableHeaderCell>
            <TableHeaderCell>Month</TableHeaderCell>
            <TableHeaderCell>Charge Type</TableHeaderCell>
            <TableHeaderCell>Units</TableHeaderCell>
            <TableHeaderCell>Amount</TableHeaderCell>
            <TableHeaderCell>Status</TableHeaderCell>
            <TableHeaderCell>Actions</TableHeaderCell>
          </tr>
        </thead>

        <tbody>
          {monthlyChargeData.length > 0 ? (
            monthlyChargeData.map((charge, index) => (
              <MonthlyChargeItem
                key={charge.monthlyChargeId}
                charge={charge}
                index={index}
                onEdit={setEditingCharge}
              />
            ))
          ) : (
            <tr>
              <td colSpan={9} className="text-center py-4">
                No Data Available
              </td>
            </tr>
          )}
        </tbody>

        {monthlyChargeData.length > 0 && (
          <tfoot>
            <tr className="font-bold border-t">
              <td colSpan={6} className="text-right pr-4">
                Total
              </td>
              <td>₹ {totalAmount}</td>
              <td colSpan={2}></td>
            </tr>
          </tfoot>
        )}
      </table>
    </section>
  );
}

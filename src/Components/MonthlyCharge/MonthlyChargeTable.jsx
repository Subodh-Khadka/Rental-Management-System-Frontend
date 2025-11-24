import TableHeaderCell from "../Shared/Table/TableHeaderCell";
import MonthlyChargeItem from "./MonthlyChargeItem";

export default function MonthlyChargeTable({ monthlyChargeSummaryData }) {
  return (
    <section className="bg-white p-4 rounded-2xl shadow-lg">
      <h1 className="text-lg text-center font-bold mb-3">Monthly Charges</h1>
      <div>
        <table className="w-full text-left table-auto text-sm">
          <thead>
            <tr>
              <TableHeaderCell>S.N</TableHeaderCell>
              <TableHeaderCell>Room</TableHeaderCell>
              <TableHeaderCell>Tenant</TableHeaderCell>
              <TableHeaderCell>Month</TableHeaderCell>
              <TableHeaderCell>Total Amount</TableHeaderCell>
              <TableHeaderCell>Status</TableHeaderCell>
              <TableHeaderCell>Actions</TableHeaderCell>
            </tr>
          </thead>
          <tbody>
            {monthlyChargeSummaryData.length > 0 ? (
              monthlyChargeSummaryData.map((summary, index) => (
                <MonthlyChargeItem
                  key={`${summary.roomName}-${summary.tenantName}-${summary.month}`}
                  summary={summary}
                  index={index}
                />
              ))
            ) : (
              <tr>
                <td colSpan={7} className="text-center py-4">
                  <span>No Data Available</span>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}

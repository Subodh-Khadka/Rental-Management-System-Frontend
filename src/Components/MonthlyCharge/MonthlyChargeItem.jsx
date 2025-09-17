import TabelCell from "../Shared/Table/TabelCell";

export default function MonthlyChargeItem({ summary, index }) {
  return (
    <tr>
      <TabelCell>{index + 1}</TabelCell>
      <TabelCell>{summary.roomName}</TabelCell>
      <TabelCell>{summary.tenantName}</TabelCell>
      <TabelCell>{summary.month}</TabelCell>
      <TabelCell>{summary.totalAmount}</TabelCell>
      <TabelCell>{summary.status}</TabelCell>
      <TabelCell>
        {/* Example actions */}
        <button className="text-blue-500">View</button>
        <button className="text-red-500 ml-2">Delete</button>
      </TabelCell>
    </tr>
  );
}

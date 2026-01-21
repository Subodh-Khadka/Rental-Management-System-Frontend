import TabelCell from "../Shared/Table/TabelCell";
import { FaEdit } from "react-icons/fa";

export default function MonthlyChargeItem({ charge, index, onEdit }) {
  return (
    <tr>
      <TabelCell>{index + 1}</TabelCell>
      <TabelCell>{charge.roomName}</TabelCell>
      <TabelCell>{charge.tenantName}</TabelCell>
      <TabelCell>{charge.month}</TabelCell>
      <TabelCell>{charge.chargeType}</TabelCell>
      <TabelCell>{charge.units ?? "-"}</TabelCell>
      <TabelCell>₹ {charge.amount}</TabelCell>

      <TabelCell>
        <span
          className={`px-2 py-1 rounded text-xs font-semibold
            ${
              charge.status === "Paid"
                ? "bg-green-600 text-white"
                : "bg-yellow-500 text-white"
            }`}
        >
          {charge.status}
        </span>
      </TabelCell>

      <TabelCell>
        {charge.status === "Pending" && (
          <FaEdit
            className="text-blue-600 hover:underline size-5"
            onClick={() => onEdit(charge)}
          >
            Adjust
          </FaEdit>
        )}
      </TabelCell>
    </tr>
  );
}

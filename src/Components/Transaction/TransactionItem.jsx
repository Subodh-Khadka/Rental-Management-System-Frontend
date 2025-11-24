import TableCell from "../Shared/Table/TabelCell";
import TableRow from "../Shared/Table/TableRow";
import Button from "../Shared/Table/Button/Button";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

export default function TransactionItem({
  transaction,
  index,
  onEdit,
  onDelete,
}) {
  const paymentDate = transaction.paymentDate
    ? new Date(transaction.paymentDate).toLocaleDateString()
    : "";

  return (
    <TableRow>
      <TableCell>{index + 1}</TableCell>
      <TableCell>{transaction.transactionId}</TableCell>
      <TableCell>{transaction.rentPaymentId}</TableCell>
      <TableCell>{paymentDate}</TableCell>
      <TableCell>{transaction.amountPaid ?? "-"}</TableCell>
      <TableCell className="flex gap-2">
        <Button
          variant="icon"
          size="sm"
          className="text-blue-600"
          onClick={onEdit}
        >
          <FaEdit size={18} />
        </Button>

        <Button
          variant="icon"
          size="sm"
          className="text-red-500"
          onClick={onDelete}
        >
          <MdDelete size={18} />
        </Button>
      </TableCell>
    </TableRow>
  );
}

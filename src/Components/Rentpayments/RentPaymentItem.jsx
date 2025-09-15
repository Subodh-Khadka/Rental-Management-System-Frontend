import TableRow from "../Shared/Table/TableRow";
import TableCell from "../Shared/Table/TabelCell";

// import { formatDateDisplay } from "../../utils/dateUtils";

import Button from "../Shared/Table/Button/Button";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { formatDateDisplay } from "../../utils/dateUtils";

export default function RentPaymentItem({
  rentPayment,
  index,
  onEdit,
  onDelete,
}) {
  return (
    <>
      <TableRow key={rentPayment.PaymentId}>
        <TableCell>{index + 1}</TableCell>
        <TableCell>{rentPayment?.roomTitle}</TableCell>
        <TableCell>{rentPayment.roomPrice}</TableCell>
        <TableCell>{rentPayment?.tenantName}</TableCell>
        <TableCell>{formatDateDisplay(rentPayment?.paymentMonth)}</TableCell>
        <TableCell>{rentPayment.totalAmount}</TableCell>
        <TableCell>{rentPayment?.paidAmount}</TableCell>
        <TableCell>{rentPayment?.dueAmount}</TableCell>
        <TableCell>
          <Button
            size="sm"
            variant="icon"
            className="text-blue-600"
            onClick={() => onEdit(rentPayment)}
          >
            <FaEdit size={20} className="mr-1" />
          </Button>
          <Button
            size="sm"
            variant="icon"
            className=" text-red-500"
            onClick={() => onDelete(rentPayment.paymentId)}
          >
            <MdDelete size={20} className="mr-1" />
          </Button>
        </TableCell>
      </TableRow>
    </>
  );
}

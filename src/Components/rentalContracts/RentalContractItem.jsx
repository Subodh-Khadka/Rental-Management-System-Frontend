import TableRow from "../Shared/Table/TableRow";
import TableCell from "../Shared/Table/TabelCell";

import { formatDateDisplay } from "../../utils/dateUtils";

import Button from "../Shared/Table/Button/Button";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

export default function RentalContractItem({
  rentalContract,
  index,
  assignedRoom,
  assignedTenant,
  onEdit,
  onDelete,
}) {
  return (
    <>
      <TableRow key={rentalContract.tenantId}>
        <TableCell>{index + 1}</TableCell>
        <TableCell>{assignedTenant?.name}</TableCell>
        <TableCell>{assignedRoom?.roomTitle}</TableCell>
        <TableCell>
          {rentalContract.startDate
            ? formatDateDisplay(rentalContract.startDate)
            : "N/A"}
        </TableCell>
        <TableCell>
          {rentalContract.endDate
            ? formatDateDisplay(rentalContract.endDate)
            : "N/A"}
        </TableCell>
        <TableCell>{rentalContract?.terms}</TableCell>
        <TableCell>
          <Button
            size="sm"
            variant="icon"
            className="text-blue-600"
            onClick={() => onEdit(rentalContract)}
          >
            <FaEdit size={20} className="mr-1" />
          </Button>
          <Button
            size="sm"
            variant="icon"
            className=" text-red-500"
            onClick={() => onDelete(rentalContract.rentalContractId)}
          >
            <MdDelete size={20} className="mr-1" />
          </Button>
        </TableCell>
      </TableRow>
    </>
  );
}

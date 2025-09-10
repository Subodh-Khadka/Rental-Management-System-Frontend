import TableRow from "../Shared/Table/TableRow";
import TableCell from "../Shared/Table/TabelCell";

import Button from "../Shared/Table/Button/Button";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

export default function TenantItem({
  tenant,
  index,
  assignedRoom,
  onEdit,
  onDelete,
}) {
  return (
    <>
      <TableRow key={tenant.tenantId}>
        <TableCell>{index + 1}</TableCell>
        <TableCell>{tenant.name}</TableCell>
        <TableCell>{tenant.phoneNumber}</TableCell>
        <TableCell>
          {tenant.emailAddress ? tenant.emailAddress : "N/A"}
        </TableCell>
        <TableCell>{assignedRoom?.roomTitle || "N/A"}</TableCell>
        <TableCell>
          <Button
            size="sm"
            variant="icon"
            className="text-blue-600"
            onClick={() => onEdit(tenant)}
          >
            <FaEdit size={20} className="mr-1" />
          </Button>
          <Button
            size="sm"
            variant="icon"
            className=" text-red-500"
            onClick={() => onDelete(tenant.tenantId)}
          >
            <MdDelete size={20} className="mr-1" />
          </Button>
        </TableCell>
      </TableRow>
    </>
  );
}

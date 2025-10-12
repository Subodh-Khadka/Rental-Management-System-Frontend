import TableRow from "../Shared/Table/TableRow";
import TableCell from "../Shared/Table/TabelCell";
import Button from "../Shared/Table/Button/Button";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

export default function ChargeTemplateItem({
  template,
  index,
  onEdit,
  onDelete,
}) {
  return (
    <>
      <TableRow key={template.chargeTemplateId}>
        <TableCell>{index + 1}</TableCell>
        <TableCell>{template.chargeType}</TableCell>
        <TableCell>{template.defaultAmount}</TableCell>
        <TableCell>{template.isVariable ? "Yes" : "No"}</TableCell>
        <TableCell>{template.calculationMethod}</TableCell>
        <TableCell>{template.isActive ? "Active" : "Inactive"}</TableCell>
        <TableCell>
          <Button
            size="sm"
            variant="icon"
            className="text-blue-600"
            onClick={() => onEdit(template)}
          >
            <FaEdit size={20} className="mr-1" />
          </Button>
          <Button
            size="sm"
            variant="icon"
            className=" text-red-500"
            onClick={() => onDelete(template.chargeTemplateId)}
          >
            <MdDelete size={20} className="mr-1" />
          </Button>
        </TableCell>
      </TableRow>
    </>
  );
}

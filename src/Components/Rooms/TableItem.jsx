import TableCell from "../Shared/Table/TabelCell";
import TableRow from "../Shared/Table/TableRow";
import Button from "../Shared/Table/Button/Button";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

export default function TableItem({ room, index, onEdit, onDelete }) {
  return (
    <TableRow key={room.roomId}>
      <TableCell>{index + 1}</TableCell>
      <TableCell>{room.roomTitle}</TableCell>
      <TableCell>{room.roomPrice}</TableCell>
      <TableCell className="flex">
        <Button
          variant="icon"
          size="sm"
          className="text-blue-600"
          onClick={() => onEdit(room)}
        >
          <FaEdit size={20} className="mr-1" />
        </Button>

        <Button
          variant="icon"
          size="sm"
          className=" text-red-500"
          onClick={() => onDelete(room)}
        >
          <MdDelete size={20} className="mr-1" />
        </Button>
      </TableCell>
    </TableRow>
  );
}

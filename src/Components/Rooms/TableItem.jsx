import TableCell from "../Shared/Table/TabelCell";
import TableRow from "../Shared/Table/TableRow";
import Button from "../Shared/Table/Button/Button";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

export default function TableItem({ room }) {
  return (
    <TableRow key={room.roomId}>
      {/* <td>{room.roomId}</td> */}
      <TableCell>{room.roomTitle}</TableCell>
      <TableCell>{room.roomPrice}</TableCell>
      <TableCell className="flex align-items-center">
        <Button variant="icon" size="sm" className="text-blue-600-300">
          <FaEdit size={20} className="mr-1" />
        </Button>

        <Button variant="icon" size="" className=" text-red-500">
          <MdDelete size={20} className="mr-1" />
        </Button>
      </TableCell>
    </TableRow>
  );
}

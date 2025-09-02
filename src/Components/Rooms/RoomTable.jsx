import TableHeaderCell from "../Shared/Table/TableHeaderCell";
import TableItem from "./TableItem";

export default function RoomTable({ roomData }) {
  return (
    <>
      <section className="bg-white p-4 rounded-2xl shadow-lg">
        <h1 className="text-lg text-center font-bold mb-3">Room Details</h1>
        <div>
          <table className="w-full text-left table-auto table-bordered text-sm-center">
            <thead>
              <tr>
                <TableHeaderCell>Room Title</TableHeaderCell>
                <TableHeaderCell>Room Price</TableHeaderCell>
                <TableHeaderCell>Actions</TableHeaderCell>
              </tr>
            </thead>

            <tbody>
              {roomData.map((room) => (
                <TableItem key={room.roomId} room={room} />
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
}

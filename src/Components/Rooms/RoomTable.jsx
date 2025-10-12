import { useState } from "react";
import TableHeaderCell from "../Shared/Table/TableHeaderCell";
import TableItem from "./TableItem";
import RoomForm from "./RoomForm";
import { updateRoom, createRoom } from "../../api/roomService";
import { deleteRoom } from "../../api/roomService";
import Button from "../Shared/Table/Button/Button";
import { IoAddOutline } from "react-icons/io5";

export default function RoomTable({
  roomData,
  onRoomUpdate,
  onRoomDelete,
  onRoomCreate,
}) {
  const [editingRoom, setEditingRoom] = useState(null);
  const [creatingRoom, setCreatingRoom] = useState(false);

  function handleEdit(room) {
    setEditingRoom(room); // set the room to be edited
  }

  async function handleSave(roomData) {
    try {
      if (roomData.roomId) {
        const savedRoom = await updateRoom(roomData.roomId, roomData);
        onRoomUpdate(savedRoom);
        setEditingRoom(null);
      } else {
        const newRoom = await createRoom(roomData);
        onRoomCreate(newRoom);
        setCreatingRoom(false);
      }
    } catch (err) {
      console.error("Error saving room,", err);
      alert("Failed to save changes");
    }
  }

  async function handleDelete(room) {
    try {
      const deletedRoomId = await deleteRoom(room.roomId);
      console.log(deletedRoomId);
      onRoomDelete(deletedRoomId);
    } catch (err) {
      console.log("Error deleting room:", err);
      alert(err.message || "Failed to delete the room");
    }
  }

  return (
    <>
      {creatingRoom && (
        <section>
          <RoomForm
            onSave={handleSave}
            onCancel={() => setCreatingRoom(null)}
          />
        </section>
      )}

      {/* Show RoomForm only if a room is being edited */}
      {editingRoom && (
        <section>
          <RoomForm
            room={editingRoom}
            onCancel={() => setEditingRoom(null)}
            onSave={handleSave}
          />
        </section>
      )}

      <section className="bg-white p-4 rounded-2xl shadow-lg">
        <h1 className="text-lg text-center font-bold mb-3">Room Details</h1>
        <div>
          <Button
            size="md"
            variant="primary"
            className="mb-2 flex items-center gap-2"
            onClick={() => setCreatingRoom(true)}
          >
            <IoAddOutline />
            Create Room
          </Button>
          <table className="w-full text-left table-auto table-bordered text-sm-center">
            <thead>
              <tr>
                <TableHeaderCell>S.N</TableHeaderCell>
                <TableHeaderCell>Room Title</TableHeaderCell>
                <TableHeaderCell>Room Price</TableHeaderCell>
                <TableHeaderCell>Status</TableHeaderCell>
                <TableHeaderCell>Actions</TableHeaderCell>
              </tr>
            </thead>

            <tbody>
              {roomData.map(
                (
                  room,
                  index // Changed from 'rooms' to 'roomData'
                ) => (
                  <TableItem
                    key={room.roomId}
                    room={room}
                    index={index}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                  />
                )
              )}
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
}

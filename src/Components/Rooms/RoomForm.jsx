import { useState } from "react";
import Button from "../Shared/Table/Button/Button";
import { MdOutlineCancel } from "react-icons/md";
import { GrSave } from "react-icons/gr";

import { useNotification } from "../../context/NotificationContext";

export default function RoomForm({ room, onCancel, onSave }) {
  const { addNotification } = useNotification();

  const [title, setTitle] = useState(room?.roomTitle || "");
  const [price, setPrice] = useState(room?.roomPrice || "");
  const [IsActive, setIsActive] = useState(room?.IsActive || false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handlePriceChange = (e) => {
    setPrice(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const roomToCreate = {
      roomTitle: title,
      roomPrice: price,
      isActive: IsActive,
    };

    const updatedRoom = {
      ...room,
      roomTitle: title,
      roomPrice: price,
      isActive: IsActive,
    };

    try {
      setLoading(true);
      if (room) {
        await onSave(updatedRoom);
        addNotification("success", "Room updated successfully");
      } else {
        await onSave(roomToCreate);
        addNotification("success", "Room created successfully");
      }
    } catch (err) {
      if (room) {
        addNotification("error", "Failed to update room");
      } else {
        addNotification("error", "Failed to create room");
      }
      setError(err.message || "Operation failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-3 mb-5 w-100 bg-white p-4"
    >
      <p className="font-bold"> {room ? "Edit Room" : "Create Room"}</p>

      <div className="flex flex-col gap-2">
        <label htmlFor="Title" className="font-bold">
          Title:
        </label>
        <input
          type="text"
          value={title}
          placeholder="Room Title"
          onChange={handleTitleChange}
          className="bg-stone-100 shadow-sm p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-200"
          required
        />
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="Price" className="font-bold">
          Price:
        </label>
        <input
          type="number"
          value={price}
          onChange={handlePriceChange}
          className="bg-stone-100 shadow-sm p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-200"
          required
        />
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="IsActive" className="font-bold">
          Active:
        </label>
        <input
          type="checkbox"
          checked={IsActive || false}
          onChange={(e) => setIsActive(e.target.checked)}
          className="w-5 h-5"
        />
      </div>

      <div className="form-div flex gap-3 p-2 items-center">
        <Button
          variant="black"
          size="sm"
          type="button"
          onClick={onCancel}
          className="flex gap-1 items-center"
        >
          <MdOutlineCancel /> Cancel{" "}
        </Button>
        <Button
          variant="danger"
          size="sm"
          className="flex items-center gap-1"
          type="submit"
          isLoading={loading}
          disabled={loading === true}
          loadingText="saving..."
        >
          <GrSave /> Save
        </Button>
      </div>
    </form>
  );
}

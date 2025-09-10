import { useState, useEffect } from "react";
import { getRooms } from "../api/roomService";

export default function useRooms() {
  const [rooms, setRooms] = useState([]);
  const [loading, setIsloading] = useState(false);
  const [error, setError] = useState(null);

  // Load all rooms from API
  const loadRooms = async () => {
    setIsloading(true);
    setError(null);
    try {
      const data = await getRooms();
      setRooms(data);
    } catch (error) {
      setError(error.message || "Failed to load rooms...");
    } finally {
      setIsloading(false);
    }
  };

  // Create a room in state
  const createRoomInState = async (newRoom) => {
    setRooms((prevRooms) => [newRoom, ...prevRooms]);
  };

  // Update a room in  state
  const updateRoomInState = async (updatedRoom) => {
    setRooms((prevRooms) =>
      prevRooms.map((room) =>
        room.roomId === updatedRoom.roomId ? updatedRoom : room
      )
    );
  };

  // Delete a room from state
  const deleteRoomInState = async (deletedRoomId) => {
    setRooms((prevRooms) =>
      prevRooms.filter((room) => room.roomId !== deletedRoomId)
    );
  };

  useEffect(() => {
    loadRooms();
  }, []);

  return {
    rooms,
    loading,
    error,
    setRooms,
    loadRooms,
    updateRoomInState,
    deleteRoomInState,
    createRoomInState,
  };
}

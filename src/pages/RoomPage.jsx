// import { useEffect } from "react";
import RoomTable from "../Components/Rooms/RoomTable";
import useRooms from "../hooks/UseRooms";

export default function RoomPage() {
  const {
    rooms,
    updateRoomInState,
    deleteRoomInState,
    createRoomInState,
    // loadRooms,
    loading,
    error,
  } = useRooms();

  // useEffect(() => {
  //   loadRooms(); // fetch rooms only when this page mounts
  // }, []);

  if (loading) return <p>Loading room data</p>;
  if (error) return <p>{error}</p>;

  return (
    <RoomTable
      roomData={rooms}
      onRoomUpdate={updateRoomInState}
      onRoomDelete={deleteRoomInState}
      onRoomCreate={createRoomInState}
    />
  );
}

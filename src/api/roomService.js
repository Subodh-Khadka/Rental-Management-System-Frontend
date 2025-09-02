const BASE_URL = "https://localhost:7148/api/room";

// GET all rooms
export async function getRooms() {
  const response = await fetch(BASE_URL);
  if (!response.ok) throw new Error("Failed to fetch Rooms");
  return await response.json();
}

// GET a single room by Id
export async function getRoomById(roomId) {
  const response = await fetch(`${BASE_URL}/${roomId}`);
  if (!response.ok) throw new Error("Room not found");
  return await response.json();
}

// CREATE a room
export async function createRoom(roomData) {
  const response = await fetch(BASE_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(roomData),
  });

  if (!response.ok) throw new Error("Failed to create room");
  return await response.json();
}

// UPDATE a room
export async function updateRoom(roomId, roomData) {
  const response = await fetch(`${BASE_URL}/${roomId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(roomData),
  });

  if (!response.ok) throw new Error("Failed to update the room");
  return await response.json();
}

// DELETE a room
export async function deleteRoom(roomId) {
  const response = await fetch(`${BASE_URL}/${roomId}`, {
    method: "DELETE",
  });

  if (!response.ok) throw new Error("Failed to delete the room");
  return await response.json();
}

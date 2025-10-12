const BASE_URL = "https://localhost:7148/api/room";

// GET all rooms
export async function getRooms() {
  const response = await fetch(BASE_URL);
  if (!response.ok) throw new Error("Failed to fetch Rooms");

  const result = await response.json();
  if (!result.success) throw new Error("Failed to fetch room data");
  return result.data;
}

// GET a single room by Id
export async function getRoomById(roomId) {
  const response = await fetch(`${BASE_URL}/${roomId}`);
  if (!response.ok) throw new Error("Room not found");

  const result = await response.json();

  if (!result.success) throw new Error("Failed to fetch the room");
  return result.data;
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

  const result = await response.json();

  if (!result.success) throw new Error("Faile to create a room");

  return result.data;
}

// UPDATE a room
export async function updateRoom(roomId, roomData) {
  console.log(roomData);
  const response = await fetch(`${BASE_URL}/${roomId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(roomData),
  });

  if (!response.ok) throw new Error("Failed to update the room");

  const result = await response.json();

  if (!result.success) {
    throw new Error(result.message || "Failed to update the room");
  }
  return result.data;
}

// DELETE a room
export async function deleteRoom(roomId) {
  const response = await fetch(`${BASE_URL}/${roomId}`, { method: "DELETE" });

  if (!response.ok) {
    throw new Error(`Failed to delete room: ${response.statusText}`);
  }

  // If 204 No Content, just return ID
  if (response.status === 204) return roomId;

  // Try parsing JSON if body exists
  let result;
  try {
    result = await response.json();
  } catch {
    // Empty or invalid JSON, assume success
    return roomId;
  }

  if (!result.success) {
    throw new Error(result.message || "Failed to delete room");
  }

  return roomId; // return the ID to update frontend state
}

const BASE_URL = "https://localhost:7148/api/Auth";

// 🔹 Helper: Get token from localStorage
function getToken() {
  return localStorage.getItem("token");
}

// 🔹 Register user
export async function registerUser(registerData) {
  console.log(registerData);
  const response = await fetch(`${BASE_URL}/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(registerData),
  });

  const result = await response.json();

  if (!response.ok || result.success === false) {
    throw new Error(result.message || "Registration failed");
  }

  return result; // usually contains success message
}

// 🔹 Login user
export async function loginUser(loginData) {
  const response = await fetch(`${BASE_URL}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(loginData),
  });

  const result = await response.json();

  if (!response.ok || result.success === false) {
    throw new Error(result.message || "Invalid credentials");
  }

  if (result.token) {
    localStorage.setItem("token", result.token);
  }

  return result; // should contain { token, email, firstName, lastName, ... }
}

// 🔹 Get current user info (using token)
export async function getCurrentUser(token) {
  const jwt = token || getToken();
  if (!jwt) throw new Error("No token found");

  const response = await fetch(`${BASE_URL}/me`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${jwt}`,
    },
  });

  const result = await response.json();

  if (!response.ok || result.success === false) {
    throw new Error(result.message || "Failed to get user info");
  }

  return result.data; // expected: { id, email, firstName, ... }
}

// 🔹 Logout (clear token)
export function logoutUser() {
  localStorage.removeItem("token");
}

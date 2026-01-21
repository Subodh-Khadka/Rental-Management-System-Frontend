const BASE_URL = "https://localhost:7148/api/monthlyCharge";

export async function generateMonthlyCharges(payload) {
  try {
    const response = await fetch(
      "https://localhost:7148/api/monthlyCharge/generate",
      {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(payload),
      },
    );

    const result = await response.json();

    if (!response.ok || !result.success) {
      return {
        success: false,
        message: result.message || "Failed to generate monthly charges",
      };
    }

    return {
      success: true,
      message: result.message || "Monthly charges generated successfully!",
      data: result.data,
    };
  } catch (error) {
    return {
      success: false,
      message:
        error.message || "Unexpected error occurred while generating charges",
    };
  }
}

export async function getmonthlyCharges() {
  const response = await fetch(BASE_URL);

  if (!response.ok) {
    throw new Error("Failed to fetch monthly charges ");
  }

  const result = await response.json();

  if (!result.success) {
    throw new Error(result.message || "Failed to fetch charges");
  }
  return result.data;
}

export async function getMonthlyChargeById(monthlyChargeId) {
  const response = await fetch(`${BASE_URL}/${monthlyChargeId}`);

  if (!response.ok) {
    throw new Error("Failed to fetch charge");
  }

  const result = await response.json();

  if (!result.success) {
    throw new Error(result.message || "failed to get charge");
  }

  return result.data;
}

export async function createMonthlyCharge(monthlyCharge) {
  const response = await fetch(BASE_URL, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(monthlyCharge),
  });

  if (!response.ok) {
    throw new Error("failed to create  charge");
  }

  const result = await response.json();

  if (!result.success) {
    throw new Error(result.message || "failed to create rent charge");
  }

  return result.data;
}

export async function updateMonthlyCharge(monthlyChargeId, monthlyCharge) {
  let response, result;

  try {
    response = await fetch(`${BASE_URL}/${monthlyChargeId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(monthlyCharge),
    });
  } catch (err) {
    throw new Error("Network error: " + err.message);
  }

  try {
    result = await response.json();
  } catch (err) {
    throw new Error("Failed to parse server response");
  }

  // check HTTP status
  if (!response.ok) {
    throw new Error(result?.message || `Server returned ${response.status}`);
  }

  // check API-level success
  if (!result.success) {
    throw new Error(result?.message || "Failed to update charge");
  }

  return result.data;
}

export async function deleteMonthlyCharge(monthlyChargeId) {
  const response = await fetch(`${BASE_URL}/${monthlyChargeId}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("failed to delete charge");
  }

  const result = await response.json();

  if (!result.success) {
    throw new Error(result.message || "failed to delete charge");
  }
  return result.data;
}

export async function getMonthlyChargeSummary() {
  const response = await fetch(`${BASE_URL}/summary`);
  if (!response.ok) {
    throw new Error("failed to fetch summary");
  }

  const result = await response.json();

  if (!result.success) {
    throw new Error(result.message || "failed to fetch summary");
  }
  return result.data;
}

export async function getMonthlyChargesByRoomAndMonth(roomId, month) {
  try {
    const response = await fetch(
      `${BASE_URL}/by-room-month/${roomId}/${month}`,
    );

    if (!response.ok) {
      throw new Error("Failed to fetch monthly charges");
    }

    const result = await response.json();

    if (!result.success) {
      throw new Error(result.message || "Failed to fetch monthly charges");
    }

    return result.data;
  } catch (error) {
    throw new Error(error.message || "Unexpected error while fetching charges");
  }
}

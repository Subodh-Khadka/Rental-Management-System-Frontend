const BASE_URL = "https://localhost:7148/api/rentPayment";

export async function getRentPayments() {
  const response = await fetch(BASE_URL);
  //   console.log("response:", response);

  if (!response.ok) {
    throw new Error("Failed to fetch rent payments");
  }

  const result = await response.json();
  //   console.log("result:", result);

  if (!result.success) {
    throw new Error(result.message || "Failed to fetch payments result");
  }
  //   console.log("result.data:", result.data);
  return result.data;
}

export async function getRentPaymentByID(rentPaymentId) {
  const response = await fetch(`${BASE_URL}/${rentPaymentId}`);

  if (!response.ok) {
    throw new Error("Failed to fetch payments");
  }

  const result = await response.json();

  if (!result.success) {
    throw new Error(result.message || "failed to get payment result");
  }

  return result.data;
}

export async function createRentPayment(rentpayment) {
  const response = await fetch(BASE_URL, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(rentpayment),
  });

  if (!response.ok) {
    throw new Error("failed to create rent Payment");
  }

  const result = await response.json();

  if (!result.success) {
    throw new Error(result.message || "failed to create rent payment result");
  }

  return result.data;
}

export async function updateRentPayment(rentPaymentId, rentpayment) {
  const response = await fetch(`${BASE_URL}/${rentPaymentId}`, {
    method: "PUT",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(rentpayment),
  });

  if (!response.ok) {
    throw new Error("failed to update Payment result");
  }

  const result = await response.json();

  if (!result.success) {
    throw new Error(result.message || "failed to update Payment result");
  }

  return result.data;
}

export async function deleteRentPayment(rentPaymentId) {
  const response = await fetch(`${BASE_URL}/${rentPaymentId}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("failed to delete Payment");
  }

  const result = await response.json();

  if (!result.success) {
    throw new Error(result.message || "failed to delete Payment result");
  }
  return result.data;
}

export async function getRentPaymentsByMonth(month) {
  try {
    const response = await fetch(
      `https://localhost:7148/api/rentPayment/by-month/${month}`
    );

    if (!response.ok) {
      throw new Error("Failed to fetch rent payments for the month");
    }

    const result = await response.json();

    if (!result.success) {
      throw new Error(result.message || "Failed to get rent payments");
    }

    return result.data;
  } catch (error) {
    console.error("Error fetching rent payments by month:", error);
    return [];
  }
}

export async function generateRentPayment(date) {
  console.log(date);
  try {
    const response = await fetch(`${BASE_URL}/generate`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(date),
    });
    const result = await response.json();

    if (!response.ok || !result.success) {
      return {
        success: false,
        message: result.message || "Failed to generate payments",
      };
    }

    return {
      success: true,
      message: result.message || "Payments generated successfully",
    };
  } catch (error) {
    return {
      success: false,
      message: error.message || "error occurred",
    };
  }
}

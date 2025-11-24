const API_URL = "https://localhost:7148/api/MeterReading";

// Get meter reading by PaymentId + Month
export async function getMeterReadingByPaymentAndMonth(paymentId, month) {
  try {
    const res = await fetch(`${API_URL}/payment/${paymentId}/month/${month}`);
    if (!res.ok) {
      console.error("API returned:", res.status, res.statusText);
      return null;
    }
    return await res.json();
  } catch (error) {
    console.error("Error fetching meter reading:", error);
    return null;
  }
}

// Create new meter reading
export async function createMeterReading(meterReading) {
  const response = await fetch(`https://localhost:7148/api/MeterReading`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(meterReading),
  });

  if (!response.ok) throw new Error("Failed to create meter reading");

  return await response.json();
}

export async function updateMeterReading(meterReading) {
  const response = await fetch(
    `https://localhost:7148/api/MeterReading/${meterReading.MeterReadingId}`,
    {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(meterReading),
    }
  );

  if (!response.ok) throw new Error("Failed to update meter reading");

  return await response.json();
}

const BASE_URL = "https://localhost:7148/api/RentalContract";

export async function getRentalContracts() {
  const response = await fetch(BASE_URL);
  //   console.log("response:", response);

  if (!response.ok) {
    throw new Error("Failed to fetch students");
  }

  const result = await response.json();
  //   console.log("result:", result);

  if (!result.success) {
    throw new Error(result.message || "Failed to fetch students");
  }
  //   console.log("result.data:", result.data);
  return result.data;
}

export async function getRentalContractById(rentalContractId) {
  const response = await fetch(`${BASE_URL}/${rentalContractId}`);

  if (!response.ok) {
    throw new Error("Failed to fetch contract");
  }

  const result = await response.json();

  if (!result.success) {
    throw new Error(result.message || "failed to fetch contract");
  }

  return result.data;
}

export async function createRentalContract(rentalContract) {
  const response = await fetch(BASE_URL, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(rentalContract),
  });

  if (!response.ok) {
    throw new Error("failed to create contract");
  }

  const result = await response.json();

  if (!result.success) {
    throw new Error(result.message || "failed to create contract");
  }

  return result.data;
}

export async function updateRentalContract(rentalContractId, rentalContract) {
  const response = await fetch(`${BASE_URL}/${rentalContractId}`, {
    method: "PUT",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(rentalContract),
  });

  if (!response.ok) {
    throw new Error("failed to update contract");
  }

  const result = await response.json();

  if (!result.success) {
    throw new Error(result.message || "failed to update contract");
  }

  return result.data;
}

export async function deleteRentalContract(rentalContractId) {
  console.log("id", rentalContractId);
  const response = await fetch(`${BASE_URL}/${rentalContractId}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("failed to delete students");
  }

  const result = await response.json();

  if (!result.success) {
    throw new Error(result.message || "failed to delte contract");
  }
  return result.data;
}

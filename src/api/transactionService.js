const BASE_URL = "https://localhost:7148/api/paymenttransaction";
const RENTPAYMENT_URL = "https://localhost:7148/api/rentpayment";

// GET all transactions
export async function getTransactions() {
  const response = await fetch(BASE_URL);
  if (!response.ok) throw new Error("Failed to fetch transactions");

  const result = await response.json();
  if (!result.success) throw new Error("Failed to fetch transaction data");
  return result.data;
}

// GET a single transaction by Id
export async function getTransactionById(transactionId) {
  const response = await fetch(`${BASE_URL}/${transactionId}`);
  if (!response.ok) throw new Error("Transaction not found");

  const result = await response.json();
  if (!result.success) throw new Error("Failed to fetch the transaction");
  return result.data;
}

// CREATE a transaction
export async function createTransaction(transactionData) {
  const response = await fetch(BASE_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(transactionData),
  });

  if (!response.ok) throw new Error("Failed to create transaction");

  const result = await response.json();
  if (!result.success)
    throw new Error(result.message || "Failed to create transaction");
  return result.data;
}

// UPDATE a transaction
export async function updateTransaction(transactionId, transactionData) {
  const response = await fetch(`${BASE_URL}/${transactionId}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(transactionData),
  });

  if (!response.ok) throw new Error("Failed to update the transaction");

  const result = await response.json();
  if (!result.success)
    throw new Error(result.message || "Failed to update the transaction");
  return result.data;
}

// DELETE a transaction
export async function deleteTransaction(transactionId) {
  const response = await fetch(`${BASE_URL}/${transactionId}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error(`Failed to delete transaction: ${response.statusText}`);
  }

  if (response.status === 204) return transactionId;

  let result;
  try {
    result = await response.json();
  } catch {
    return transactionId;
  }

  if (!result.success) {
    throw new Error(result.message || "Failed to delete transaction");
  }

  return transactionId;
}

// GET rent payments
export async function getRentPayments() {
  const response = await fetch(RENTPAYMENT_URL);
  if (!response.ok) throw new Error("Failed to fetch rent payments");

  const result = await response.json();
  if (!result.success) throw new Error("Failed to fetch rent payment data");
  return result.data;
}

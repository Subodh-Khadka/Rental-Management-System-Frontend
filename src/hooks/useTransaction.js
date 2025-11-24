import { useState, useEffect } from "react";
import { getTransactions } from "../api/transactionService";

export default function useTransactions() {
  const [transactions, setTransactions] = useState([]);
  const [loading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Load all transactions from API
  const loadTransactions = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await getTransactions();
      setTransactions(data);
    } catch (err) {
      setError(err.message || "Failed to load transactions...");
    } finally {
      setIsLoading(false);
    }
  };

  // Create a transaction in state
  const createTransactionInState = async (newTransaction) => {
    setTransactions((prev) => [newTransaction, ...prev]);
  };

  // Update a transaction in state
  const updateTransactionInState = async (updatedTransaction) => {
    setTransactions((prev) =>
      prev.map((t) =>
        t.transactionId === updatedTransaction.transactionId
          ? updatedTransaction
          : t
      )
    );
  };

  // Delete a transaction from state
  const deleteTransactionInState = async (deletedId) => {
    setTransactions((prev) =>
      prev.filter((t) => t.transactionId !== deletedId)
    );
  };

  useEffect(() => {
    loadTransactions();
  }, []);

  return {
    transactions,
    loading,
    error,
    setTransactions,
    loadTransactions,
    updateTransactionInState,
    deleteTransactionInState,
    createTransactionInState,
  };
}

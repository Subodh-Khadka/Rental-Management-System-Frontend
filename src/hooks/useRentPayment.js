import { useState, useEffect } from "react";
import { getRentPayments } from "../api/rentPayment";

export default function useRentPayments() {
  const [rentPayments, setRentPayments] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const loadRentPayments = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await getRentPayments();
      setRentPayments(data);
    } catch (err) {
      setError(err.message || "Failed to load payments");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadRentPayments();
  }, []);

  //create payment in state
  const createRentPaymentInState = async (newRentPayment) => {
    setRentPayments((prevRentPayment) => [newRentPayment, ...prevRentPayment]);
  };

  // update payment in the state
  const updateRentPaymentInState = async (updatedRentPayment) => {
    setRentPayments((prevRentPayments) =>
      prevRentPayments.map((rentPayment) =>
        rentPayment.paymentId === updatedRentPayment.paymentId
          ? updatedRentPayment
          : rentPayment
      )
    );
  };

  //delete payment In State
  const deleteRentPaymentInState = async (paymentId) => {
    setRentPayments((prevRentPayments) =>
      prevRentPayments.filter(
        (rentPayment) => rentPayment.paymentId !== paymentId
      )
    );
  };

  return {
    rentPayments,
    error,
    isLoading,
    loadRentPayments,
    updateRentPaymentInState,
    createRentPaymentInState,
    deleteRentPaymentInState,
  };
}

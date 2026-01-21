import { useState, useEffect, useCallback } from "react";
import { getRentPayments, getRentPaymentsByMonth } from "../api/rentPayment"; // add new API

export default function useRentPayments() {
  const [rentPayments, setRentPayments] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Load all payments
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

  const loadRentPaymentsByMonth = useCallback(async (month) => {
    if (!month) return;

    setIsLoading(true);
    setError(null);
    try {
      const response = await getRentPaymentsByMonth(month); // call backend API
      setRentPayments(response);
    } catch (err) {
      setError(err.message || "Failed to load payments");
    } finally {
      setIsLoading(false);
    }
  }, []); // memoized once

  useEffect(() => {
    loadRentPayments();
  }, []);

  // Create payment in state
  const createRentPaymentInState = (newRentPayment) => {
    setRentPayments((prevRentPayment) => [newRentPayment, ...prevRentPayment]);
  };

  // Update payment in state
  const updateRentPaymentInState = (updatedRentPayment) => {
    setRentPayments((prevRentPayments) =>
      prevRentPayments.map((rentPayment) =>
        rentPayment.paymentId === updatedRentPayment.paymentId
          ? updatedRentPayment
          : rentPayment,
      ),
    );
  };

  // Delete payment in state
  const deleteRentPaymentInState = (paymentId) => {
    setRentPayments((prevRentPayments) =>
      prevRentPayments.filter(
        (rentPayment) => rentPayment.paymentId !== paymentId,
      ),
    );
  };

  return {
    rentPayments,
    error,
    isLoading,
    loadRentPayments,
    loadRentPaymentsByMonth, // new method exposed
    updateRentPaymentInState,
    createRentPaymentInState,
    deleteRentPaymentInState,
    setRentPayments, // optional if needed
  };
}

// import { useState, useEffect } from "react";
// import { getRentPayments } from "../api/rentPayment";

// export default function useRentPayments() {
//   const [rentPayments, setRentPayments] = useState([]);
//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState(null);

//   const loadRentPayments = async () => {
//     setIsLoading(true);
//     setError(null);
//     try {
//       const data = await getRentPayments();
//       setRentPayments(data);
//     } catch (err) {
//       setError(err.message || "Failed to load payments");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   useEffect(() => {
//     loadRentPayments();
//   }, []);

//   //create payment in state
//   const createRentPaymentInState = async (newRentPayment) => {
//     setRentPayments((prevRentPayment) => [newRentPayment, ...prevRentPayment]);
//   };

//   // update payment in the state
//   const updateRentPaymentInState = async (updatedRentPayment) => {
//     setRentPayments((prevRentPayments) =>
//       prevRentPayments.map((rentPayment) =>
//         rentPayment.paymentId === updatedRentPayment.paymentId
//           ? updatedRentPayment
//           : rentPayment
//       )
//     );
//   };

//   //delete payment In State
//   const deleteRentPaymentInState = async (paymentId) => {
//     setRentPayments((prevRentPayments) =>
//       prevRentPayments.filter(
//         (rentPayment) => rentPayment.paymentId !== paymentId
//       )
//     );
//   };

//   return {
//     rentPayments,
//     error,
//     isLoading,
//     loadRentPayments,
//     updateRentPaymentInState,
//     createRentPaymentInState,
//     deleteRentPaymentInState,
//   };
// }

import { useState, useEffect } from "react";
import {
  getmonthlyCharges,
  getMonthlyChargeSummary,
  getMonthlyChargesByRoomAndMonth, // new API call
} from "../api/monthlyCharge";

export default function useMonthlyCharge() {
  const [monthlyCharges, setMonthlyCharges] = useState([]);
  const [monthlyChargesSummary, setMonthlyChargeSummary] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Load all charges
  const loadMonthlyCharges = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await getmonthlyCharges();
      setMonthlyCharges(data);
    } catch (err) {
      setError(err.message || "Failed to load charges");
    } finally {
      setIsLoading(false);
    }
  };

  // Load summary
  const loadMonthlyChargesSummary = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await getMonthlyChargeSummary();
      setMonthlyChargeSummary(data);
    } catch (err) {
      setError(err.message || "Failed to load summary");
    } finally {
      setIsLoading(false);
    }
  };

  // Load charges by room + month
  const loadMonthlyChargesByRoomAndMonth = async (roomId, month) => {
    if (!roomId || !month) return;

    setIsLoading(true);
    setError(null);

    try {
      const data = await getMonthlyChargesByRoomAndMonth(roomId, month);
      setMonthlyCharges(data);
    } catch (err) {
      setError(err.message || "Failed to load filtered charges");
    } finally {
      setIsLoading(false);
    }
  };

  //create charge in state
  const createMonthlyChargeInState = async (newMonthlyCharge) => {
    setMonthlyCharges((prevMonthlyCharges) => [
      newMonthlyCharge,
      ...prevMonthlyCharges,
    ]);
  };

  // // update charge in the state
  // const updateMonthlyChargeInState = async (updatedMonthlyCharge) => {
  //   setMonthlyCharges((prevMonthlyCharges) =>
  //     prevMonthlyCharges.map((charge) =>
  //       charge.monthlyChargeId === updatedMonthlyCharge.monthlyChargeId
  //         ? updatedMonthlyCharge
  //         : charge,
  //     ),
  //   );
  // };
  const updateMonthlyChargeInState = (updatedMonthlyCharge) => {
    setMonthlyCharges((prevMonthlyCharges) =>
      prevMonthlyCharges.map((charge) =>
        charge.monthlyChargeId === updatedMonthlyCharge.monthlyChargeId
          ? {
              ...charge,
              ...updatedMonthlyCharge, // merge the updated fields
              amount: parseFloat(updatedMonthlyCharge.amount),
              units:
                updatedMonthlyCharge.units !== null
                  ? parseFloat(updatedMonthlyCharge.units)
                  : null,
            }
          : charge,
      ),
    );
  };

  //delete charge In State
  const deleteMonthlyChargeInState = async (monthlyChargeId) => {
    setMonthlyCharges((prevMonthlyCharges) =>
      prevMonthlyCharges.filter(
        (charge) => charge.monthlyChargeId !== monthlyChargeId,
      ),
    );
  };

  useEffect(() => {
    loadMonthlyCharges();
    loadMonthlyChargesSummary();
  }, []);

  return {
    monthlyCharges,
    monthlyChargesSummary,
    error,
    isLoading,
    loadMonthlyCharges,
    loadMonthlyChargesSummary,
    loadMonthlyChargesByRoomAndMonth, // expose filtering function
    updateMonthlyChargeInState,
    createMonthlyChargeInState,
    deleteMonthlyChargeInState,
  };
}

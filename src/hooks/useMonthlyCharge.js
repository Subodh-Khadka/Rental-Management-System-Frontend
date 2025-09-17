import { useState, useEffect } from "react";
import {
  getmonthlyCharges,
  getMonthlyChargeSummary,
} from "../api/monthlyCharge";

export default function useChargeTemplate() {
  const [monthlyCharges, setMonthlyCharges] = useState([]);
  const [monthlyChargesSummary, setMonthlyChargeSummary] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

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

  useEffect(() => {
    loadMonthlyCharges();
    loadMonthlyChargesSummary();
  }, []);

  //create payment in state
  const createMonthlyChargeInState = async (newMonthlyCharge) => {
    setMonthlyCharges((prevMonthlyCharges) => [
      newMonthlyCharge,
      ...prevMonthlyCharges,
    ]);
  };

  // update payment in the state
  const updateMonthlyChargeInState = async (updatedMonthlyCharge) => {
    setMonthlyCharges((prevMonthlyCharges) =>
      prevMonthlyCharges.map((charge) =>
        charge.monthlyChargeId === updatedMonthlyCharge.monthlyChargeId
          ? updatedMonthlyCharge
          : charge
      )
    );
  };

  //delete payment In State
  const deleteMonthlyChargeInState = async (monthlyChargeId) => {
    setMonthlyCharges((prevMonthlyCharges) =>
      prevMonthlyCharges.filter(
        (charge) => charge.monthlyChargeId !== monthlyChargeId
      )
    );
  };

  return {
    monthlyCharges,
    error,
    isLoading,
    loadMonthlyCharges,
    updateMonthlyChargeInState,
    createMonthlyChargeInState,
    deleteMonthlyChargeInState,
    monthlyChargesSummary,
  };
}

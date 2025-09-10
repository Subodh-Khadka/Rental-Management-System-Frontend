import { useState, useEffect } from "react";
import { getRentalContracts } from "../api/rentalContract";

export default function useRentalContracts() {
  const [rentalContracts, setRentalContracts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const loadRentalContracts = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await getRentalContracts();
      setRentalContracts(data);
    } catch (err) {
      setError(err.message || "Failed to load contracts");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadRentalContracts();
  }, []);

  //create tenant in state
  const createRentalContractInState = async (newRentalContract) => {
    setRentalContracts((prevRentalContract) => [
      newRentalContract,
      ...prevRentalContract,
    ]);
  };

  // update tenant in the state
  const updateRentalContractInState = async (updatedRentalContract) => {
    setRentalContracts((prevRentalContracts) =>
      prevRentalContracts.map((rentalContract) =>
        rentalContract.rentalContractId ===
        updatedRentalContract.rentalContractId
          ? updatedRentalContract
          : rentalContract
      )
    );
  };

  //delete Tenant In State
  const deleteRentalContractInState = async (rentalContractId) => {
    console.log("dfsdf", rentalContractId);
    setRentalContracts((preRentalContracts) =>
      preRentalContracts.filter(
        (rentalContract) => rentalContract.rentalContractId !== rentalContractId
      )
    );
  };

  return {
    rentalContracts,
    error,
    isLoading,
    loadRentalContracts,
    updateRentalContractInState,
    createRentalContractInState,
    deleteRentalContractInState,
  };
}

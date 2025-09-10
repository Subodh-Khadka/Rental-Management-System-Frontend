import useRentalContracts from "../hooks/useRentalContract";
import RentalContractTable from "../Components/rentalContracts/RentalContractTable";
import useRooms from "../hooks/UseRooms";
import useTenants from "../hooks/useTenants";

export default function rentalContractPage() {
  const {
    rentalContracts,
    createRentalContractInState,
    updateRentalContractInState,
    deleteRentalContractInState,
    error,
    isLoading,
  } = useRentalContracts();

  const { rooms } = useRooms();
  const { tenants } = useTenants();

  if (isLoading) return <h1>Loading data...</h1>;
  if (error) return <h1>{error}</h1>;

  return (
    <>
      <RentalContractTable
        error={error}
        rooms={rooms}
        tenants={tenants}
        rentalContractsData={rentalContracts}
        onRentalContractCreate={createRentalContractInState}
        onRentalContractDelete={deleteRentalContractInState}
        onRentalContractUpdate={updateRentalContractInState}
      />
    </>
  );
}

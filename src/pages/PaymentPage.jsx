import RentPaymentTable from "../Components/Rentpayments/RentPaymentTable";
import useRentPayments from "../hooks/useRentPayment";
import useRentalContracts from "../hooks/useRentalContract";

export default function PaymentPage() {
  const {
    rentPayments,
    createRentPaymentInState,
    updateRentPaymentInState,
    deleteRentPaymentInState,
    error,
    isLoading,
  } = useRentPayments();

  const { rentalContracts } = useRentalContracts();

  if (isLoading) return <h1>Loading data...</h1>;
  if (error) return <h1>{error}</h1>;

  return (
    <>
      <RentPaymentTable
        error={error}
        rentPaymentsData={rentPayments}
        onRentPaymentCreate={createRentPaymentInState}
        onRentPaymentUpdate={updateRentPaymentInState}
        onRentPaymentDelete={deleteRentPaymentInState}
        rentalContracts={rentalContracts}
      />
    </>
  );
}

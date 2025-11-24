import TransactionTable from "../Components/Transaction/TransactionTable";
import useTransactions from "../hooks/useTransaction";

export default function TransactionPage() {
  const {
    transactions,
    updateTransactionInState,
    deleteTransactionInState,
    createTransactionInState,
    loading,
    error,
  } = useTransactions();

  if (loading) return <p>Loading transactions...</p>;
  if (error) return <p>{error}</p>;

  return (
    <TransactionTable
      transactionData={transactions}
      onTransactionUpdate={updateTransactionInState}
      onTransactionDelete={deleteTransactionInState}
      onTransactionCreate={createTransactionInState}
    />
  );
}

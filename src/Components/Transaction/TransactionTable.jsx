import { useState } from "react";
import TableHeaderCell from "../Shared/Table/TableHeaderCell";
import TransactionItem from "./TransactionItem";
import TransactionForm from "./TransactionForm";
import Button from "../Shared/Table/Button/Button";
import { IoAddOutline } from "react-icons/io5";
import { useNotification } from "../../context/NotificationContext";
import {
  updateTransaction,
  createTransaction,
  deleteTransaction,
} from "../../api/transactionService";

export default function TransactionTable({
  transactionData,
  onTransactionUpdate,
  onTransactionDelete,
  onTransactionCreate,
}) {
  const { addNotification } = useNotification();
  const [editingTransaction, setEditingTransaction] = useState(null);
  const [creating, setCreating] = useState(false);

  async function handleSave(transactionDataArg) {
    try {
      if (transactionDataArg.transactionId) {
        const saved = await updateTransaction(
          transactionDataArg.transactionId,
          transactionDataArg
        );
        onTransactionUpdate(saved);
        setEditingTransaction(null);
      } else {
        const created = await createTransaction(transactionDataArg);
        onTransactionCreate(created);
        setCreating(false);
      }
    } catch (err) {
      console.error("Error saving transaction", err);
      addNotification("error", "Failed to save transaction");
    }
  }

  async function handleDelete(transaction) {
    try {
      const deletedId = await deleteTransaction(transaction.transactionId);
      onTransactionDelete(deletedId);
      addNotification("success", "Transaction deleted successfully");
    } catch (err) {
      console.error("Error deleting transaction", err);
      addNotification("error", "Failed to delete transaction");
    }
  }

  return (
    <>
      {creating && (
        <section>
          <TransactionForm
            onSave={handleSave}
            onCancel={() => setCreating(false)}
          />
        </section>
      )}

      {editingTransaction && (
        <section>
          <TransactionForm
            transaction={editingTransaction}
            onCancel={() => setEditingTransaction(null)}
            onSave={handleSave}
          />
        </section>
      )}

      <section className="bg-white p-4 rounded-2xl shadow-lg">
        <h1 className="text-lg text-center font-bold mb-3">
          Payment Transactions
        </h1>

        <div>
          <Button
            size="md"
            variant="primary"
            className="mb-2 flex items-center gap-2"
            onClick={() => setCreating(true)}
          >
            <IoAddOutline />
            Create Transaction
          </Button>

          <table className="w-full text-left table-auto table-bordered text-sm-center">
            <thead>
              <tr>
                <TableHeaderCell>S.N</TableHeaderCell>
                <TableHeaderCell>Transaction Id</TableHeaderCell>
                <TableHeaderCell>Rent Payment Id</TableHeaderCell>
                <TableHeaderCell>Payment Date</TableHeaderCell>
                <TableHeaderCell>Amount Paid</TableHeaderCell>
                <TableHeaderCell>Actions</TableHeaderCell>
              </tr>
            </thead>

            <tbody>
              {transactionData.map((tx, index) => (
                <TransactionItem
                  key={tx.transactionId}
                  transaction={tx}
                  index={index}
                  onEdit={() => setEditingTransaction(tx)}
                  onDelete={() => handleDelete(tx)}
                />
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
}

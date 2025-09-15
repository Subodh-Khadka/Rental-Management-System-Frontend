import { useState } from "react";
import TableItem from "../Rooms/TableItem";
import TableHeaderCell from "../Shared/Table/TableHeaderCell";
import RentPaymentItem from "./RentPaymentItem";
import {
  createRentPayment,
  updateRentPayment,
  deleteRentPayment,
} from "../../api/rentPayment";
import Button from "../Shared/Table/Button/Button";

import { IoAddOutline } from "react-icons/io5";
import RentPaymentForm from "./RentPaymentForm";

export default function RentPaymentTable({
  rentPaymentsData,
  onRentPaymentCreate,
  onRentPaymentUpdate,
  onRentPaymentDelete,
  error,
  rentalContracts,
}) {
  const [editingRentPayment, setEditingRentPayment] = useState(null);
  const [creatingRentPayment, setCreatingRentPayment] = useState(false);

  function handleEdit(rentPayment) {
    setEditingRentPayment(rentPayment);
    setCreatingRentPayment(false);
  }

  async function handleSave(rentPayment) {
    try {
      if (editingRentPayment) {
        const updatedRentPayment = await updateRentPayment(
          rentPayment.paymentId,
          rentPayment
        );
        onRentPaymentUpdate(updatedRentPayment);
        setEditingRentPayment(null);
      } else {
        const newRentPayment = await createRentPayment(rentPayment);
        onRentPaymentCreate(newRentPayment);
        setCreatingRentPayment(false);
      }
    } catch (err) {
      console.log("Error saving payment", err);
      alert("Failed To save contract changes");
    }
  }

  async function handleDelete(paymentId) {
    try {
      await deleteRentPayment(paymentId);
      onRentPaymentDelete(paymentId);
    } catch (err) {
      console.log(err, "Error deleting payment");
    }
  }

  return (
    <>
      {(editingRentPayment || creatingRentPayment) && (
        <section>
          <RentPaymentForm
            rentPayment={editingRentPayment || ""}
            onSave={handleSave}
            onCancel={() => {
              setCreatingRentPayment(false);
              setEditingRentPayment(null);
            }}
            rentalContracts={rentalContracts}
          />
        </section>
      )}

      <section className="bg-white p-4 rounded-2xl shadow-lg">
        <h1 className="text-lg text-center font-bold mb-3">
          Rent Payment Details
        </h1>

        {error && <h1>{error}</h1>}

        {!creatingRentPayment && !editingRentPayment && (
          <section>
            <Button
              variant="primary"
              size="md"
              className="flex items-center gap-2 mb-2"
              onClick={() => {
                setCreatingRentPayment(true);
                setEditingRentPayment(null);
              }}
            >
              <IoAddOutline /> Create New Payment
            </Button>
          </section>
        )}
        <div>
          <table className="w-full text-left table-auto table-bordered text-sm-center">
            <thead>
              <tr>
                <TableHeaderCell>S.N</TableHeaderCell>
                <TableHeaderCell>Room Title</TableHeaderCell>
                <TableHeaderCell>Room price</TableHeaderCell>
                <TableHeaderCell>Tenant</TableHeaderCell>
                <TableHeaderCell>Date</TableHeaderCell>
                <TableHeaderCell>Total</TableHeaderCell>
                <TableHeaderCell>Paid</TableHeaderCell>
                <TableHeaderCell>Due</TableHeaderCell>
                <TableHeaderCell>Actions</TableHeaderCell>
              </tr>
            </thead>
            <tbody>
              {rentPaymentsData.map((rentPayment, index) => {
                return (
                  <RentPaymentItem
                    key={rentPayment.paymentId}
                    rentPayment={rentPayment}
                    index={index}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                  />
                );
              })}
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
}

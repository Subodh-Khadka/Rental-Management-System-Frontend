import { useState } from "react";
import TableItem from "../Rooms/TableItem";
import TableHeaderCell from "../Shared/Table/TableHeaderCell";
import RentalContractItem from "./RentalContractItem";
import {
  createRentalContract,
  updateRentalContract,
  deleteRentalContract,
} from "../../api/rentalContract";
import Button from "../Shared/Table/Button/Button";

import { IoAddOutline } from "react-icons/io5";
import RentalContractForm from "./rentalContractForm";

export default function RentalContractTable({
  rentalContractsData,
  rooms,
  tenants,
  onRentalContractUpdate,
  onRentalContractCreate,
  onRentalContractDelete,
  error,
}) {
  const [editingRentalContract, setEditingRentalContract] = useState(null);
  const [creatingRentalContract, setCreatingRentalContract] = useState(false);

  function handleEdit(rentalContract) {
    setEditingRentalContract(rentalContract);
    setCreatingRentalContract(false);
  }

  async function handleSave(rentalContract) {
    console.log(rentalContract);
    try {
      if (editingRentalContract) {
        const updatedRentalContract = await updateRentalContract(
          rentalContract.rentalContractId,
          rentalContract
        );
        onRentalContractUpdate(updatedRentalContract);
        setEditingRentalContract(null);
      } else {
        const newRentalContract = await createRentalContract(rentalContract);
        onRentalContractCreate(newRentalContract);
        setCreatingRentalContract(false);
      }
    } catch (err) {
      console.log("Error saving contract", err);
      alert("Failed To save contract changes");
    }
  }

  async function handleDelete(rentalContractId) {
    try {
      await deleteRentalContract(rentalContractId); // we don’t need response
      onRentalContractDelete(rentalContractId); // pass ID directly
    } catch (err) {
      console.log(err, "Error deleting contract");
    }
  }

  return (
    <>
      {(editingRentalContract || creatingRentalContract) && (
        <section>
          <RentalContractForm
            rentalContract={editingRentalContract || ""}
            rooms={rooms}
            tenants={tenants}
            onSave={handleSave}
            onCancel={() => {
              setCreatingRentalContract(false);
              setEditingRentalContract(null);
            }}
          />
        </section>
      )}

      <section className="bg-white p-4 rounded-2xl shadow-lg">
        <h1 className="text-lg text-center font-bold mb-3">
          Rental Contract Details
        </h1>

        {error && <h1>{error}</h1>}

        {!creatingRentalContract && !editingRentalContract && (
          <section>
            <Button
              variant="primary"
              size="md"
              className="flex items-center gap-2 mb-2"
              onClick={() => {
                setCreatingRentalContract(true);
                setEditingRentalContract(null);
              }}
            >
              <IoAddOutline /> Create Rental Contract
            </Button>
          </section>
        )}
        <div>
          <table className="w-full text-left table-auto table-bordered text-sm-center">
            <thead>
              <tr>
                <TableHeaderCell>S.N</TableHeaderCell>
                <TableHeaderCell>Tenant ID/Name</TableHeaderCell>
                <TableHeaderCell>Room Title/id</TableHeaderCell>
                <TableHeaderCell>Start Date</TableHeaderCell>
                <TableHeaderCell>End Date</TableHeaderCell>
                <TableHeaderCell>Terms</TableHeaderCell>
                <TableHeaderCell>Actions</TableHeaderCell>
              </tr>
            </thead>
            <tbody>
              {rentalContractsData.map((rentalContract, index) => {
                const assignedTenant = (tenants || []).find(
                  (t) => t.tenantId === rentalContract.tenantId
                );

                const assignedRoom = (rooms || []).find(
                  (r) => r.roomId === rentalContract.roomId
                );

                return (
                  <RentalContractItem
                    key={rentalContract.rentalContractId}
                    rentalContract={rentalContract}
                    index={index}
                    assignedRoom={assignedRoom}
                    assignedTenant={assignedTenant}
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

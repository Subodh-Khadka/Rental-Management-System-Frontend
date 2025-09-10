import { useState } from "react";
import TableItem from "../Rooms/TableItem";
import TableHeaderCell from "../Shared/Table/TableHeaderCell";
import TenantItem from "./TenantItem";
import TenantForm from "./TenantForm";
import {
  updateTenant,
  createTenant,
  deleteTenant,
} from "../../api/tenantsService";
import Button from "../Shared/Table/Button/Button";

import { IoAddOutline } from "react-icons/io5";

export default function TenantsTable({
  tenantsData,
  rooms,
  onTenantUpdate,
  onTenantCreate,
  onTenantDelete,
  error,
}) {
  const [editingTenant, setEditingTenant] = useState(null);
  const [creatingTenant, setCreatingTenant] = useState(false);

  function handleEdit(tenant) {
    setEditingTenant(tenant);
    setCreatingTenant(false);
  }

  async function handleSave(tenant) {
    try {
      if (editingTenant) {
        const updatedTenant = await updateTenant(tenant.tenantId, tenant);
        onTenantUpdate(updatedTenant);
        setEditingTenant(null);
      } else {
        const newTenant = await createTenant(tenant);
        onTenantCreate(newTenant);
        setCreatingTenant(false);
      }
    } catch (err) {
      console.log("Error saving tenant", err);
      alert("Failed To save changes");
    }
  }

  async function handleDelete(tenantId) {
    try {
      const deletedTenant = await deleteTenant(tenantId);
      onTenantDelete(tenantId);
    } catch (err) {
      console.log(err, "Error saving changes");
    }
  }

  return (
    <>
      {(editingTenant || creatingTenant) && (
        <section>
          <TenantForm
            tenant={editingTenant || ""}
            rooms={rooms}
            onSave={handleSave}
            onCancel={() => {
              setCreatingTenant(false);
              setEditingTenant(null);
            }}
          />
        </section>
      )}

      <section className="bg-white p-4 rounded-2xl shadow-lg">
        <h1 className="text-lg text-center font-bold mb-3">Tenants Details</h1>

        {error && <h1>{error}</h1>}

        {!creatingTenant && !editingTenant && (
          <section>
            <Button
              variant="primary"
              size="md"
              className="flex items-center gap-2 mb-2"
              onClick={() => {
                setCreatingTenant(true);
                setEditingTenant(null);
              }}
            >
              <IoAddOutline /> Create Tenant
            </Button>
          </section>
        )}
        <div>
          <table className="w-full text-left table-auto table-bordered text-sm-center">
            <thead>
              <tr>
                <TableHeaderCell>S.N</TableHeaderCell>
                <TableHeaderCell>Name</TableHeaderCell>
                <TableHeaderCell>Phone Number</TableHeaderCell>
                <TableHeaderCell>Email Address</TableHeaderCell>
                <TableHeaderCell>Room Assigned</TableHeaderCell>
                <TableHeaderCell>Actions</TableHeaderCell>
              </tr>
            </thead>
            <tbody>
              {tenantsData.map((tenant, index) => {
                const assignedRoom = (rooms || []).find(
                  (r) => r.roomId === tenant.roomId
                );
                return (
                  <TenantItem
                    key={tenant.tenantId}
                    tenant={tenant}
                    index={index}
                    assignedRoom={assignedRoom}
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

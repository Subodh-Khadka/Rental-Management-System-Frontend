import { useState } from "react";
import Button from "../Shared/Table/Button/Button";
import { MdOutlineCancel } from "react-icons/md";
import { GrSave } from "react-icons/gr";
import { FaUser } from "react-icons/fa";
import { formatDateTimeLocal, ConvertToIsoString } from "../../utils/dateUtils";

export default function RentalContractForm({
  rentalContract,
  onSave,
  onCancel,
  rooms,
  tenants,
}) {
  const [tenant, setTenant] = useState(rentalContract?.tenantId || "");
  const [room, setRoom] = useState(rentalContract?.roomId || "");
  const [terms, setTerms] = useState(rentalContract?.terms || "");
  const [startDate, setStartDate] = useState(
    rentalContract?.startDate
      ? formatDateTimeLocal(rentalContract.startDate)
      : ""
  );
  const [endDate, setEndDate] = useState(
    rentalContract?.endDate ? formatDateTimeLocal(rentalContract.endDate) : ""
  );

  // find the tenant object
  // const tenantName = tenants.find((t) => t.tenantId === tenant)?.name || "";

  function handleTenantChange(e) {
    setTenant(e.target.value);
  }
  function handleStartDateChange(e) {
    setStartDate(e.target.value);
  }
  function handleEndDateChange(e) {
    setEndDate(e.target.value);
  }
  function handleRoomChange(e) {
    setRoom(e.target.value);
  }
  function handleTermsChange(e) {
    setTerms(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();

    const updatedRentalContract = {
      ...rentalContract,
      tenantId: tenant,
      roomId: room,
      startDate: ConvertToIsoString(startDate),
      endDate: ConvertToIsoString(endDate),
      terms,
    };

    const rentalContractToCreate = {
      tenantId: tenant,
      roomId: room,
      startDate: startDate,
      endDate: endDate,
      terms,
    };

    onSave(rentalContract ? updatedRentalContract : rentalContractToCreate);
  }

  console.log("RentalContractForm props:", {
    rentalContract,
    tenants,
    rooms,
  });

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-3 w-100 bg-white p-3 rounded-xl mb-2"
      >
        <div className="flex items-center gap-2 mb-1">
          <h5 className="font-bold">
            {rentalContract ? "Edit Contract Details" : "Create New Contract "}
          </h5>

          {/* Example: Add an icon */}
          <FaUser className="text-gray-600" />
        </div>

        <div className="form-div flex flex-col gap-2">
          <label htmlFor="tenantName" className=" font-bold">
            Tenant Name
          </label>
          <select
            value={tenant}
            onChange={handleTenantChange}
            required
            disabled={rentalContract}
            className="bg-stone-100 shadow-sm p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-200"
          >
            <option value="" disabled>
              ---select a Tenant---
            </option>
            {tenants.map((t) => (
              <option key={t.tenantId} value={t.tenantId}>
                {t.name}
              </option>
            ))}
          </select>
        </div>

        <div className="form-div flex flex-col gap-2">
          <label htmlFor="roomTitle" className=" font-bold">
            Room Title
          </label>
          <select
            value={room}
            onChange={handleRoomChange}
            required
            disabled={rentalContract}
            className="bg-stone-100 shadow-sm p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-200"
          >
            <option value="" disabled>
              ---Select a Room---
            </option>
            {rooms.map((r) => (
              <option key={r.roomId} value={r.roomId}>
                {r.roomTitle}
              </option>
            ))}
          </select>
        </div>

        <div className="form-div flex flex-col gap-2">
          <label htmlFor="startDate" className=" font-bold">
            Start Date
          </label>
          <input
            type="datetime-local"
            value={startDate}
            placeholder="name"
            className="bg-stone-100 shadow-sm p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-200"
            required
            onChange={handleStartDateChange}
          />
        </div>

        <div className="form-div flex flex-col gap-2">
          <label htmlFor="endDate" className=" font-bold">
            End Date
          </label>
          <input
            type="datetime-local"
            value={endDate}
            placeholder="end date"
            className="bg-stone-100 shadow-sm p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-200"
            required
            onChange={handleEndDateChange}
          />
        </div>

        <div className="form-div flex flex-col gap-2">
          <label htmlFor="terms" className=" font-bold">
            Contract Terms
          </label>
          <textarea
            value={terms}
            placeholder="contract terms"
            className="bg-stone-100 shadow-sm p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-200"
            required
            onChange={handleTermsChange}
          />
        </div>

        {/* {!tenant && (
          <div className="form-div flex flex-col gap-2">
            <label className="font-bold">Room</label>
            <select
              value={room}
              onChange={handleRoomChange}
              required
              className="bg-stone-100 shadow-sm p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-200"
            >
              <option value="" disabled>
                ---Select a Room---
              </option>
              {rooms.map((room) => (
                <option key={room.roomId} value={room.roomId}>
                  {room.roomTitle}
                </option>
              ))}
            </select>
          </div>
        )} */}

        <div className="form-div flex gap-3 p-2 items-center">
          <Button
            variant="black"
            size="sm"
            className="flex gap-1 items-center"
            type="button"
            onClick={() => onCancel()}
          >
            <MdOutlineCancel /> Cancel{" "}
          </Button>
          <Button
            variant="danger"
            size="sm"
            className="flex items-center gap-1"
            type="submit"
          >
            <GrSave /> Save
          </Button>
        </div>
      </form>
    </>
  );
}

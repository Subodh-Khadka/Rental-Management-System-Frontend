import { useState } from "react";
import Button from "../Shared/Table/Button/Button";
import { MdOutlineCancel } from "react-icons/md";
import { GrSave } from "react-icons/gr";
import { FaUser } from "react-icons/fa";

export default function TenantForm({ tenant, onSave, onCancel, rooms }) {
  const [name, setName] = useState(tenant?.name || "");
  const [phone, setPhone] = useState(tenant?.phoneNumber || "");
  const [email, setEmail] = useState(tenant?.emailAddress || "");
  const [room, setRoom] = useState(tenant?.roomId || "");

  function handleNameChange(e) {
    setName(e.target.value);
  }
  function handlePhoneChange(e) {
    setPhone(e.target.value);
  }
  function handleEmailChange(e) {
    setEmail(e.target.value);
  }
  function handleRoomChange(e) {
    setRoom(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();

    const updatedTenant = {
      ...tenant,
      name: name,
      phoneNumber: phone,
      emailAddress: email,
      // room: room,
    };

    const tenantToCreate = {
      name: name,
      phoneNumber: phone,
      emailAddress: email,
      roomId: room,
    };

    onSave(tenant ? updatedTenant : tenantToCreate);
  }

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-3 w-100 bg-white p-3 rounded-xl mb-2"
      >
        <div className="flex items-center gap-2 mb-1">
          <h5 className="font-bold">
            {tenant ? "Edit Tenant Details" : "Create New Tenant "}
          </h5>

          {/* Example: Add an icon */}
          <FaUser className="text-gray-600" />
        </div>

        <div className="form-div flex flex-col gap-2">
          <label htmlFor="tenantName" className=" font-bold">
            Name
          </label>
          <input
            type="text"
            value={name}
            placeholder="name"
            className="bg-stone-100 shadow-sm p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-200"
            required
            onChange={handleNameChange}
          />
        </div>
        <div className="form-div flex flex-col gap-2">
          <label htmlFor="phoneNumber" className=" font-bold">
            Phone
          </label>
          <input
            type="number"
            value={phone}
            placeholder="phone number"
            className="bg-stone-100 shadow-sm p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-200"
            required
            onChange={handlePhoneChange}
          />
        </div>
        <div className="form-div flex flex-col gap-2">
          <label htmlFor="emailAdress" className=" font-bold">
            Email
          </label>
          <input
            type="email"
            value={email}
            placeholder="email address"
            className="bg-stone-100 shadow-sm p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-200"
            required
            onChange={handleEmailChange}
          />
        </div>

        {!tenant && (
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
        )}

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

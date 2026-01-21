import { useEffect, useState } from "react";
import Button from "../Shared/Table/Button/Button";
import { MdOutlineCancel } from "react-icons/md";
import { GrSave } from "react-icons/gr";
import { FaUser } from "react-icons/fa";
import { ConvertToIsoString, formatDateTimeLocal } from "../../utils/dateUtils";

export default function RentPaymentForm({
  rentPayment,
  onSave,
  onCancel,
  rentalContracts,
}) {
  const [selectedContractId, setSelectedContractId] = useState(
    rentPayment?.rentalContractId || "",
  );
  const [paidAmount, setPaidAmount] = useState(rentPayment?.paidAmount || 0);
  const [paymentDate, setPaymentDate] = useState(
    formatDateTimeLocal(rentPayment?.paymentMonth) || "",
  );

  const [roomTitle, setRoomTitle] = useState(rentPayment?.roomTitle || "");
  const [tenantName, setTenantName] = useState(rentPayment?.tenantName || "");
  const [roomPrice, setRoomPrice] = useState(rentPayment?.roomPrice || 0);
  const [status, setStatus] = useState(rentPayment?.status || "Pending");
  const [monthlyCharges, setMonthlyCharges] = useState(
    rentPayment?.monthlyCharges || [],
  );

  useEffect(() => {
    if (!rentPayment && selectedContractId) {
      const contract = rentalContracts.find(
        (c) => c.rentalContractId === selectedContractId,
      );
      if (contract) {
        setRoomTitle(contract.roomTitle);
        setRoomPrice(contract.roomPrice);
        setTenantName(contract.tenantName);
      }
    }
  }, [selectedContractId, rentalContracts, rentPayment]);

  const totalAmount =
    roomPrice +
    monthlyCharges.reduce((sum, c) => sum + (parseFloat(c.amount) || 0), 0);

  const dueAmount = totalAmount - (parseFloat(paidAmount) || 0);

  function handlePaymentDate(e) {
    setPaymentDate(e.target.value);
  }
  function handlePaidAmountChange(e) {
    const value = e.target.value;
    setPaidAmount(value === "" ? 0 : parseFloat(value));
  }

  function handleSubmit(e) {
    e.preventDefault();

    const rentPaymentToCreate = {
      rentalContractId: selectedContractId,
      paymentMonth: ConvertToIsoString(paymentDate),
      roomPrice,
      paidAmount,
      totalAmount,
      dueAmount,
      status,
    };

    if (rentPayment?.paymentId) {
      rentPaymentToCreate.paymentId = rentPayment.paymentId;
    }

    onSave(rentPaymentToCreate);
  }

  const inputClass =
    "bg-stone-100 p-2 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-200";

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-4 rounded-xl flex flex-col gap-4 mb-3"
    >
      <div className="flex items-center gap-2">
        <h5 className="font-bold">
          {rentPayment ? "Edit Payment Details" : "Create New Payment"}
        </h5>
        <FaUser className="text-gray-600" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="flex flex-col gap-4">
          {!rentPayment ? (
            <div className="flex flex-col">
              <label className="font-bold">Select Contract</label>
              <select
                name="rentalContract"
                value={selectedContractId}
                onChange={(e) => setSelectedContractId(e.target.value)}
                className={inputClass}
              >
                <option value="">--select a contract--</option>
                {rentalContracts.map((c) => (
                  <option key={c.rentalContractId} value={c.rentalContractId}>
                    {c.roomTitle}-{c.tenantName}
                  </option>
                ))}
              </select>
            </div>
          ) : (
            <>
              <div className="flex flex-col">
                <label className="font-bold">Room</label>
                <input
                  type="text"
                  value={roomTitle}
                  className={inputClass}
                  readOnly
                />
              </div>
              <div className="flex flex-col">
                <label className="font-bold">Tenant</label>
                <input
                  type="text"
                  value={tenantName}
                  className={inputClass}
                  readOnly
                />
              </div>
            </>
          )}

          <div className="flex flex-col">
            <label className="font-bold">R-Price</label>
            <input
              type="number"
              value={roomPrice}
              className={inputClass}
              readOnly
            />
          </div>

          <div className="flex flex-col">
            <label className="font-bold">Date</label>
            <input
              type="datetime-local"
              value={paymentDate}
              className={inputClass}
              required
              onChange={handlePaymentDate}
            />
          </div>

          <div className="flex gap-3 justify-start">
            <Button
              variant="black"
              size="sm"
              className="flex gap-1 items-center"
              type="button"
              onClick={onCancel}
            >
              <MdOutlineCancel /> Cancel
            </Button>
            <Button
              variant="danger"
              size="sm"
              className="flex gap-1 items-center"
              type="submit"
            >
              <GrSave /> Save
            </Button>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <div className="flex flex-col">
            <label className="font-bold">Total</label>
            <input
              type="number"
              value={totalAmount}
              className={inputClass}
              readOnly
            />
          </div>
          <div className="flex flex-col">
            <label className="font-bold">Paid</label>
            <input
              type="number"
              value={paidAmount}
              placeholder="Paid amount"
              className={inputClass}
              onChange={handlePaidAmountChange}
            />
          </div>
          <div className="flex flex-col">
            <label className="font-bold">Due</label>
            <input
              type="number"
              value={dueAmount}
              className={inputClass}
              readOnly
            />
          </div>
          <div className="flex flex-col">
            <label className="font-bold">Status</label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className={inputClass}
            >
              <option value="Pending">Pending</option>
              <option value="Paid">Paid</option>
            </select>
          </div>
        </div>
      </div>
    </form>
  );
}

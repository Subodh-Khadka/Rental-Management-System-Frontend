import { useEffect, useState } from "react";
import Button from "../Shared/Table/Button/Button";
import { MdOutlineCancel } from "react-icons/md";
import { GrSave } from "react-icons/gr";
import { FaUser } from "react-icons/fa";

export default function ChargeTemplateForm({ template, onSave, onCancel }) {
  const [selectedTemplateId, setSelectedTemplateId] = useState(
    template?.chargeTemplateId || ""
  );
  const [defaultAmount, setDefaultAmount] = useState(
    template?.defaultAmount || 0
  );
  const [IsVariable, setIsVariable] = useState(template?.isVariable || "N/A");
  const [chargeType, setChargeType] = useState(template?.chargeType || "");
  const [calculationMethod, setCalculationMethod] = useState(
    template?.calculationMethod || ""
  );

  function handleTemplateId(e) {
    setSelectedTemplateId(e.target.value);
  }
  function handleDefaultAmount(e) {
    setDefaultAmount(parseFloat(e.target.value));
  }
  function handleIsVariable(e) {
    setIsVariable(e.target.value);
  }
  function handleChargeType(e) {
    setIsVariable(e.target.value);
  }
  function handleCalculationMethod(e) {
    setIsVariable(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();

    // const rentPaymentToCreate = {
    //   paymentId: rentPayment?.paymentId || undefined,
    //   rentalContractId: selectedContractId,
    //   paymentMonth: ConvertToIsoString(paymentDate),
    //   roomPrice: roomPrice,
    //   paidAmount: paidAmount,
    //   totalAmount: totalAmount,
    //   dueAmount: dueAmount,
    // };

    // onSave(rentPaymentToCreate);
  }

  const inputClass =
    "bg-stone-100 p-2 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-200";

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-4 rounded-xl flex flex-col gap-4 mb-3"
    >
      {/* Header */}
      <div className="flex items-center gap-2">
        <h5 className="font-bold">
          {template ? "Edit Template Details" : "Create New Template"}
        </h5>
        <FaUser className="text-gray-600" />
      </div>

      {/* Main content */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left column */}
        <div className="flex flex-col gap-4">
          <div className="flex flex-col">
            <label className="font-bold">Charge Type</label>
            <input
              type="text"
              value={chargeType}
              className={inputClass}
              readOnly
              onChange={handleDefaultAmount}
            />
          </div>
          <div className="flex flex-col">
            <label className="font-bold">Default Amount</label>
            <input
              type="text"
              value={defaultAmount}
              className={inputClass}
              readOnly
              onChange={handleDefaultAmount}
            />
          </div>

          <div className="flex flex-col">
            <label className="font-bold">Is Variable</label>
            <input
              type="number"
              value={IsVariable}
              className={inputClass}
              readOnly
              onChange={handleIsVariable}
            />
          </div>

          <div className="flex flex-col">
            <label className="font-bold">calculation Method</label>
            <input
              type="text"
              value={calculationMethod}
              className={inputClass}
              onChange={handleCalculationMethod}
            />
          </div>

          {/* Buttons */}
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
      </div>
    </form>
  );
}

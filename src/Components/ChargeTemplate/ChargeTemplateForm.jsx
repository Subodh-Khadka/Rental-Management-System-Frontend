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
  const [isVariable, setIsVariable] = useState(template?.isVariable ?? false);
  const [chargeType, setChargeType] = useState(template?.chargeType || "");
  const [IsActive, setIsActive] = useState(template?.IsActive || false);
  const [calculationMethod, setCalculationMethod] = useState(
    template?.calculationMethod || ""
  );

  function handleTemplateId(e) {
    setSelectedTemplateId(e.target.value);
  }
  function handleDefaultAmount(e) {
    const value = e.target.value;
    setDefaultAmount(value === "" ? 0 : parseFloat(value));
  }
  function handleIsVariable() {
    setIsVariable(true);
  }
  function handleChargeType(e) {
    setChargeType(e.target.value);
  }
  function handleCalculationMethod(e) {
    setCalculationMethod(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();

    const templatePayload = {
      chargeType,
      defaultAmount,
      isVariable,
      calculationMethod,
      isActive: IsActive,
      ...(template ? { chargeTemplateId: template.chargeTemplateId } : {}),
    };

    onSave(templatePayload);
  }

  const inputClass =
    "bg-stone-100 p-2 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-200";

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-4 rounded-xl flex flex-col gap-4 mb-3 w-100"
    >
      {/* Header */}
      <div className="flex items-center gap-2">
        <h5 className="font-bold">
          {template ? "Edit Template Details" : "Create New Template"}
        </h5>
        <FaUser className="text-gray-600" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-1 gap-6">
        <div className="flex flex-col gap-4">
          <div className="flex flex-col">
            <label className="font-bold">Charge Type</label>
            <input
              type="text"
              value={chargeType}
              className={inputClass}
              required
              onChange={handleChargeType}
            />
          </div>
          <div className="flex flex-col">
            <label className="font-bold">Default Amount</label>
            <input
              type="number"
              value={defaultAmount}
              className={inputClass}
              onChange={handleDefaultAmount}
            />
          </div>

          <div className="flex flex-col">
            <label className="font-bold mb-1">Is Variable</label>
            <div className="flex items-center gap-4">
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="isVariable"
                  value="true"
                  checked={isVariable === true}
                  onChange={() => setIsVariable(true)}
                  className={inputClass}
                />
                Yes
              </label>

              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="isVariable"
                  value="false"
                  checked={isVariable === false}
                  onChange={() => setIsVariable(false)}
                  className={inputClass}
                  required
                />
                No
              </label>
            </div>
          </div>

          <div className="flex flex-col">
            <label className="font-bold">calculation Method</label>
            <input
              type="text"
              value={calculationMethod}
              className={inputClass}
              onChange={handleCalculationMethod}
              required
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="IsActive" className="font-bold">
              Active:
            </label>
            <input
              type="checkbox"
              checked={IsActive || false}
              onChange={(e) => setIsActive(e.target.checked)}
              className="w-5 h-5"
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
      </div>
    </form>
  );
}

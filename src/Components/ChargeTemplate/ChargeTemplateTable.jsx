import { useState } from "react";
import TableHeaderCell from "../Shared/Table/TableHeaderCell";
import Button from "../Shared/Table/Button/Button";
import { IoAddOutline } from "react-icons/io5";
import ChargeTemplateForm from "./ChargeTemplateForm";

import {
  createChargeTemplate,
  updateChargeTemplate,
  deleteChargeTemplate,
} from "../../api/chargeTemplate";
import ChargeTemplateItem from "./ChargeTemplateItem";

export default function ChargeTemplateTable({
  templateData,
  onCreate,
  onUpdate,
  onDelete,
  error,
}) {
  const [editingTemplate, setEditingTemplate] = useState(null);
  const [creatingTemplate, setCreatingTemplate] = useState(false);

  function handleEdit(template) {
    setEditingTemplate(template);
    setCreatingTemplate(false);
  }

  async function handleSave(template) {
    try {
      if (editingTemplate) {
        const updatedTemplate = await updateChargeTemplate(
          template.chargeTemplateId,
          template
        );
        onUpdate(updatedTemplate);
        setEditingTemplate(null);
      } else {
        const newChargeTemplate = await createChargeTemplate(template);
        onCreate(newChargeTemplate);
        setCreatingTemplate(false);
      }
    } catch (err) {
      console.log("Error saving template", err);
      alert("Failed To save template");
    }
  }

  async function handleDelete(chargeTemplateId) {
    try {
      await deleteChargeTemplate(chargeTemplateId);
      onDelete(chargeTemplateId);
    } catch (err) {
      console.log(err, "Error deleting template");
    }
  }

  return (
    <>
      {(editingTemplate || creatingTemplate) && (
        <section>
          <ChargeTemplateForm
            template={editingTemplate || null}
            onSave={handleSave}
            onCancel={() => {
              setCreatingTemplate(false);
              setEditingTemplate(null);
            }}
          />
        </section>
      )}

      <section className="bg-white p-4 rounded-2xl shadow-lg">
        <h1 className="text-lg text-center font-bold mb-3">Charge Templates</h1>

        {error && <h1>{error}</h1>}

        {!creatingTemplate && !editingTemplate && (
          <section>
            <Button
              variant="primary"
              size="md"
              className="flex items-center gap-2 mb-2"
              onClick={() => {
                setCreatingTemplate(true);
                setEditingTemplate(null);
              }}
            >
              <IoAddOutline /> Create New Template
            </Button>
          </section>
        )}
        <div>
          <table className="w-full text-left table-auto table-bordered text-sm-center">
            <thead>
              <tr>
                <TableHeaderCell>S.N</TableHeaderCell>
                <TableHeaderCell>Charge Type</TableHeaderCell>
                <TableHeaderCell>Default Amount</TableHeaderCell>
                <TableHeaderCell>Is Variable</TableHeaderCell>
                <TableHeaderCell>Calculation Method</TableHeaderCell>
                <TableHeaderCell>Status</TableHeaderCell>
                <TableHeaderCell>Actions</TableHeaderCell>
              </tr>
            </thead>
            <tbody>
              {templateData.length > 0 ? (
                templateData.map((template, index) => (
                  <ChargeTemplateItem
                    key={template.chargeTemplateId}
                    template={template}
                    index={index}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                  />
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="text-center py-4">
                    <span>No Data Available</span>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
}

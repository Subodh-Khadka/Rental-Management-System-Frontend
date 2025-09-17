import { useState, useEffect } from "react";
import { getChargeTemplates } from "../api/chargeTemplate";

export default function useChargeTemplate() {
  const [chargeTemplates, setChargeTemplates] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const loadChargeTemplates = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await getChargeTemplates();
      setChargeTemplates(data);
    } catch (err) {
      setError(err.message || "Failed to load templates");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadChargeTemplates();
  }, []);

  //create payment in state
  const createTemplateInState = async (newTemplate) => {
    setChargeTemplates((prevTemplate) => [newTemplate, ...prevTemplate]);
  };

  // update payment in the state
  const updateTemplateInState = async (updatedTemplate) => {
    setChargeTemplates((prevTemplate) =>
      prevTemplate.map((template) =>
        template.chargeTemplateId === updatedTemplate.chargeTemplateId
          ? updatedTemplate
          : template
      )
    );
  };

  //delete payment In State
  const deleteTemplateInstate = async (chargeTemplateId) => {
    setChargeTemplates((prevTemplate) =>
      prevTemplate.filter(
        (template) => template.chargeTemplateId !== chargeTemplateId
      )
    );
  };

  return {
    chargeTemplates,
    error,
    isLoading,
    loadChargeTemplates,
    updateTemplateInState,
    createTemplateInState,
    deleteTemplateInstate,
  };
}

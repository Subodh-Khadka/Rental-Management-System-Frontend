import useChargeTemplate from "../hooks/useChargeTemplate";
import ChargeTemplateTable from "../Components/ChargeTemplate/ChargeTemplateTable";

export default function ChargeTemplate() {
  const {
    chargeTemplates,
    createTemplateInState,
    updateTemplateInState,
    deleteTemplateInstate,
    error,
    isLoading,
  } = useChargeTemplate();

  if (isLoading) return <h1>Loading data...</h1>;
  if (error) return <h1>{error}</h1>;

  return (
    <>
      <ChargeTemplateTable
        error={error}
        templateData={chargeTemplates}
        onCreate={createTemplateInState}
        onUpdate={updateTemplateInState}
        onDelete={deleteTemplateInstate}
      />
    </>
  );
}

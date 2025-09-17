import MonthlyChargeTable from "../Components/MonthlyCharge/MonthlyChargeTable";
import useMonthlyCharge from "../hooks/useMonthlyCharge";

export default function MonthlyCharge() {
  const { monthlyChargesSummary } = useMonthlyCharge();

  return (
    <MonthlyChargeTable monthlyChargeSummaryData={monthlyChargesSummary} />
  );
}

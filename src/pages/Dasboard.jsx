import React, { useEffect, useState } from "react";
import axios from "axios";
import { ResponsiveBar } from "@nivo/bar";

function Dashboard() {
  const [dashboardData, setDashboardData] = useState(null);

  const fetchDashboardData = async () => {
    try {
      const response = await axios.get("https://localhost:7148/api/Dashboard");
      setDashboardData(response.data.data);
    } catch (error) {
      console.error("Failed to fetch dashboard data", error);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  if (!dashboardData) return <p>Loading dashboard...</p>;

  const {
    totalRooms,
    occupiedRooms,
    pendingPayments,
    totalTransactions,
    monthlyPayments,
  } = dashboardData;

  const chartData = monthlyPayments.map((item) => ({
    month: item.month,
    payments: item.paymentsCount,
  }));

  return (
    <div
      style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}
      className="gap-3 mb-5 bg-white p-4"
    >
      <h1 className="text-lg text-center font-bold mb-3">Dashboard</h1>

      {/* Top Stats */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: "20px",
          marginBottom: "40px",
        }}
      >
        <div style={cardStyle}>
          <h3>Total Rooms</h3>
          <p>{totalRooms}</p>
        </div>
        <div style={cardStyle}>
          <h3>Occupied Rooms</h3>
          <p>{occupiedRooms}</p>
        </div>
        <div style={cardStyle}>
          <h3>Pending Payments</h3>
          <p>{pendingPayments}</p>
        </div>
        <div style={cardStyle}>
          <h3>Total Transactions</h3>
          <p>{totalTransactions}</p>
        </div>
      </div>
      <hr />

      {/* Chart */}
      <div style={{ height: 400 }}>
        <ResponsiveBar
          data={chartData}
          keys={["payments"]}
          indexBy="month"
          margin={{ top: 20, right: 30, bottom: 50, left: 60 }}
          padding={0.3}
          valueScale={{ type: "linear" }}
          indexScale={{ type: "band", round: true }}
          colors={{ scheme: "nivo" }}
          borderColor={{ from: "color", modifiers: [["darker", 1.6]] }}
          axisTop={null}
          axisRight={null}
          axisBottom={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: "Month",
            legendPosition: "middle",
            legendOffset: 40,
          }}
          axisLeft={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: "Payments",
            legendPosition: "middle",
            legendOffset: -50,
          }}
          labelSkipWidth={12}
          labelSkipHeight={12}
          labelTextColor={{ from: "color", modifiers: [["darker", 1.6]] }}
          tooltip={({ indexValue, value }) => (
            <strong>
              {indexValue}: {value} payments
            </strong>
          )}
        />
      </div>
    </div>
  );
}

const cardStyle = {
  background: "#fff",
  borderRadius: "8px",
  padding: "20px",
  boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
  textAlign: "center",
};

export default Dashboard;

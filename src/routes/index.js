import { Routes, Route } from "react-router-dom";

import React from "react";
import ProfitLoss from "../components/pages/ProfitLoss";
import CashFlow from "../components/pages/CashFlow";
import Shareholder from "../components/pages/Shareholder";

function AppRoutes() {
  return (
      <Routes>
        <Route path="/" element={<ProfitLoss />} />
        <Route path="/cash-flow" element={<CashFlow />} />
        {/* <Route path="/balance-sheet" /> */}
        <Route path="/stakeholders" element={<Shareholder />} />
      </Routes>
  );
}

export default AppRoutes;

import React, { Suspense, useEffect, useState } from "react";
import VerticalHeaderTable from "../VerticalHeaderTable";
import { getFinancialData } from "../../api";
import { useAppStore } from "../../stores/AppStore";

function ProfitLoss() {
  const [data, setData] = useState([]);
  const { errorMessage, setErrorMessage, searchItem } = useAppStore();

  const handleCompanyData = async (companyId) => {
    try {
      const response = await getFinancialData(companyId);
      setData(response.data);
      console.log(response.data)
      setErrorMessage("");
    } catch (error) {
      console.log(error);
      setErrorMessage(error.response.data.error);
    }
  };

  useEffect(() => {
    if (searchItem) {
      handleCompanyData(searchItem.company_number);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchItem]);

  return (
    <div className="container p-4 pt-0">
      <h2 className="text-center mb-4">Profit and Loss</h2>

      <Suspense
        fallback={<div className="p-3 mb-2 bg-info text-dark">Loading...</div>}
      >
        {errorMessage.length === 0 ? (
          data.length !== 0 && <VerticalHeaderTable data={data} />
        ) : (
          <div className="p-3 mb-2 bg-danger text-white">{errorMessage}</div>
        )}
      </Suspense>
    </div>
  );
}

export default ProfitLoss;

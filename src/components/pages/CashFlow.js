import React, { Suspense, useEffect, useState } from "react";
import SearchBar from "../SearchBar";
import CashFlowTable from "../CashFlowTable";
import { getFinancialData } from "../../api";
import { useAppStore } from "../../stores/AppStore";

function CashFlow() {
  const [data, setData] = useState([]);
  const { errorMessage, setErrorMessage, searchItem } = useAppStore();

  const handleCompanyData = async (companyId) => {
    try {
      const response = await getFinancialData(companyId);
      console.log(response.data)
      setData(response.data);
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
      <h2 className="text-center mb-4">Balance Sheet</h2>
      {/* <SearchBar setData={setData} setErrorMessage={setErrorMessage} apiFunction={getFinancialData}/> */}

      <Suspense
        fallback={<div className="p-3 mb-2 bg-info text-dark">Loading...</div>}
      >
        {errorMessage.length === 0 ? (
          data.length !== 0 && <CashFlowTable data={data} />
        ) : (
          <div className="p-3 mb-2 bg-danger text-white">{errorMessage}</div>
        )}
      </Suspense>
    </div>
  );
}

export default CashFlow;

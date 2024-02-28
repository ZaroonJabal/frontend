import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { getMonthFromDate, formatNumber } from "../helpers/format";

const VerticalHeaderTable = (props) => {
  const { data } = props;
  // const headers = [
  //   "Date Ended",
  //   "No Of Months",
  //   "Acquisition Disposal",
  //   "Capital Expenditure Financ Invest",
  //   "Equity Dividends Paid",
  //   "Increase In Cash Equivalents",
  //   "Management Of Liquid Resources",
  //   "Net Cash Flow From Financing",
  //   "Net Cash Flow From Investing Activ",
  //   "Net Cash Flow From Operations",
  //   "Net Cash Flow Return On Invest",
  //   "Taxation",
  // ];

  // const getCellValue = (rowData, header) => {
  //   const key = header.toLowerCase().split(" ").join("_");
  //   // debugger

  //   for (const [keyName, value] of Object.entries(rowData)) {
  //     if (key in value) {
  //       const cellValue = value[key];
  //       if (key === "date_ended") {
  //         return getMonthFromDate(value[key]);
  //       }
  //       if (key === "no_of_months") {
  //         return `${value[key]} months`;
  //       }
  //       return typeof cellValue === "object"
  //         ? JSON.stringify(cellValue)
  //         : cellValue;
  //     }

  //     if ("cash_flow" in value) {
  //       if (key === "acquisition_disposal") {
  //         return formatNumber(value["cash_flow"].acquisition_disposal);
  //       }
  //       if (key === "capital_expenditure_financ_invest") {
  //         return formatNumber(
  //           value["cash_flow"].capital_expenditure_financ_invest
  //         );
  //       }
  //       if (key === "equity_dividends_paid") {
  //         return formatNumber(value["cash_flow"].equity_dividends_paid);
  //       }
  //       if (key === "increase_in_cash_equivalents") {
  //         return formatNumber(
  //           value["cash_flow"].increase_in_cash_equivalents
  //         );
  //       }
  //       if (key === "management_of_liquid_resources") {
  //         return formatNumber(
  //           value["cash_flow"].management_of_liquid_resources
  //         );
  //       }
  //       if (key === "net_cash_flow_from_financing") {
  //         return formatNumber(
  //           value["cash_flow"].net_cash_flow_from_financing
  //         );
  //       }
  //       if (key === "net_cash_flow_from_investing_activ") {
  //         return formatNumber(
  //           value["cash_flow"].net_cash_flow_from_investing_activ
  //         );
  //       }
  //       if (key === "net_cash_flow_from_operations") {
  //         return formatNumber(
  //           value["cash_flow"].net_cash_flow_from_operations
  //         );
  //       }
  //       if (key === "net_cash_flow_return_on_invest") {
  //         return formatNumber(
  //           value["cash_flow"].net_cash_flow_return_on_invest
  //         );
  //       }
  //       if (key === "taxation") {
  //         return formatNumber(value["cash_flow"].taxation);
  //       }
  //     }
  //   }
  //   return "";
  // };
  const extractLastChildValues = (obj, currentPath = '', result = {}) => {
    for (const [key, value] of Object.entries(obj)) {
      const path = currentPath ? `${currentPath}.${key}` : key;

      if (typeof value === 'object') {
        extractLastChildValues(value, path, result);
      } else {
        result[path] = value;
      }
    }

    return result;
  };

  const extractedData = data?.map((dataObj) => extractLastChildValues(dataObj["balance_sheet"]));
  const combinedData = extractedData?.reduce((acc, dataObj) => ({ ...acc, ...dataObj }), {});

  const headers = Object.keys(combinedData);

  return (
    <div className="overflow-x-scroll">
      <table className="table table-bordered table-striped">
        <tbody>
          {headers.map((header, rowIndex) => (
            <tr key={rowIndex}>
              <th scope="row" className="text-nowrap" style={headerCellStyle}>
                {header}
              </th>
              {extractedData?.map((rowData, dataIndex) => (
                <td key={dataIndex} style={dataCellStyle}>
                  {formatNumber(rowData[header])}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const headerCellStyle = {
  backgroundColor: "#f2f2f2",
  fontWeight: "bold",
  padding: "10px",
};

const dataCellStyle = {
  padding: "10px",
};

export default VerticalHeaderTable;

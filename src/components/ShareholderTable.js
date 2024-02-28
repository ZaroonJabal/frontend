import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { formatFloat, formatNumber } from "../helpers/format";

const ShareholderTable = (props) => {
  const { data } = props;

  const [updated, setUpdated] = useState();
  const [lastRow, setLastRow] = useState([]);

  const headers = [
    // "Title",
    "Name",
    "Type",
    "Shares",
    // "Currency",
    // "Shareholding",
    "Percentage",
  ];

  const calculateTotalSum = (shareList) => {
    const totalSum = shareList.reduce((sum, item) => {
      return sum + parseInt(item.shares);
    }, 0);

    return formatNumber(totalSum);
  };

  const calculateSharePercentage = (shareList) => {
    const totalShares = shareList.reduce(
      (sum, item) => sum + parseInt(item.shares),
      0
    );

    const result = shareList.map((item) => ({
      ...item,
      percentage: formatFloat((parseInt(item.shares) / totalShares) * 100) + "%",
    }));

    result.sort((a, b) => parseInt(b.shares) - parseInt(a.shares));

    return result;
  };

  const lastRowData = () => {
    const row = headers.map((header, index) => {
      if (index === 0) {
        return "Total";
      } else if (header === "Shares") {
        return calculateTotalSum(data);
      } else {
        return "";
      }
    });

    return row;
  };

  const getCellValue = (rowData, header) => {
    const key = header.toLowerCase().split(" ").join("_");
    if (key === "name") {
      return rowData["first_name"].concat(" ", rowData["last_name"]);
    }
    if (key === "shares") {
      return rowData[key].length !== 0 ? formatNumber(rowData[key]) : "-";
    }
    if (key in rowData) {
      return rowData[key].length !== 0 ? rowData[key] : "-";
    } else {
      return "";
    }
  };

  useEffect(() => {
    setUpdated(calculateSharePercentage(data));
    setLastRow(lastRowData());
  }, [data]);

  return (
    <div className="overflow-x-scroll">
      <table className="table table-bordered table-striped">
        <thead>
          <tr>
            {headers.map((header, index) => (
              <th key={index} className="text-nowrap" style={headerCellStyle}>
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {updated?.map((rowData, rowIndex) => (
            <tr key={rowIndex}>
              {headers.map((header, dataIndex) => (
                <td key={dataIndex} style={dataCellStyle}>
                  {getCellValue(rowData, header) || ""}
                </td>
              ))}
            </tr>
          ))}
          <tr>
            {lastRow.map((item, dataIndex) => (
              <td key={dataIndex} className="fw-bold" style={dataCellStyle}>{item}</td>
            ))}
          </tr>
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

export default ShareholderTable;

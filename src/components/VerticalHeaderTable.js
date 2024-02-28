import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { getMonthFromDate, formatNumber } from '../helpers/format';

const VerticalHeaderTable = (props) => {
  const { data } = props;
  const headers = ['Date Ended', 'No Of Months', 'UK Turnover', 'Export Turnover', 'Turnover', 'Cost Of Sales', 'Gross Profit',
    'Operational Expenses', 'Other Expenses', 'Operating Profit', 'Other Income', 'Exceptional Items', 'Profit Before Interest',
    'Interest Paid', 'Profit Before Tax', 'Taxation', 'Profit After Tax'];

  const BoldHeaders = ['Turnover', 'Gross Profit', 'Operating Profit', 'Profit Before Tax']

  const getCellValue = (rowData, header) => {
    const key = header.toLowerCase().split(' ').join('_');

    for (const [keyName, value] of Object.entries(rowData)) {
      if (key in value) {
        const cellValue = value[key];
        if (key === 'date_ended') {
          return getMonthFromDate(value[key])
        }
        if (key === 'no_of_months') {
          return `${value[key]} months`
        }
        if (key === 'cost_of_sales') {
          return formatNumber(value[key].cost_of_sales)
        }
        if (key === 'operating_profit') {
          return formatNumber(value[key].operating_profit)
        }
        if (key === 'profit_before_interest') {
          return formatNumber(value[key].profit_before_interest)
        }
        if (key === 'profit_before_tax') {
          return formatNumber(value[key].profit_before_tax)
        }
        if (key === 'turnover' && typeof value[key] === 'object' && 'turnover' in value[key]) {
          return formatNumber(value[key].turnover)
        }
        return formatNumber(typeof cellValue === 'object' ? JSON.stringify(cellValue) : cellValue);
      }
      if ('cost_of_sales' in value) {
        if (key === 'operational_expenses') {
          return formatNumber(value['cost_of_sales'].operational_expenses)
        }
      }
      if ('operating_profit' in value) {
        if (key === 'other_income') {
          return formatNumber(value['operating_profit'].other_income)
        }
        if (key === 'exceptional_items') {
          return formatNumber(value['operating_profit'].exceptional_items)
        }
      }
      if ('profit_before_interest' in value) {
        if (key === 'interest_paid') {
          return formatNumber(value['profit_before_interest'].interest_paid)
        }
      }
      if ('profit_before_tax' in value) {
        if (key === 'taxation') {
          return formatNumber(value['profit_before_tax'].taxation)
        }
      }
      if (typeof value['turnover'] === 'object') {
        if (key === 'export_turnover') {
          return formatNumber(value['turnover'].export_turnover)
        }
        if (key === 'uk_turnover') {
          return formatNumber(value['turnover'].uk_turnover)
        }
      }
    }
    return '';
  };

  return (
    <div className="overflow-x-scroll">
      <table className="table table-bordered table-striped">
        <tbody>
          {headers.map((header, rowIndex) => (
            <tr key={rowIndex}>
              <th scope="row" className={`text-nowrap ${BoldHeaders.includes(header) ? '' : 'fw-normal'}`} style={headerCellStyle}>{header}</th>
              {data?.map((rowData, dataIndex) => (
                <td key={dataIndex} className={`${BoldHeaders.includes(header) ? 'fw-bold' : ''}`} style={dataCellStyle}>{getCellValue(rowData, header) || '-'}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const headerCellStyle = {
  backgroundColor: '#f2f2f2',
  padding: '10px',
};

const dataCellStyle = {
  padding: '10px',
  textAlign: 'end',
};

export default VerticalHeaderTable;

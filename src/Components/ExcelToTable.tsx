import React, { useState } from 'react';
import * as XLSX from 'xlsx';

const ExcelToTable = () => {
    const [data, setData] = useState([]);

    const handleFileUpload = (event) => {
        const file = event.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (e) => {
            const binaryStr = e.target.result;
            const workbook = XLSX.read(binaryStr, { type: 'binary' });
            const sheetName = workbook.SheetNames[0];
            const sheet = workbook.Sheets[sheetName];
            const jsonData = XLSX.utils.sheet_to_json(sheet);
            setData(jsonData);
        };
        reader.readAsBinaryString(file);
    };

    return (
        <div>
            <input
                type="file"
                accept=".xlsx, .xls"
                onChange={handleFileUpload}
            />
            <table border="1" style={{ marginTop: '20px', width: '100%' }}>
                <thead>
                <tr>
                    {data[0] && Object.keys(data[0]).map((key, index) => (
                        <th key={index}>{key}</th>
                    ))}
                </tr>
                </thead>
                <tbody>
                {data.map((row, rowIndex) => (
                    <tr key={rowIndex}>
                        {Object.values(row).map((value, colIndex) => (
                            <td key={colIndex}>{value}</td>
                        ))}
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default ExcelToTable;

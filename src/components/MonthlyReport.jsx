import "react";
import {TextField, Button, Typography, MenuItem} from "@mui/material";
import { Pie } from "react-chartjs-2";

const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

// eslint-disable-next-line react/prop-types
const MonthlyReport = ({ month, setMonth, year, setYear, reportData, chartData, handleGetReport }) => {
    return (
        <>
            <TextField
                label="Month"
                select
                fullWidth
                value={month}
                onChange={(e) => setMonth(e.target.value)}
                style={{ marginBottom: "10px" }}
            >
                {months.map((mon, index) => (
                    <MenuItem key={index} value={index + 1}>
                        {mon}
                    </MenuItem>
                ))}
            </TextField>
            <TextField
                label="Year"
                type="number"
                fullWidth
                value={year}
                onChange={(e) => setYear(e.target.value)}
                style={{ marginBottom: "10px" }}
            />
            <Button variant="contained" color="primary" onClick={handleGetReport}>
                Get Report
            </Button>

            {chartData && (
                <div style={{ marginTop: "20px" }}>
                    <Pie data={chartData} />
                </div>
            )}

            {/* eslint-disable-next-line react/prop-types */}
            {reportData.length > 0 && (
                <div style={{ marginTop: "20px" }}>
                    <Typography variant="h6">Cost Items:</Typography>
                    <ul>
                        {/* eslint-disable-next-line react/prop-types */}
                        {reportData.map((item, index) => (
                            <li key={index} style={{ marginBottom: "10px" }}>
                                <strong>{item.category}</strong>: {item.description} - ${item.sum.toFixed(2)} (Date: {new Date(item.date).toLocaleDateString()})
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </>
    );
};

export default MonthlyReport;

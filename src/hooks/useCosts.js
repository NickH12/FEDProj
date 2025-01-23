import { useState } from "react";

const useCosts = () => {
    const [sum, setSum] = useState("");
    const [category, setCategory] = useState("");
    const [description, setDescription] = useState("");
    const [month, setMonth] = useState(new Date().getMonth() + 1); // Default to the current month
    const [year, setYear] = useState(new Date().getFullYear()); // Default to the current year
    const [reportData, setReportData] = useState([]);
    const [chartData, setChartData] = useState(null);

    const handleAddCost = async () => {
        if (!sum || !category || !description) {
            alert("Please fill in all fields before adding a cost.");
            return;
        }

        const newCost = {
            category,
            description,
            sum: parseFloat(sum),
            date: new Date().toISOString(),
        };

        setReportData((prevData) => [...prevData, newCost]);

        // Clear form after submission
        setSum("");
        setCategory("");
        setDescription("");
    };

    const handleGetReport = () => {
        const filteredData = reportData.filter(
            (item) =>
                new Date(item.date).getMonth() + 1 === parseInt(month) &&
                new Date(item.date).getFullYear() === parseInt(year)
        );

        if (filteredData.length === 0) {
            alert("No data found for the selected month and year.");
            setChartData(null);
            return;
        }

        const categories = ["Food", "Transportation", "Entertainment", "Utilities", "Other"];
        const data = categories.map((cat) =>
            filteredData
                .filter((item) => item.category === cat)
                .reduce((sum, item) => sum + item.sum, 0)
        );

        const formattedChartData = {
            labels: categories,
            datasets: [
                {
                    data: data,
                    backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4CAF50", "#FF5722"],
                },
            ],
        };

        setChartData(formattedChartData);
    };

    return {
        sum,
        setSum,
        category,
        setCategory,
        description,
        setDescription,
        handleAddCost,
        month,
        setMonth,
        year,
        setYear,
        reportData,
        chartData,
        handleGetReport,
    };
};

export default useCosts;

export const getChartData = (report) => {
    const categories = ["Food", "Transportation", "Entertainment", "Utilities", "Other"];
    const data = categories.map((cat) =>
        report.filter((item) => item.category === cat).reduce((sum, item) => sum + item.sum, 0)
    );

    return {
        labels: categories,
        datasets: [
            {
                data,
                backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4CAF50", "#FF5722"],
            },
        ],
    };
};

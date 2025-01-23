import {AppBar, Container, Grid, Paper, Toolbar, Typography} from "@mui/material";
import useCosts from "./hooks/useCosts";
import CostForm from "./components/CostForm";
import MonthlyReport from "./components/MonthlyReport";

// Chart.js registration
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
ChartJS.register(ArcElement, Tooltip, Legend);

const App = () => {
    const {
        sum,
        category,
        description,
        setSum,
        setCategory,
        setDescription,
        handleAddCost,
        month,
        year,
        setMonth,
        setYear,
        reportData,
        chartData,
        handleGetReport,
    } = useCosts();

    return (
        <>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6">Cost Manager</Typography>
                </Toolbar>
            </AppBar>

        <Container>
            <Grid container spacing={3} style={{ marginTop: "20px" }}>
                {/* Cost Form Section */}
                <Grid item xs={12} md={6}>
                    <Paper style={{ padding: "20px" }}>
                        <CostForm
                            sum={sum}
                            setSum={setSum}
                            category={category}
                            setCategory={setCategory}
                            description={description}
                            setDescription={setDescription}
                            handleAddCost={handleAddCost}
                        />
                    </Paper>
                </Grid>

                {/* Monthly Report Section */}
                <Grid item xs={12} md={6}>
                    <Paper style={{ padding: "20px" }}>
                        <MonthlyReport
                            month={month}
                            setMonth={setMonth}
                            year={year}
                            setYear={setYear}
                            reportData={reportData}
                            chartData={chartData}
                            handleGetReport={handleGetReport}
                        />
                    </Paper>
                </Grid>
            </Grid>
        </Container>
        </>
    );
};

export default App;

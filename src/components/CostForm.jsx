import "react";
import { TextField, Button, MenuItem } from "@mui/material";

const categories = ["Food", "Transportation", "Entertainment", "Utilities", "Other"];

// eslint-disable-next-line react/prop-types
const CostForm = ({ sum, setSum, category, setCategory, description, setDescription, handleAddCost }) => {
    return (
        <>
            <TextField
                label="Sum"
                type="number"
                fullWidth
                value={sum}
                onChange={(e) => setSum(e.target.value)}
                style={{ marginBottom: "10px" }}
            />
            <TextField
                label="Category"
                select
                fullWidth
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                style={{ marginBottom: "10px" }}
            >
                {categories.map((cat) => (
                    <MenuItem key={cat} value={cat}>
                        {cat}
                    </MenuItem>
                ))}
            </TextField>
            <TextField
                label="Description"
                fullWidth
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                style={{ marginBottom: "10px" }}
            />
            <Button variant="contained" color="primary" onClick={handleAddCost}>
                Add Cost
            </Button>
        </>
    );
};

export default CostForm;

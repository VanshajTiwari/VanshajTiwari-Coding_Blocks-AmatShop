import { FormControl,InputLabel,MenuItem,Select } from "@mui/material"
import { useState } from "react";
import LineGraph from "./lineGraph";
export default function SelectWiseCategory(){
    const [duration,setDuration]=useState("");
    function handleChange(e){
        console.log(e);
        setDuration(e);
    }

    return(
        <div>
        <FormControl className="w-[220px]">
        <InputLabel id="demo-simple-select-label">Duration</InputLabel>
        <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={duration}
            label="Age"
            onChange={(e)=>handleChange(e.target.value)}
        >
            <MenuItem value="hourly">Hour</MenuItem>
            <MenuItem value="day">Day</MenuItem>
            <MenuItem value="monthly">Monthly</MenuItem>
            <MenuItem value="yearly">Yearly</MenuItem>
        </Select>
        </FormControl>
        <LineGraph width={1300} height={300} type={duration}/>
        </div>
    )
}
import { useEffect, useState } from "react";
import axios from "axios";
import envVars from "../../config/config.js";
import AnalyticContainer from './analyticsContainer.jsx'

const AnalyticsDashboard = () => {
    const [data, setData] = useState(null);
    const backendurl = envVars.VITE_BASE_URL;
    useEffect(() => {
        axios.get(`${backendurl}/dashboard`)
            .then(response => {
                setData(response.data)
            })
            .catch(error => console.error("Error fetching analytics:", error));
    }, []);

    return (
        data && <AnalyticContainer data={data} />
    )
};

export default AnalyticsDashboard;

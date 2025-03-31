import { useEffect, useState } from "react";
import axios from "axios";
import GenderChart from "./GenderChart.jsx";
import BranchChart from "./BranchChart.jsx";
import CGPAChart from "./CGPAChart.jsx";
import DistrictChart from './DistrictChart.jsx'

const AnalyticsDashboard = () => {
    const [data, setData] = useState(null);
    const backendurl = "http://localhost:3000"
    useEffect(() => {
        axios.get(`${backendurl}/dashboard`)
            .then(response => {
                setData(response.data)
                console.log(response);
            })
            .catch(error => console.error("Error fetching analytics:", error));
    }, []);

    return (
        <div className="p-6">
            <h1 className="text-3xl font-bold">R20 Batch Analytics</h1>
            {data ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
                    <GenderChart data={data.genderStats} />
                    <BranchChart data={data.branchStats} />
                    <CGPAChart data={data.cgpaStats} />
                    <DistrictChart data={data.districtStats} />
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
};

export default AnalyticsDashboard;

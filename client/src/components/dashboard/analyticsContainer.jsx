import {
    GenderChart,
    BranchChart,
    CGPAStatsChart,
    DistrictChart,
    CasteChart,
    BestStreamCard,
    AvgCGPAByBranchChart,
  } from './AnalyticsCharts.jsx';
  
  function App({ data }) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4 p-4">
        <GenderChart data={data.genderStats} />
        <BranchChart data={data.branchStats} />
        <CGPAStatsChart data={data.cgpaStats} />
        <DistrictChart data={data.districtStats} />
        <CasteChart data={data.casteStats} />
        <BestStreamCard data={data.bestStream} />
        <AvgCGPAByBranchChart data={data.avgCGPAByBranch} />
      </div>
    );
  }
  
  export default App;
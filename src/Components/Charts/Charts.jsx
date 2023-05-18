import React from "react";
import CitasChart from "./CitasChart";
import Demographics from "./DemographicsChart";
import FirstVisitsChart from "./FirstVisitChart";
import FirstVisitsProgress from "./FirstVisitChart";
import GenderChart from "./GenderChart";
import AgeRangeChart from "./AgeRangeChart";
import MostCommonTreatmentsChart from "./MostCommonTto";

const Charts = () => {
  return (
    <>
      <MostCommonTreatmentsChart />
      <br />
      <br />
      <FirstVisitsProgress />
      {/* <Demographics/> */}
      <br />
      <br />
      <CitasChart />
      <br />
      <br />

      <AgeRangeChart />
      <br />
      <br />
      <GenderChart />
    </>
  );
};

export default Charts;

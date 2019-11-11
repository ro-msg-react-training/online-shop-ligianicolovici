import React from "react";
import { ISales } from "../../model/Interfaces";
import HighchartsReact from "highcharts-react-official";
import Highcharts from "highcharts";

export interface IDumbChart {
  chartType: string;
  sales: ISales[];
  isLoading: boolean;
}
export const ChartMaker = (props: IDumbChart) => {
  let chartConstruction = () => {
    const options: any = {
      chart: {
        plotBackgroundColor: null,
        plotBorderWidth: null,
        plotShadow: false,
        type: props.chartType
      },
      title: {
        text: "Product sales for 2019"
      },
      tooltip: {
        valueDecimals: 2,
        valuePrefix: "$"
      },
      plotOptions: {
        pie: {
          allowPointSelect: true,
          cursor: "pointer",
          dataLabels: {
            enabled: true,
            format: "<b>{point.name}</b> {point.percentage:.1f}% "
          }
        }
      },
      xAxis: {
        categories: [...props.sales].map((sale, key) => [sale.category])
      },
      series: [
        {
          name: "Sales for 2019",
          colorByPoint: true,
          data: [...props.sales].map((sale, key) => ({
            name: sale.category,
            y: sale.sales
          }))
        }
      ]
    };
    return (
      <div>
        <HighchartsReact key={props.chartType} highcharts={Highcharts} options={options} />
      </div>
    );
  };
  return <div>{chartConstruction()}</div>;
};

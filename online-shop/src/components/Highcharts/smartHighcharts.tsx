import React from "react";
import { Dispatch } from "redux";
import { fetchCurrentSales, changeChart } from "../../actions/highChartActions";
import { connect } from "react-redux";
import { AppState } from "../../reducers/combine";
import { ISales } from "../../model/Interfaces";
import { NavMaker, IDumbBar } from "./dumbBar";
import { ChartMaker, IDumbChart } from "./dumbChart";
import "../../productModeling/chart.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faChartPie } from "@fortawesome/free-solid-svg-icons";

library.add(faChartPie);

interface HighchartProps {
  fetchSales: () => void;
  changeChart: (chartType: string) => void;
  sales: ISales[];
  isLoading: boolean;
  chartType: string;
}

export class HighChartComponent extends React.Component<HighchartProps> {
  constructor(props: HighchartProps) {
    super(props);
  }

  callLoadSales() {
    this.props.fetchSales();
  }
  componentDidMount() {
    this.callLoadSales();
  }
  render() {
    let dumbNavData: IDumbBar = {
      sales: this.props.sales,
      isLoading: this.props.isLoading,
      handlechangeChart: this.props.changeChart.bind(this),
      crtChartType: this.props.chartType
    };
    let dumbChartData: IDumbChart = {
      chartType: this.props.chartType,
      sales: this.props.sales,
      isLoading: this.props.isLoading
    };

    return (
      <div className="chart">
        <div className="chartContainer">
          <h1 className="subtitle is-3">
            {"Highcharts on sales "}
            <FontAwesomeIcon icon="chart-pie" color="black" />
          </h1>
          <NavMaker {...dumbNavData} />
          <ChartMaker {...dumbChartData}></ChartMaker>
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state: AppState) => ({
  sales: state.charts.data,
  isLoading: state.charts.isLoading,
  chartType: state.charts.chartType
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  fetchSales: () => dispatch(fetchCurrentSales()),
  changeChart: (chartType: string) => dispatch(changeChart(chartType))
});

const ChartInitializer = connect(
  mapStateToProps,
  mapDispatchToProps
)(HighChartComponent);
export default ChartInitializer;

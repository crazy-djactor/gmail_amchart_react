import React, {useEffect} from 'react'

import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import {useDidMount} from "../hook/useDidMount";
import moment from 'moment'
import {workdayCount} from '../util/util'

am4core.useTheme(am4themes_animated);

const BarTruckChart = (props: any) => {
  const initChart = () => {
    let chart = am4core.create("chartdiv_bar", am4charts.XYChart);
// Create axes
    let categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
    categoryAxis.dataFields.category = "truck";
    // categoryAxis.title.text = "Local country offices";
    categoryAxis.renderer.grid.template.location = 0;
    categoryAxis.renderer.minGridDistance = 20;
    let label = categoryAxis.renderer.labels.template;
    label.wrap = true;
    label.maxWidth = 80;

    //First value axis
    let  valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
    valueAxis.title.text = "percent";
    valueAxis.min = 0;
    valueAxis.max = 100;
    valueAxis.calculateTotals = true;
    valueAxis.strictMinMax = true;

    // Second value axis
    let valueAxis2 = chart.yAxes.push(new am4charts.ValueAxis());
    valueAxis2.title.text = "count";
    valueAxis2.renderer.opposite = true;

    chart.colors.list = [
      am4core.color("#845EC2"),
      am4core.color("#FF6F91"),
      am4core.color("#F9F871"),
    ];

    chart.maskBullets = false

    if (props.chartData.hasOwnProperty('truckData') && Object.keys(props.chartData.truckData).length > 0)
    {
      let trucks = [], truckData
      let weekDays = workdayCount(props.startDate,props.endDate)
      truckData = props.chartData.truckData
      Object.keys(truckData).forEach(truckKey => {
        trucks.push({truck: truckKey, count: truckData[truckKey].count, durationPossible: (480*weekDays - truckData[truckKey].duration),
          durationImpos: (truckData[truckKey].duration)})
      })

      chart.data = trucks
      // Create series
      let series = chart.series.push(new am4charts.ColumnSeries())
      series.dataFields.valueY = "durationPossible"
      series.dataFields.categoryX = "truck"
      series.name = "AvailableTime"
      series.tooltipText = "{name}: [bold]{valueY}[/]"
      series.stacked = true
      series.dataFields.valueYShow = "totalPercent"

      let valueLabel = series.bullets.push(new am4charts.LabelBullet())
      valueLabel.label.text = "{valueY.totalPercent.formatNumber('#.00')}%"
      valueLabel.label.verticalCenter = "bottom"
      // valueLabel.label.maxWidth = 120;
      valueLabel.label.truncate = false
      // valueLabel.label.hideOversized = false;

      let series2 = chart.series.push(new am4charts.ColumnSeries())
      series2.dataFields.valueY = "durationImpos"
      series2.dataFields.categoryX = "truck"
      series2.name = "ImpossibleTime"
      series2.tooltipText = "{name}: [bold]{valueY}[/]"
      series2.stacked = true
      series2.dataFields.valueYShow = "totalPercent"

      let series3 = chart.series.push(new am4charts.ColumnSeries())
      series3.dataFields.valueY = "count"
      series3.dataFields.categoryX = "truck"
      series3.name = "count"
      series3.tooltipText = "{name}: [bold]{valueY}[/]"
      // series3.dataFields.valueYShow = "totalPercent";
      series3.yAxis = valueAxis2
    }

// Add cursor
    chart.cursor = new am4charts.XYCursor();
  }

  useDidMount(async () => {
    initChart();
  });


  useEffect(() => {
    // changeData();
    console.log(props.chartData)
    initChart();
  });

  return (
    <div id="chartdiv_bar" style={{width: "100%", height: "400px"}}>
    </div>
  );

};

export default BarTruckChart;

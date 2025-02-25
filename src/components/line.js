import React, {useEffect, useState} from 'react';

import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import {useDidMount} from "../hook/useDidMount";

am4core.useTheme(am4themes_animated);

const LineChart = (props: any) => {
  const initChart = () => {
    let chart = am4core.create("chartdiv_line", am4charts.XYChart);
    chart.paddingRight = 20;

// Create axes
    let dateAxis = chart.xAxes.push(new am4charts.DateAxis());
    dateAxis.renderer.minGridDistance = 20;
    dateAxis.renderer.grid.template.location = 0.5
    dateAxis.startLocation = 0.5;
    dateAxis.endLocation = 0.5;
    chart.legend = new am4charts.Legend();
// Create value axis
    let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());

// Create series
//     {reason: {date_data: [date: "", value: x], truck: [], count:x}}
    if (props.chartData.hasOwnProperty('reasonData') && Object.keys(props.chartData.reasonData).length > 0)
    {
      let reasonData = props.chartData.reasonData
      console.log(Object.keys(reasonData))
      Object.keys(reasonData).forEach(reasonKey => {
        console.log(reasonKey)
        console.log(reasonData[reasonKey])
        let new_series = chart.series.push(new am4charts.LineSeries());
        new_series.data = reasonData[reasonKey].dateData;
        new_series.dataFields.valueY = "value"
        new_series.dataFields.dateX = "date"
        new_series.strokeWidth = 3
        new_series.tensionX = 0.8
        new_series.name = reasonKey;
        new_series.tooltipText = "{name}: [bold]{valueY}[/]";
        // new_series.stroke = am4core.color("#e01292");
        new_series.bullets.push(new am4charts.CircleBullet());
      })
    }

    chart.cursor = new am4charts.XYCursor();
  };

  useDidMount(async () => {
    initChart();
  });


  useEffect(() => {
    // changeData();
    initChart();
  });


  return (
      <div id="chartdiv_line" style={{width: "100%", height: "400px"}}>
      </div>
  );
};

export default LineChart;


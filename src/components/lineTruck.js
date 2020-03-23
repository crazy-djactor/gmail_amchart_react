import React, {useEffect, useState} from 'react';

import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import {useDidMount} from "../hook/useDidMount";

am4core.useTheme(am4themes_animated);

const LineTruckChart = (props: any) => {
  const initChart = () => {
    let chart = am4core.create("chartdiv_truckline", am4charts.XYChart);
    chart.paddingRight = 20;

// Create axes
    let categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
    categoryAxis.dataFields.category = "truck";
    // categoryAxis.title.text = "Local country offices";
    categoryAxis.renderer.grid.template.location = 0;
    categoryAxis.renderer.minGridDistance = 20;

    chart.legend = new am4charts.Legend();
// Create value axis
    let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());

// Create series
//     {reason: {date_data: [date: "", value: x], truck: [], count:x}}
    if (props.chartData.hasOwnProperty('truckData') && Object.keys(props.chartData.truckData).length > 0)
    {
      //truckData = {"$truck": {count:, duration: }}
      let truckData = props.chartData.truckData
      let chartData = []
      Object.keys(truckData).forEach(truck => {
        chartData.push({
          truck: truck,
          count: truckData[truck].count
        })
      })
      chart.data=chartData
      let new_series = chart.series.push(new am4charts.LineSeries());
      new_series.dataFields.valueY = "count";
      new_series.dataFields.categoryX = "truck";
      new_series.strokeWidth = 3;
      new_series.tensionX = 0.8;
      new_series.name = "TruckData";
      new_series.tooltipText = "{name}: [bold]{valueY}[/]";
      // new_series.stroke = am4core.color("#e01292");
      new_series.bullets.push(new am4charts.CircleBullet());
    }
    chart.cursor = new am4charts.XYCursor();
  };

  useDidMount(async () => {
    initChart();
  });


  useEffect(() => {
    // changeData();
    console.log(props.chartData)
    initChart();
  });


  return (
        <div id="chartdiv_truckline" style={{width: "100%", height: "400px"}}>
        </div>
  );
};

export default LineTruckChart;


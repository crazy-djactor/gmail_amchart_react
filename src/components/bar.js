import React, {useEffect} from 'react'

import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import {useDidMount} from "../hook/useDidMount";

am4core.useTheme(am4themes_animated);

const BarChart = (props: any) => {
  const initChart = () => {
    let chart = am4core.create("chartdiv_bar", am4charts.XYChart);

// Create axes
    let categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
    categoryAxis.dataFields.category = "reason";
    // categoryAxis.title.text = "Local country offices";
    categoryAxis.renderer.grid.template.location = 0;
    categoryAxis.renderer.minGridDistance = 20;
    let label = categoryAxis.renderer.labels.template;
    label.wrap = true;
    label.maxWidth = 80;

    //First value axis
    let valueAxis2 = chart.yAxes.push(new am4charts.ValueAxis());
    valueAxis2.title.text = "count";
    // valueAxis2.renderer.opposite = true;

    chart.colors.list = [
      am4core.color("#845EC2"),
      am4core.color("#FF6F91"),
      am4core.color("#F9F871"),
    ];

    chart.maskBullets = false

    if (props.chartData.hasOwnProperty('reasonData') && Object.keys(props.chartData.reasonData).length > 0)
    {
      let chartData = [], i
      let maxCount = 0
      let reasonData = props.chartData.reasonData
      Object.keys(reasonData).forEach(reasonKey => {
        let newData = {
          "reason": reasonKey,
          "count": props.chartData.reasonData[reasonKey].count,
        }
        if (maxCount < newData.count)
            maxCount = newData.count
        chartData.push(newData)
      })

      chart.data = chartData
      // Create series
      let series = chart.series.push(new am4charts.ColumnSeries());
      series.dataFields.valueY = "count";
      series.dataFields.categoryX = "reason";
      series.name = "count"
      series.tooltipText = "{name}: [bold]{valueY}[/]";
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

export default BarChart;

import React from 'react';

import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import {useDidMount} from "../hook/useDidMount";

am4core.useTheme(am4themes_animated);

const BarChart = () => {
  useDidMount(async () => {
    let chart = am4core.create("chartdiv_bar", am4charts.XYChart);
    chart.data = [{
      "reason": "incorrect values provided",
      "time1": 5,
      "time2": 3,
      "count" : 30,
    }, {
      "reason": "broken server",
      "time1": 1,
      "time2": 22,
      "count" : 24,
    }, {
      "reason": "bracket removed",
      "time1": 2,
      "time2": 9,
      "count" : 20,
    }, {
      "reason": "unknown",
      "time1": 1,
      "time2": 8,
      "count" : 19,
    }, {
      "reason": "sensor testing",
      "time1": 1,
      "time2": 5,
      "count" : 73,
    }, {
      "country": "sensor was moved",
      "time1": 3,
      "time2": 5,
      "count" : 59,
    },
    ];

// Create axes
    var categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
    categoryAxis.dataFields.category = "reason";
    // categoryAxis.title.text = "Local country offices";
    categoryAxis.renderer.grid.template.location = 0;
    categoryAxis.renderer.minGridDistance = 20;
    let label = categoryAxis.renderer.labels.template;
    label.wrap = true;
    label.maxWidth = 80;

    //First value axis
    var  valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
    valueAxis.title.text = "Time";
    valueAxis.min = 0;
    valueAxis.max = 100;
    valueAxis.calculateTotals = true;
    valueAxis.strictMinMax = true;

    // Second value axis
    let valueAxis2 = chart.yAxes.push(new am4charts.ValueAxis());
    valueAxis2.title.text = "cause";
    valueAxis2.renderer.opposite = true;

    chart.colors.list = [
      am4core.color("#845EC2"),
      am4core.color("#FF6F91"),
      am4core.color("#F9F871"),
    ];

    chart.maskBullets = false

// Create series
    var series = chart.series.push(new am4charts.ColumnSeries());
    series.dataFields.valueY = "time1";
    series.dataFields.categoryX = "reason";
    series.name = "time1";
    series.tooltipText = "{name}: [bold]{valueY}[/]";
    series.stacked = true;
    series.dataFields.valueYShow = "totalPercent";

    let valueLabel = series.bullets.push(new am4charts.LabelBullet());
    valueLabel.label.text = "{valueY.totalPercent.formatNumber('#.00')}%";
    valueLabel.label.verticalCenter = "bottom";
    // valueLabel.label.maxWidth = 120;
    valueLabel.label.truncate = false;
    // valueLabel.label.hideOversized = false;

    var series2 = chart.series.push(new am4charts.ColumnSeries());
    series2.dataFields.valueY = "time2";
    series2.dataFields.categoryX = "reason";
    series2.name = "time2";
    series2.tooltipText = "{name}: [bold]{valueY}[/]";
    series2.stacked = true;
    series2.dataFields.valueYShow = "totalPercent";

    var series3 = chart.series.push(new am4charts.ColumnSeries());
    series3.dataFields.valueY = "count";
    series3.dataFields.categoryX = "reason";
    series3.name = "count";
    series3.tooltipText = "{name}: [bold]{valueY}[/]";
    // series3.dataFields.valueYShow = "totalPercent";
    series3.yAxis = valueAxis2;
// Add cursor
    chart.cursor = new am4charts.XYCursor();
  });

  return (
    <div id="chartdiv_bar" style={{width: "100%", height: "400px"}}>
    </div>
  );

};

export default BarChart;

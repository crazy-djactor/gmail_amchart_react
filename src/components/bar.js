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
      "country": "incorrect values provided",
      "research": 5,
      // "marketing": 250,
      // "sales": 199
    }, {
      "country": "broken server",
      "research": 1,
      // "marketing": 222,
      // "sales": 251
    }, {
      "country": "bracket removed",
      "research": 2,
      // "marketing": 170,
      // "sales": 199
    }, {
      "country": "unknown",
      "research": 1,
      // "marketing": 122,
      // "sales": 90
    }, {
      "country": "sensor testing",
      "research": 1,
      // "marketing": 99,
      // "sales": 252
    }, {
      "country": "sensor was moved",
      "research": 3,
      // "marketing": 85,
      // "sales": 84
    },
    ];

// Create axes
    var categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
    categoryAxis.dataFields.category = "country";
    // categoryAxis.title.text = "Local country offices";
    categoryAxis.renderer.grid.template.location = 0;
    categoryAxis.renderer.minGridDistance = 20;
    let label = categoryAxis.renderer.labels.template;
    label.wrap = true;
    label.maxWidth = 80;

    var  valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
    valueAxis.title.text = "Expenditure (M)";

// Create series
    var series = chart.series.push(new am4charts.ColumnSeries());
    series.dataFields.valueY = "research";
    series.dataFields.categoryX = "country";
    series.name = "Research";
    series.tooltipText = "{name}: [bold]{valueY}[/]";
    series.stacked = true;

    var series2 = chart.series.push(new am4charts.ColumnSeries());
    series2.dataFields.valueY = "marketing";
    series2.dataFields.categoryX = "country";
    series2.name = "Marketing";
    series2.tooltipText = "{name}: [bold]{valueY}[/]";
    series2.stacked = true;

    var series3 = chart.series.push(new am4charts.ColumnSeries());
    series3.dataFields.valueY = "sales";
    series3.dataFields.categoryX = "country";
    series3.name = "Sales";
    series3.tooltipText = "{name}: [bold]{valueY}[/]";
    series3.stacked = true;

// Add cursor
    chart.cursor = new am4charts.XYCursor();
  });

  return (
    <div id="chartdiv_bar" style={{width: "100%", height: "400px"}}>
    </div>
  );

};

export default BarChart;

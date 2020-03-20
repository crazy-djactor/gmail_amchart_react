import React from 'react';

import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import {useDidMount} from "../hook/useDidMount";

am4core.useTheme(am4themes_animated);

const LineChart = () => {
  useDidMount(async () => {
    var chart = am4core.create("chartdiv_line", am4charts.XYChart);
    chart.paddingRight = 20;

// Create axes
    var dateAxis = chart.xAxes.push(new am4charts.DateAxis());
    dateAxis.renderer.minGridDistance = 50;
    dateAxis.renderer.grid.template.location = 0.5;
    dateAxis.startLocation = 0.5;
    dateAxis.endLocation = 0.5;

// Create value axis
    var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());

// Create series
    var series0 = chart.series.push(new am4charts.LineSeries());
    series0.dataFields.valueY = "value";
    series0.dataFields.dateX = "date";
    series0.strokeWidth = 3;
    series0.tensionX = 0.8;
    series0.stroke = am4core.color("#e01292");
    series0.bullets.push(new am4charts.CircleBullet());
    series0.data = [{
      "date": new Date(2020, 0),
      "value": 95
    }, {
      "date": new Date(2020,1),
      "value": -30
    }, {
      "date": new Date(2020,2),
      "value": 20
    }, {
      "date": new Date(2020,3),
      "value": 18
    }, {
      "date": new Date(2020, 4),
      "value": 80
    },{
        "date": new Date(2020, 5),
        "value": -50
    },{
        "date": new Date(2020, 6),
        "value": -30
    }];

    var series1 = chart.series.push(new am4charts.LineSeries());
    series1.dataFields.valueY = "value";
    series1.dataFields.dateX = "date";
    series1.strokeWidth = 3;
    series1.tensionX = 0.8;
    series1.bullets.push(new am4charts.CircleBullet());
    series1.data = [{
      "date": new Date(2020, 0),
      "value": 60
    }, {
      "date": new Date(2020, 1),
      "value": 35
    }, {
      "date": new Date(2020, 2),
      "value": 18
    }, {
      "date": new Date(2020, 3),
      "value": 0
    },
    {
      "date": new Date(2020, 4),
      "value": 90
    },
    {
      "date": new Date(2020, 5),
      "value": -50
    },
    {
      "date": new Date(2020, 6),
      "value": -40
    }];

    var series2 = chart.series.push(new am4charts.LineSeries());
    series2.dataFields.valueY = "value";
    series2.dataFields.dateX = "date";
    series2.strokeWidth = 3;
    series2.tensionX = 0.8;
    series2.bullets.push(new am4charts.CircleBullet());
    series2.data = [{
      "date": new Date(2020, 0),
      "value": 38
    }, {
      "date": new Date(2020, 1),
      "value": -90
    }, {
      "date": new Date(2020, 2),
      "value": -60
    }, {
      "date": new Date(2020, 3),
      "value": 40
    }, {
      "date": new Date(2020, 4),
      "value": 60
    },  {
      "date": new Date(2020, 5),
      "value": 80
    }, {
      "date": new Date(2020, 6),
      "value": 75
    }];



    chart.cursor = new am4charts.XYCursor();

  });

  return (
        <div id="chartdiv_line" style={{width: "100%", height: "400px"}}>
        </div>
  );
};

export default LineChart;


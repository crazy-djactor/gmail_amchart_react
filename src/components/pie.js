import React, {useEffect, useState} from 'react'
import {useDidMount} from '../hook/useDidMount';
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import * as am4plugins_sliceGrouper from "@amcharts/amcharts4/plugins/sliceGrouper";

import am4themes_animated from "@amcharts/amcharts4/themes/animated";
am4core.useTheme(am4themes_animated);

const PieChart = (props: any) => {
	const [chartObj, setchartObj] = useState(null);
	const initChart = () => {
		var chartObj = am4core.create("chartdiv_pie", am4charts.PieChart);
		chartObj.data = props.chartData;
		// Add and configure Series
		var pieSeries = chartObj.series.push(new am4charts.PieSeries());
		pieSeries.dataFields.value = "litres";
		pieSeries.dataFields.category = "country";
		pieSeries.dataFields.vehicle = "vehicle";

    	pieSeries.labels.template.wrap = true;
    	pieSeries.labels.template.maxWidth = 120;

		pieSeries.labels.template.paddingLeft = 0;
		pieSeries.labels.template.paddingRight = 0;
		pieSeries.labels.template.paddingTop = 0;
		pieSeries.labels.template.paddingBottom = 0;

		pieSeries.slices.template.tooltipText = "{category}: {vehicle}"

		let grouper = pieSeries.plugins.push(new am4plugins_sliceGrouper.SliceGrouper());
		grouper.threshold = 5;
		grouper.groupName = "Other";
		grouper.clickBehavior = "zoom";

		// Let's cut a hole in our Pie chart the size of 40% the radius
		chartObj.radius = am4core.percent(80);
		chartObj.innerRadius = am4core.percent(40);
		setchartObj(chartObj);
	}

	const changeData = () => {
		if (chartObj != null)
			chartObj.data = props.chartData;
	};

	useDidMount(async () => {
		initChart();
	});

	useEffect(() => {
		changeData();
	});

	return (
		<div id="chartdiv_pie" style={{width: "100%", height: "400px"}}>
		</div>
	);
};

export default PieChart;
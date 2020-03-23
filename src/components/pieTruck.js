import React, {useEffect, useState} from 'react'
import {useDidMount} from '../hook/useDidMount';
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import * as am4plugins_sliceGrouper from "@amcharts/amcharts4/plugins/sliceGrouper";

import am4themes_animated from "@amcharts/amcharts4/themes/animated";
am4core.useTheme(am4themes_animated);

const PieTruckChart = (props: any) => {
	const [chartObj, setchartObj] = useState(null);
	const initChart = () => {
		let chartObj = am4core.create("chartdiv_pie", am4charts.PieChart);
		// Add and configure Series
		let pieSeries = chartObj.series.push(new am4charts.PieSeries());

		pieSeries.dataFields.value = "count";
		pieSeries.dataFields.vehicle = "truck";

		pieSeries.labels.template.wrap = true;
		pieSeries.labels.template.maxWidth = 80;

		pieSeries.labels.template.paddingLeft = 0;
		pieSeries.labels.template.paddingRight = 0;
		pieSeries.labels.template.paddingTop = 0;
		pieSeries.labels.template.paddingBottom = 0;

		pieSeries.slices.template.tooltipText = "{vehicle}:{count}"

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
		if (chartObj != null) {

			if (props.chartData.hasOwnProperty('trackData') &&
				Object.keys(props.chartData.trackData).length > 0){
				let newData = []
				let trackData = props.chartData.trackData
				Object.keys(trackData).forEach(truckKey => {
					let newObj = {
						"truck": truckKey,
						"count": trackData[truckKey].count,
					}
					newData.push(newObj)
				})
				chartObj.data = newData
			}


		}
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

export default PieTruckChart;
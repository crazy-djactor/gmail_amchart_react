import React, {useEffect, useState} from 'react'
import axios from 'axios';
import "react-dates/initialize";
import "react-dates/lib/css/_datepicker.css";
import moment from 'moment';

import BarChart from '../components/bar';
import LineChart from '../components/line';
import PieChart from "../components/pie";
import PresetDateRangePicker from "../components/PresetDateRangePicker";
// import DateRangePicker from "react-dates";


const Gchart = () => {
  const [startDate, setStartDate] = useState(null);
  const [data, setData] = useState({ hits: [] });
  const [endDate, setEndDate] = useState(null);
  const [focusedInput, setFocusedInput] = useState(null);
  const handleDatesChange = ({ startDate, endDate }) => {
    setStartDate(startDate);
    setEndDate(endDate);
    setFocusedInput(null);
  };

  const today = moment();
  const tomorrow = moment().add(1, 'day');
  const presets = [{
    text: 'Today',
    start: today,
    end: today,
  },
  {
    text: 'Tomorrow',
    start: tomorrow,
    end: tomorrow,
  },
  {
    text: 'Next Week',
    start: today,
    end: moment().add(1, 'week'),
  },
  {
    text: 'Next Month',
    start: today,
    end: moment().add(1, 'month'),
  }];

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios(
        'https://hn.algolia.com/api/v1/search?query=redux',
      );
      // setData(result.data);
      setData([{
        "country": "sensor was moved",
        "litres": 501.9,
        "vehicle": ["A1", "A2"],
      }, {
        "country": "sensor testing",
        "litres": 301.9,
        "vehicle": ["B1", "B2"],
      }, {
        "country": "unknown",
        "litres": 201.1,
        "vehicle": ["C1", "C2"],
      }, {
        "country": "bracket removed",
        "litres": 165.8,
        "vehicle": ["D1", "D2"],
      }, {
        "country": "broken server",
        "litres": 139.9,
        "vehicle": ["E1", "E2"],
      }, {
        "country": "incorrect values provided",
        "litres": 128.3,
        "vehicle": ["F1", "F2"],
      },
      ]);
    };
    fetchData();
  }, [endDate]);

  return (
    <div className={"container-sm"}>
      <div className={"d-flex justify-content-center pt-2"}>
        <PresetDateRangePicker
          startDate={startDate}
          startDateId="tata-start-date"
          endDate={endDate}
          endDateId="tata-end-date"
          onDatesChange={handleDatesChange}
          focusedInput={focusedInput}
          onFocusChange={focusedInput => {setFocusedInput(focusedInput);}}
          presets={presets}
          autoFocus
        />
      </div>
      <div className={"row"}>
        <LineChart chartData={data}/>
      </div>
      <div className={"row"}>
        <div className={"col-6"}>
            <BarChart chartData={data}/>
        </div>
        <div className={"col-6"}>
            <PieChart chartData={data}/>
        </div>
      </div>
    </div>
  );
}


export default Gchart;

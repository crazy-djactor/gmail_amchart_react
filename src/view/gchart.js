import React, {useEffect, useState} from 'react'
import axios from 'axios';
import "react-dates/initialize";
import { DateRangePicker } from "react-dates";
import "react-dates/lib/css/_datepicker.css";

import BarChart from '../components/bar';
import LineChart from '../components/line';
import PieChart from "../components/pie";


const Gchart = () => {
  const [startDate, setStartDate] = useState(null);
  const [data, setData] = useState({ hits: [] });
  const [endDate, setEndDate] = useState(null);
  const [focusedInput, setFocusedInput] = useState(null);
  const handleDatesChange = ({ startDate, endDate }) => {
    setStartDate(startDate);
    setEndDate(endDate);
  };

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
  }, [endDate])

  return (
    <div className={"container-sm"}>
      <DateRangePicker
        startDate={startDate}
        startDateId="tata-start-date"
        endDate={endDate}
        endDateId="tata-end-date"
        onDatesChange={handleDatesChange}
        focusedInput={focusedInput}
        onFocusChange={focusedInput => setFocusedInput(focusedInput)}
      />
      <div className={"row"}>
        <LineChart />
      </div>
      <div className={"row"}>
        <div className={"col-5"}>
            <BarChart />
        </div>
        <div className={"col-7"}>
            <PieChart chartData={data}/>
        </div>
      </div>
    </div>
  );
}


export default Gchart;

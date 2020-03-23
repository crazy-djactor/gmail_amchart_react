import React, {useEffect, useState} from 'react'
import axios from 'axios'
import 'react-dates/initialize'
import 'react-dates/lib/css/_datepicker.css'
import moment from 'moment'
import {getData} from '../util/util'
import BarChart from '../components/bar'
import LineChart from '../components/line'
import PieChart from '../components/pie'
import PresetDateRangePicker from '../components/PresetDateRangePicker'
import {useDidMount} from '../hook/useDidMount'
import LineTruckChart from '../components/lineTruck'
import BarTruckChart from '../components/barTruck'
import PieTruckChart from '../components/pieTruck'
// import DateRangePicker from "react-dates";


const Gchart = () => {
  const [startDate, setStartDate] = useState(null)
  const [data, setData] = useState({})
  const [endDate, setEndDate] = useState(null)
  const [focusedInput, setFocusedInput] = useState(null)
  const handleDatesChange = ({startDate, endDate}) => {
    setStartDate(startDate)
    setEndDate(endDate)
    setFocusedInput(null)
  }

  const today = moment()
  const presets = [{
    text: 'Today',
    start: today,
    end: today
  },
    {
      text: 'This Week',
      start: today,
      end: today.add(1, 'week')
    },
    {
      text: 'This Month',
      start: today,
      end: today.add(1, 'month')
    },
    {
      text: 'This Year',
      start: today,
      end: today.add(1, 'year')
    },
    {
      text: 'All',
      start: today,
      end: today.add(1, 'year')
    }
  ]

  useDidMount(async () => {
    setStartDate(moment('2019-07-01'))
    setEndDate(moment('2019-07-03'))
  })
  useEffect(() => {
    const fetchData = async () => {
      const result = axios.get('/api/data/', {
        params: {
          start: startDate.format('YYYY-MM-DD'),
          end: endDate.format('YYYY-MM-DD')
        }
      })
        .then(function (response) {
          let sData = getData(response.data, startDate.format('YYYY-MM-DD'), endDate.format('YYYY-MM-DD'))
          setData(sData)
          setStartDate(response.data.startDate)
          setEndDate(response.data.endDate)
        })
        .catch(function (error) {
          console.log(error)
        })

      // setData(result.data);

    }
    if (startDate != null && endDate != null)
      fetchData()
  }, [endDate])

  return (
    <div className={'container-sm'}>
      <div className={'d-flex justify-content-center pt-2'}>
        <PresetDateRangePicker
          startDate={startDate}
          startDateId="tata-start-date"
          endDate={endDate}
          endDateId="tata-end-date"
          onDatesChange={handleDatesChange}
          displayFormat={() => 'YYYY-MM-DD'}
          focusedInput={focusedInput}
          onFocusChange={focusedInput => {
            setFocusedInput(focusedInput)
          }}
          presets={presets}
          autoFocus
        />
      </div>
      <div className={'row'}>
        <LineChart chartData={data} startDate={startDate} endDate={endDate}/>
      </div>
      <div className={'row'}>
        <div className={'col-6'}>
          <BarChart chartData={data} startDate={startDate} endDate={endDate}/>
        </div>
        <div className={'col-6'}>
          <PieChart chartData={data} startDate={startDate} endDate={endDate}/>
        </div>
      </div>
      <div className={'row'}>
        <LineTruckChart chartData={data} startDate={startDate}
                        endDate={endDate}/>
      </div>
      <div className={'row'}>
        <div className={'col-6'}>
          <BarTruckChart chartData={data} startDate={startDate}
                         endDate={endDate}/>
        </div>
        <div className={'col-6'}>
          <PieTruckChart chartData={data} startDate={startDate}
                         endDate={endDate}/>
        </div>
      </div>
    </div>
  )
}


export default Gchart

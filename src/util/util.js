import moment from 'moment'

function push_notexist(data_array, item) {
  let i = 0
  for (i = 0; i < data_array.length; i ++){
    if (data_array[i] === item)
      return
  }
  data_array.push(item)
}

export function getData(data, startDate, endDate){
  let countData = data["count"]
  let duration = data["duration"]
  let reasonData = {}
  let truckData = {}
  let minDate, maxDate
  let indx = 0
  //reasonData = {"$reason":{date_data: [date: "", value: x], truck: [], count:x}}
  //truckData = {"$truck": {count:, duration: }}

  minDate = moment(startDate)
  maxDate = moment(endDate)

  for (indx = 0; indx < countData.length; indx ++) {
    let item = countData[indx]
    if (reasonData[item.reason] === undefined) {
      let newobj = {date: item.report_date, value: 1}
      reasonData[item.reason] = {}
      reasonData[item.reason].dateData = []
      reasonData[item.reason].dateData.push(newobj)
      reasonData[item.reason].count = 1;
      reasonData[item.reason].truck = []
      reasonData[item.reason].truck.push(item.truck);
      if (truckData[item.truck] === undefined) {
        truckData[item.truck] = {count: 1}
        let eachTruck
        for (eachTruck in duration){
          if (eachTruck.truck === item.truck) {
            truckData[item.truck].duration = eachTruck.duration
            break
          }
        }
      }
      else{
        truckData[item.truck].count ++
      }

    } else {
      let i = 0, j;
      push_notexist(reasonData[item.reason].truck, item.truck)
      if (truckData[item.truck] === undefined) {
        truckData[item.truck] = {count: 1}
        let eachTruck
        for (eachTruck in duration) {
          if (eachTruck.truck === item.truck) {
            truckData[item.truck].duration = eachTruck.duration
            break
          }
        }
      }
      else{
        truckData[item.truck].count ++
      }
      for (i = 0; i < reasonData[item.reason].dateData.length; i++)
        if (reasonData[item.reason].dateData[i].date === item.report_date) {
          reasonData[item.reason].dateData[i].value++
          reasonData[item.reason].count++
          break;
        }
      if (i === reasonData[item.reason].dateData.length) {
        let newobj = {date: item.report_date, value: 1}
        reasonData[item.reason].dateData.push(newobj)
        reasonData[item.reason].count++
      }
    }
  }
  Object.keys(reasonData).forEach(reasonKey => {
    let nextDay, j
    let sortedData = []
    for (nextDay = moment(minDate); nextDay <= maxDate; nextDay = moment(nextDay).add(1, 'day') ) {
      for (j = 0; j < reasonData[reasonKey].dateData.length; j ++){
        if (moment(reasonData[reasonKey].dateData[j].date).isSame(nextDay))
          break
      }
      if (j === reasonData[reasonKey].dateData.length){
        let newobj = {date: nextDay.format('YYYY-MM-DD'), value: 0}
        sortedData.push(newobj)
      }
      else {
        sortedData.push(reasonData[reasonKey].dateData[j])
      }
    }
    reasonData[reasonKey].dateData = sortedData
  })
  console.log(reasonData)
  let retData = {
    reasonData: reasonData,
    truckData: truckData
  }
  return retData
}

export function workdayCount(sstart, send) {
  let start = moment(sstart)
  let end = moment(send)
  let first = start.endOf('week'); // end of first week
  let last = end.startOf('week'); // start of last week
  let days = last.diff(first,'days') * 5 / 7; // this will always multiply of 7
  let wfirst = first.day() - start.day(); // check first week
  if(start.day() === 0) --wfirst; // -1 if start with sunday
  let wlast = end.day() - last.day(); // check last week
  if(end.day() === 6) --wlast; // -1 if end with saturday
  return wfirst + Math.floor(days) + wlast; // get the total
} //
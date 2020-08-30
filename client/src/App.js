import React, { Component } from 'react';
import alarmsData from './resources/alarms_processed.json'
import DateSelector from './components/DateSelector/DateSelector'
import Alarm from './components/Alarm/Alarm'
import './App.css';
import 'bootstrap/dist/css/bootstrap.css'
import AlarmDialog from './components/AlarmDialog/AlarmDialog';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      alarms: alarmsData,
      date: '',
      dialogStatus: false,
      currentAlarm: {}
    }
  }

  selectDate = (date) => {
    this.setState({date})
  }

  changeStatus = (status, _id) => {
    let updatedAlarms = this.state.alarms 

    let item = updatedAlarms[this.state.date].find(alarm => (
      alarm._id === _id
    ))
    
    item.status = status

    this.setState({alarms: updatedAlarms})
  }

  toggleDialog = (_id) => {
    let item = this.state.alarms[this.state.date].find(alarm => (
      alarm._id === _id
    ))
    
    this.setState({dialogStatus: !this.state.dialogStatus, currentAlarm: item})
  }

  confirmAlarm = (id) => {
    this.changeStatus('confirmed', id)
    this.toggleDialog(id)
  }

  skipAlarm = (id) => {
    this.changeStatus('skipped', id)
    this.toggleDialog(id)
  }

  render() {
    const alarms = this.state.alarms[this.state.date];
    if (alarms) {
      return (
        <div className="App ">      
          <DateSelector selectDate={this.selectDate}/>
          <div className="container d-flex justify-content-center flex-wrap">
            <AlarmDialog confirm={this.confirmAlarm} skip={this.skipAlarm} alarm={this.state.currentAlarm} toggleDialog={this.toggleDialog} dialogStatus={this.state.dialogStatus} />

            {
              this.state.alarms[this.state.date].map(alarm => (
                <Alarm key={alarm._id} id={alarm._id} alarmTime={alarm.alarm_time} name={alarm.name} description={alarm.description} status={alarm.status} changeStatus={this.changeStatus} toggleDialog={this.toggleDialog} confirm={this.confirmAlarm} skip={this.skipAlarm}/>
              ))
            }
          </div>
        </div>
      );
    } else {
      return (
        <div className="App ">
          <DateSelector selectDate={this.selectDate}/>
          no alarms found on this date
        </div>
      )
    }    
  }
}

export default App;

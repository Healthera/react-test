import React, { Component } from 'react';
import alarmsData from './resources/alarms_processed.json'
import DateSelector from './components/DateSelector/DateSelector'
import Alarm from './components/Alarm/Alarm'
import './App.css';
import 'bootstrap/dist/css/bootstrap.css'
import logo from './resources/logo.png'
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
    this.setState({dialogStatus: false})
  }

  skipAlarm = (id) => {
    this.changeStatus('skipped', id)
    this.toggleDialog(id)
    this.setState({dialogStatus: false})
  }

  render() {
    const alarms = this.state.alarms[this.state.date];
    
    if (alarms) {

      return (
        <div className="App ">      
          <div className="container d-flex justify-content-center flex-wrap">
            <div className="d-flex flex-column align-items-center justify-content-between">
              <img className="logo" src={logo}></img>
              <div className="date-selector" > 
                <DateSelector date={this.state.date} selectDate={this.selectDate}/>
              </div>
              
            </div>
            
            <AlarmDialog confirm={this.confirmAlarm} skip={this.skipAlarm} alarm={this.state.currentAlarm} toggleDialog={this.toggleDialog} dialogStatus={this.state.dialogStatus} />

            {
              this.state.alarms[this.state.date].sort((prev, next) => prev.alarm_time === next.alarm_time ? 0 : next.alarm_time > prev.alarm_time ? -1 : 1).map(alarm => (
                <Alarm key={alarm._id} id={alarm._id} alarmTime={alarm.alarm_time} name={alarm.name} description={alarm.description} status={alarm.status} changeStatus={this.changeStatus} toggleDialog={this.toggleDialog} confirm={this.confirmAlarm} skip={this.skipAlarm}/>
              ))
            }
          </div>
        </div>
      );
    } else {
      return (
        <div className="App ">
          <div className="d-flex flex-column align-items-center justify-content-between">
              <img className="logo" src={logo}></img>
              <div className="date-selector" > 
                <DateSelector date={this.state.date} selectDate={this.selectDate}/>
              </div>
              <h1 className="text-center mt-4">No alarms found on this date.</h1>
            </div>       
        </div>
      ) 
    }    
  }
}

export default App;

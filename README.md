# Healthera Front End React Test

Build a single page React app that allows you to view a series of alarms and their related information
in a daily view that you can page through by day

## Requirements

1. Daily alarms view that allows me to see what alarms are set for a given day(displayed from the provided alarms.json file)
2. You must display the alarm name and time on this view for each alarm on that day
3. Each alarm should have a way to action confirm or skip for each alarm on this view
4. When an alarm is skipped it should show in a greyed out state and update status to skip, no further actions allowed
5. When an alarm is confirmed it should show in a completed state of your design and no further actions should be allowed
6. Detail view for alarms showing more detailed data for the alarm and available actions to confirm and skip
7. Detail view should be accessible from the daily view by an action

## Aditional Information

Data file: alarms.json
```
  {
    _id GUID
    alarm_time UNIX Timetstamp of when the alarm is set
    name Display name of the alarm
    description Detailed description of the alarm and it's details
    status Text status skip|cofirm|active - the current status of the alarm
  }
```

* You may use TypeScript or Javascript
* You may use any libraries or tools that you prefer for the task
* You may use your own prefrence of architecture and project structure
* Create a branch from the master with your name and when you have completed you will submit this branch for us to review




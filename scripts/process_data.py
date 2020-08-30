import json
from datetime import datetime


def convert_timestamp(timestamp):
    return datetime.fromtimestamp(int(timestamp))


if __name__ == '__main__':

    with open('../resources/alarms.json') as input_file:
        alarms = json.load(input_file)

    for alarm in alarms:
        date_time = convert_timestamp(alarm['alarm_time'])
        alarm['alarm_date'] = str(date_time.date())
        alarm['alarm_time'] = str(date_time.time())

    with open('../resources/alarms_processed.json', 'w') as output_file:
        json.dump(alarms, output_file)


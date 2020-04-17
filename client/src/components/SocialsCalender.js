import React from 'react';
import DateFnsUtils from '@date-io/date-fns';
import { DatePicker, MuiPickersUtilsProvider} from '@material-ui/pickers'

const styles = {
  dayWithEvent: {
    borderRadius: '25%',
    background: 'green' //todo change this color to match rest of page
  },
  dayWithoutEvent:{

  }
}


function sameDay(date1, date2){
  return (
    date1.getDate() == date2.getDate() &&
    date1.getMonth() == date2.getMonth() &&
    date1.getFullYear() == date2.getFullYear()
  );
}


function SocialsCalendar(props){
  return(
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <DatePicker
          autoOk
          variant="static"
          openTo="date"
          value={props.date}
          onChange={props.setDate}
          renderDay={(date, selectedDate, isOnMonth, dayComponent) => {
            let hasEvent = false;
            if(isOnMonth){
              for(let i = 0; i < props.events.length; i++){
                if(sameDay(props.events[i].dateAndTime, date)){
                  hasEvent = true;
                  break;
                }
              }
            }


            return(
              <div style={hasEvent ? styles.dayWithEvent : styles.dayWithoutEvent}>
                {dayComponent}
              </div>
            );
        }}
      />
    </MuiPickersUtilsProvider>
  )
}

export default SocialsCalendar;

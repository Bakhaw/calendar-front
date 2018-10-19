import React, { Component } from 'react'
import axios from 'axios';
import moment from 'moment';
import BigCalendar from 'react-big-calendar';

import 'react-big-calendar/lib/css/react-big-calendar.css';

class Calendar extends Component {

    constructor(props) {
        super(props);
        this.state = {
            calendarCards: [],
            events: [{
                title: 'Template',
                start: new Date(),
                end: new Date(),
            }],
            messages: {
                month: 'Mois',
                week: 'Semaine',
                day: 'Jour',
                today: "Aujourd'hui",
                previous: '<',
                next: '>',
                october: 'Octobre'
            }
        }
        this.localizer = BigCalendar.momentLocalizer(moment);
    }

    componentDidMount() {
      this.getCalendarCards();
    }
    

    getCalendarCards = async () => {
        const request = await axios.get('http://localhost:8090/calendar');
        const calendarCards = await request.data;

        console.log({ calendarCards })
        this.setState({ calendarCards });
    }

    render() {
        return (
            <BigCalendar culture='fr-FR'
                defaultView='month'
                endAccessor='end'
                events={this.state.calendarCards}
                localizer={this.localizer}
                messages={this.state.messages}
                onSelectEvent={() => console.log('selected')}
                startAccessor='start'
                views={['month', 'week', 'day']} />
        )
    }
}

export default Calendar;
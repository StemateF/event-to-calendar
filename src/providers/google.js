import {queryString} from '../helpers'

export default class Google {
    constructor(eventDetails) {
        console.log('google');
        this.eventDetails = eventDetails;
        console.log(this);

        this.baseUri = 'https://calendar.google.com/calendar/r/eventedit?text=Joe%27s+40th+Birthday&details=Joe+turns+40+just+this+once&dates=20111212T190000/20111212T200000&location=Gillette+Stadium&sf=true';
        this.baseUri = 'https://calendar.google.com/calendar/r/eventedit?'
    }

    get calendarUrl() {
        let params = {};

        if (typeof this.eventDetails.title !== 'undefined') {
            params.text = this.eventDetails.title
        }
        if (typeof this.eventDetails.location !== 'undefined') {
            params.location = this.eventDetails.location
        }

        if (typeof this.eventDetails.description !== 'undefined') {
            params.details = this.eventDetails.description
        }
        if (typeof this.eventDetails.timezone !== 'undefined') {
            params.ctz = this.eventDetails.timezone
        }
        if (typeof  this.eventDetails.startDate !== 'undefined') {
            params.dates = (new Date(this.eventDetails.startDate)).toISOString()
                .replace(/-|:|\.\d\d\d/g, '')
        }
        if (typeof this.eventDetails.endDate !== 'undefined') {
            params.dates += '/' + (new Date(this.eventDetails.endDate)).toISOString()
                .replace(/-|:|\.\d\d\d/g, '')
        }
        let guestsString = '';
        if (typeof this.eventDetails.guests !== 'undefined') {
            guestsString = '&';
            for (let guest in this.eventDetails.guests) {
                if (this.eventDetails.guests.hasOwnProperty(guest)) {

                    guestsString += 'add=' + this.eventDetails.guests[guest] + '&'
                }
            }
        }

        return (this.baseUri + queryString(params) + guestsString)
    }

    render() {
        return `<li><a href="${this.calendarUrl}" target="_blank" rel="nofollow">Goggle</a></li>`
    }
}

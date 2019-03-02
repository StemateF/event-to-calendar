import {AbstractProvider} from './abstractProvider'
import {oAuth} from "../helpers/oAuth";
import {stringToHtml} from "../helpers";


const authorizationEndPoint = 'https://accounts.google.com/o/oauth2/v2/auth';
const scopes = [
    'https://www.googleapis.com/auth/calendar.events',
    'https://www.googleapis.com/auth/calendar'
];
const insertEventEndPoint = 'https://www.googleapis.com/calendar/v3/calendars/primary/events';
export default class Google extends AbstractProvider {
    constructor(eventDetails, providerData) {
        super();

        this.additionalData = providerData;
        this.eventDetails = eventDetails;
        this.auth = new oAuth(
            authorizationEndPoint,
            {
                client_id: this.providerData.clientId,
                redirect_uri: 'http://localhost:8080',
                response_type: 'token',
                scope: scopes
            },
            this.storageKey
        )

    }

    static get providerName() {
        return 'google';
    }

    get providerData() {
        return this.additionalData;
    }

    /**
     * @var  stringToHtml {HTMLElement}
     */
    render() {
        let htmlElem = stringToHtml(`<li>Google</li>`);
        htmlElem.addEventListener('click', this.addEvent.bind(this));
        return htmlElem
    }

    get providerEventDetails() {
        let formatedEvent = {
            summary: this.eventDetails.title,
            description: this.eventDetails.description,
            start: {
                date: this.eventDetails.startDate,
                timezone: this.eventDetails.timezone,
            },
            end: {
                date: this.eventDetails.endDate,
                timezone: this.eventDetails.timezone,
            },
            location: this.eventDetails.location,
            source: {
                title: this.eventDetails.source.title,
                url: this.eventDetails.source.url
            },
            status: this.eventDetails.status,
            transparency: this.eventDetails.transparency,
            visibility: this.eventDetails.visibility,
            attendees: [],
            attachments: this.eventDetails.attachments,
        };
        if (typeof this.eventDetails.attendees !== "undefined" && this.eventDetails.attendees.constructor === Array) {
            this.eventDetails.attendees.forEach(attendee => {
                formatedEvent.attendees.push({
                    email: attendee.email,
                    optional: attendee.optional,
                    comment: attendee.comment,
                    responseStatus: attendee.responseStatus,
                    guestsCanInviteOthers: attendee.guestsCanInviteOthers,
                    guestsCanModify: attendee.guestsCanModify,
                    guestsCanSeeOtherGuests: attendee.guestsCanSeeOtherGuests,
                })
            })
        }

        return formatedEvent;
    }

    addEvent() {
        let event = {
            'summary': 'Google I/O 2015',
            'location': '800 Howard St., San Francisco, CA 94103',
            'description': 'A chance to hear more about Google\'s developer products.',
            'start': {
                'dateTime': '2019-03-03T09:00:00-07:00',
                'timeZone': 'America/Los_Angeles'
            },
            'end': {
                'dateTime': '2019-03-03T17:00:00-07:00',
                'timeZone': 'America/Los_Angeles'
            },
            'recurrence': [
                'RRULE:FREQ=DAILY;COUNT=2'
            ],
            'attendees': [
                {'email': 'lpage@example.com'},
                {'email': 'sbrin@example.com'}
            ],
            'reminders': {
                'useDefault': false,
                'overrides': [
                    {'method': 'email', 'minutes': 24 * 60},
                    {'method': 'popup', 'minutes': 10}
                ]
            }
        };
        console.table(event);
        console.table(this.providerEventDetails);
        this.auth.send(insertEventEndPoint, this.providerEventDetails);
    }
}

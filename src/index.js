import {EventToCalendar} from './eventToCalendar'
import google from './providers/google'

let elem = document.querySelector('#parent');


let addToCalendar = new EventToCalendar(elem, {
    providers: [google],
    template: '<ul></ul>',
    providersData: {
        google: {
            'clientId': '176041865393-kfpdv26puometn1fsqng870arss143fh.apps.googleusercontent.com'
        }
    },

    details: {
        title: 'title' + new Date().getMilliseconds(),
        description: 'description1',
        startDate: '2019-02-03',
        endDate: '2019-02-04',
        timezone: 'America/New_York',
        location: 'HERE',
        attachments: [
            'https://google.com',
            'https://test.com'
        ],
        attendees: [
            {
                email: 'guest6@here.ro',
                optional: true,
                comment: 'i will join',
                responseStatus: 'needsAction',
                guestsCanInviteOthers: true,
                guestsCanModify: false,
                guestsCanSeeOtherGuests: false
            },
            {
                email: 'guest3@here.ro',
                optional: false,
                comment: 'i will join',
                responseStatus: 'needsAction',
                guestsCanInviteOthers: true,
                guestsCanModify: false,
                guestsCanSeeOtherGuests: false
            },
            {
                email: 'guest1@here.ro',
                optional: true,
                comment: 'fok off',
                responseStatus: 'declined',
                guestsCanInviteOthers: true,
                guestsCanModify: false,
                guestsCanSeeOtherGuests: false
            },
        ],

        source: {
            title: 'source title',
            url: 'https://google.com'
        },

        status: "confirmed",
        transparency: 'opaque',
        visibility: 'public'
        // recurrence:
    }


});


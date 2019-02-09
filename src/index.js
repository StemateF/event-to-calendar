import EventToCalendar from './eventToCalendar'
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
        title: 'title',
        description: 'description',
        startDate: '2019-02-03',
        endDate: '2019-02-04',
        timezone: 'America/New_York',
        location: 'HERE',
        guests: [
            'guest6@here.ro',
            'guest5@here.ro',
            'guest4@here.ro'
        ]
    }
});


import {AbstractProvider} from './abstractProvider'
import {oAuth} from "../helpers/oAuth";
import {stringToHtml} from "../helpers";


const authorizationEndPoint = 'https://accounts.google.com/o/oauth2/v2/auth';
const scopes = [
    'https://www.googleapis.com/auth/calendar.events'
];
export default class Google extends AbstractProvider {
    constructor(eventDetails, providerData) {
        super();
        this.additionalData = providerData;
        this.eventDetails = eventDetails;
        this.auth = new oAuth(authorizationEndPoint, {
            client_id: this.providerData.clientId,
            redirect_uri: 'http://localhost:8080',
            response_type: 'token',
            scope: scopes
        })

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

    addEvent() {

        this.auth.send();
    }
}

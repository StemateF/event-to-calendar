import {stringToHtml} from "./helpers";


export class EventToCalendar {
    /**
     * @namespace
     * @constructor
     * @param {HTMLElement} element The buttons container
     * @param  {Object} options
     * @param {Template|string} options.template - The button template
     * @param {AbstractProvider[]} options.providers - The calendar providers
     * @param {Object} options.providerData - Additional data passed to  each provider should have the structure providerName:{key:vald}
     * @param {Object} options.details - The event details object
     * @param {string} [options.details.title=null] - The event title
     * @param {string}  [options.details.description=null] - The event description
     * @param {Date} options.details.startDate - The event start date
     * @param {Date} options.details.endDate - The event end date
     * @param {string} options.details.timezone - Valid Timezone String
     * @param {string[]} [options.details.attachments=null] - Links to attached files
     * @param {Object[]} [options.details.attendees] - Array with the attendees attributes
     * @param {string} options.details.attendees[].email - Valid Email of the attendee
     * @param {boolean} [options.details.attendees.optional]
     * @param {string} [options.details.attendees.comment]
     * @param {string} [options.details.attendees.responseStatus]
     * @param {boolean} [options.details.attendees.guestsCanInviteOthers]
     * @param {boolean} [options.details.attendees.guestsCanModify]
     * @param {boolean} [options.details.attendees.guestsCanSeeOtherGuests]
     * @param {'confirmed' | 'tentative' | 'cancelled' } [options.details.status]
     * @param {'opaque' | 'transparent'} [options.details.transparency=opaque]
     * @param {'default' | 'public' | 'private' } [options.details.visibility=opaque]
     */
    constructor(element, options) {
        this.element = element;
        this.providers = [];
        this.element.eventToCalendar = this;
        this.mergeOptions(options);
        this.init()
    }

    mergeOptions(options) {
        let defaults = {
            providers: [],
            template: '',
            details: {},
            providersData: {}

        };

        Object.entries(defaults).forEach((item) => {
            this[item[0]] = typeof options[item[0]] === 'undefined'
                ? item[1]
                : options[item[0]]
        })
    }

    renderParent() {
        this.parentWrapper = stringToHtml(this.template);
        this.element.append(this.parentWrapper)
    }

    renderProvider(provider, index) {
        this.providers[index] = new provider(this.details, this.providersData[provider.providerName]);
        let providerTemplate = this.providers[index].render();

        if (typeof providerTemplate === 'string') {
            providerTemplate = stringToHtml(providerTemplate);
        }

        this.parentWrapper.append(providerTemplate);
    }

    renderProviders() {
        this.providers.forEach(this.renderProvider.bind(this))
    }

    init() {
        this.renderParent();
        this.renderProviders()
    }
}

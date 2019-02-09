/**
 * @var providers
 * @var template
 * @var details
 * @var  {object} providerData
 */
import {stringToHtml} from "./helpers";

export default class EventToCalendar {
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

export default class EventToCalendar {
    constructor(element, options) {
        this.element = element;

        this.element.eventToCalendar = this;
        this.mergeOptions(options);
        this.init()
    }

    mergeOptions(options) {
        let defaults = {
            providers: [],
            template: '',
            details: {}
        };

        Object.entries(defaults).forEach((item) => {
            this[item[0]] = typeof options[item[0]] === 'undefined'
                ? item[1]
                : options[item[0]]
        })
    }

    stringToHtml(htmlString) {
        let dummyTemplate = document.createElement('template');
        htmlString.trim();
        dummyTemplate.innerHTML = htmlString;

        return dummyTemplate.content.firstElementChild
    }

    renderParent() {
        this.parentWrapper = this.stringToHtml(this.template);
        this.element.append(this.parentWrapper)
    }

    renderProvider(provider, index) {
        this.providers[index] = new provider(this.details);
        let providerTemplate = this.providers[index].render();

        if (typeof providerTemplate === 'string') {
            providerTemplate = this.stringToHtml(providerTemplate);
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

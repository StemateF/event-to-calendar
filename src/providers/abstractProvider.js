const PLUGIN_NAME = 'eventToCalendar';

export class AbstractProvider {
    constructor() {
        this.providerData;
        this.render();
        this.storageKey = [PLUGIN_NAME, this.constructor.providerName].join('.')
    }

    static get providerName() {
        throw  new Error('Your provider needs to implement static getter providerName')
    }

    get providerData() {
        throw  new Error('Your provider needs to implement the provider data getter.')
    }

    render() {
        throw  new Error('Your provider needs to implement render method.')
    }
}
export class AbstractProvider {
    constructor() {
        this.providerData;
        this.render()
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
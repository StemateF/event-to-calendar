import {generateRandomId} from "../helpers";

export class oAuth {
    constructor(authorizationEndPoint, requestBody) {
        this.autorizationEndPoint = authorizationEndPoint;
        this.params = requestBody;
        this.openedtab = null;
        this.registerEvents();
    }

    registerEvents() {
        window.addEventListener('load', () => {
            if (window.opener !== null) {
                window.opener.postMessage(this.parseUrl())

            } else {

                window.addEventListener('message', this.handleConsentResponse.bind(this))
            }
        })
    }

    parseUrl() {
        var params = {};
        var regex = /([^&=]+)=([^&]*)/g, m;
        var fragmentString = location.hash.substring(1);
        while (m = regex.exec(fragmentString)) {
            params[decodeURIComponent(m[1])] = decodeURIComponent(m[2]);
        }
        return params;
    }

    send() {
        this.authorize()
    }

    authorize() {
        this.request('POST', this.autorizationEndPoint, this.params)
    }

    request(method, url, params) {
        let form = document.createElement('form');
        form.setAttribute('method', method);
        form.setAttribute('action', url);
        this.uniqueId = generateRandomId(20);
        params.state = this.uniqueId;

        for (let paramName in params) {
            if (params.hasOwnProperty(paramName)) {
                let inputElem = document.createElement('input');
                inputElem.setAttribute('type', 'hidden');
                inputElem.setAttribute('name', paramName);
                inputElem.setAttribute('value', params[paramName]);

                form.append(inputElem);
            }


            this.openConsentTab().querySelector('body').append(form);
            form.submit();
        }
    }

    openConsentTab() {
        if (this.openedtab === null) {
            this.openedtab = open('', 'windowName', 'width=500,height=700');
        }

        return this.openedtab.document;
    }

    handleConsentResponse(e) {
        let messageData = e.data;
        if (typeof messageData.state === "undefined" || messageData.state !== this.uniqueId) {
            return;
        }
        let expireTime = Math.round(new Date().getTime() / 1000) - 10 + messageData.expires_in;

        this.saveToken(messageData.access_token, expireTime);
        this.openedtab.close();
    }

    saveToken(token, expireDate) {
        let currentTokens = window.localStorage.getItem('eventToCalendarOAuth');
        if (currentTokens === null || currentTokens.length === 0) {
            currentTokens = {};

        } else {
            currentTokens = JSON.parse(currentTokens);
        }

        currentTokens[this.autorizationEndPoint] = {
            scopes: this.params.scopes,
            expireDate: expireDate,
            token: token
        };

        window.localStorage.setItem('eventToCalendarOAuth', JSON.stringify(currentTokens))
    }
}
import {generateRandomId} from "../helpers";

const now = () => {
    return Math.round(new Date().getTime() / 1000)
};

export class oAuth {
    constructor(authorizationEndPoint, requestBody, storageKey) {
        this.autorizationEndPoint = authorizationEndPoint;
        this.params = requestBody;
        this.openedtab = null;
        this.storageKey = storageKey;
        this.registerEvents();
        this.consentPromise = {}
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

    send(endPoint, payload) {
        console.log(JSON.stringify({resource: payload}));
        this.authorize().then((token) => {
            console.log('add that event');
            fetch(endPoint, {
                method: 'POST',
                mode: "cors",
                cache: "no-cache",
                body: JSON.stringify(payload),
                headers: new Headers({
                    'Authorization': `Bearer ${token}`,
                    "Content-Type": "application/json",
                })
            }).then(response => {
                console.log('eh');
            })
        })
    }

    authorize() {
        //check if we have a valid token for all the required scopes
        let alreadyRequiredToken = this.getToken(this.params.scope);
        // if (alreadyRequiredToken) {
        //     return new Promise(resolve => resolve(alreadyRequiredToken.token))
        // }
        this.request('POST', this.autorizationEndPoint, this.params);
        return new Promise((resolve, reject) => {
            this.consentPromise.resolve = resolve;
            this.consentPromise.reject = reject
        })

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
                if (params[paramName].constructor === Array) {
                    inputElem.setAttribute('value', params[paramName].join(' '));
                } else {
                    inputElem.setAttribute('value', params[paramName]);

                }

                form.append(inputElem);
            }
        }
        let tab = this.openConsentTab();
        if (tab) {
            tab.querySelector('body').append(form);
            form.submit();
        }
    }

    openConsentTab() {
        let returnVal;
        if (this.openedtab === null || this.openedtab.window === null) {
            this.openedtab = open('', 'windowName', 'width=500,height=700');
        }
        try {
            returnVal = this.openedtab.document;
            this.openedtab.focus();
        } catch (e) {
            this.openedtab.focus();
        }
        return returnVal || false;
    }

    handleConsentResponse(e) {
        let messageData = e.data;
        if (typeof messageData.state === "undefined" || messageData.state !== this.uniqueId) {
            return;
        }
        let expireTime = now() - 10 + messageData.expires_in;

        this.saveToken(messageData.access_token, expireTime);
        this.openedtab.close();
        this.consentPromise.resolve(messageData.access_token)
    }

    saveToken(token, expireDate) {
        let currentTokens = window.localStorage.getItem(this.storageKey);
        if (currentTokens === null || currentTokens.length === 0) {
            currentTokens = [];
        } else {
            currentTokens = JSON.parse(currentTokens);
        }

        currentTokens.push({
            scope: this.params.scope,
            expireDate: expireDate,
            token: token
        });
        window.localStorage.setItem(this.storageKey, JSON.stringify(currentTokens))
    }

    getToken(requiredScopes) {
        let currentTokens = JSON.parse(window.localStorage.getItem(this.storageKey));
        if (currentTokens === null) {
            return false;
        }
        let tokensWithScopes = currentTokens.filter(token => {
            return this.tokenIsValidForScope(token, requiredScopes)
        });

        let unexpired = tokensWithScopes.find(token => {
            return now() < token.expireDate
        });

        if (typeof unexpired !== 'undefined') {
            return unexpired;
        }
        //todo if we a token but it's expired refresh it don't ask for a new one


        return false
    }

    tokenIsValidForScope(token, requiredScopes) {
        let hasAllRequiredScopes = true;

        if (requiredScopes.constructor === Array) {
            for (let requiredScope of requiredScopes) {
                hasAllRequiredScopes = hasAllRequiredScopes && token.scope.includes(requiredScope)
            }
        } else {
            hasAllRequiredScopes = token.scope.includes(requiredScopes);

        }

        return hasAllRequiredScopes;
    }
}
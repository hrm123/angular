

export class User{

    public _redirectUrl? : [any];
    constructor(public email: string,
        public id: string,
        private _token: string,
        private _tokenExpirationDate: Date
        ) {
            this._redirectUrl = null; // url to whihc user default redirect occurs to
        }

    get token(){
        if(!this._tokenExpirationDate ||
            new Date()> this._tokenExpirationDate){
                return null;
            }
        return this._token;
    }

}
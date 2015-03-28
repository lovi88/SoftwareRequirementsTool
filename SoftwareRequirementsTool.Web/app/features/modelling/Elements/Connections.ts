/// <reference path="baseinitfromobj.ts" />
/// <reference path="interfaces.ts" />

module Modelling {

    export class BaseConnection extends BaseInitFromObj implements IConnection {
        constructor(public from, public to) {
            super();

        }


    }


} 
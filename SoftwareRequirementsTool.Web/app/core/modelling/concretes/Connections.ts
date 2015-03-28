module Modelling {

    export class BaseConnection extends AbsInitFromObj implements IConnection {
        constructor(public from, public to) {
            super();

        }


    }


} 
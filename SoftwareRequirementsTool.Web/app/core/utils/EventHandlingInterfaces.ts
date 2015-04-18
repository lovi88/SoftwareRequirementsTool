interface ICrudObserver {
    created(element: any);
    modified(element: any);
    deleted(element: any);
}

interface ICrudObservableSubject {
    registerObserver(observer: ICrudObserver);
    unregisterObserver(observer: ICrudObserver);
}

interface IEventCallback {
    (from: any, data: any): any;
}

interface IOccurationListener {
    occured(from: any, data: any): void;
}
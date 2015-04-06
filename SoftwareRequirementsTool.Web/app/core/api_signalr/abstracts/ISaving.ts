interface ICrudObserver {
    created(element: any);
    modified(element: any);
    deleted(element: any);
}

interface ICrudObservableSubject {
    registerObserver(observer: ICrudObserver);
    unregisterObserver(observer: ICrudObserver);
}


interface ISaver {
    save(element: any): void;
    rollback(element: any): void;
}

interface ISavable {
    save(): void;
    rollback(): void;
}

module API.SignalR {

}
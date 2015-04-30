interface IServerService {
    create(element,callback?);
    modify(element);
    deleteEntity(element);
    getAll(callback: IArrayWaitCallback);
    resetFromServer(element);

    init();
}

interface IArrayWaitCallback {
    (array: Array<any>)
}
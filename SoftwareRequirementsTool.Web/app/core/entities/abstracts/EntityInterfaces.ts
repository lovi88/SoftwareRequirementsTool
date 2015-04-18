interface ISavable {
    save(): void;
    rollback(): void;
}

interface IEntity extends ISavable {
    Id: number;
    setService(service: IServerService);
    setUpFromObject(object:any);
}

interface IProject extends IEntity  {
    Name: string;
    Description: string;
}
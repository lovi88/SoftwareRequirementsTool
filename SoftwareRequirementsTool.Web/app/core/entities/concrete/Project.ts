class Project implements IProject {
    Id: number;
    Name: string;
    Description: string;
    private service: IServerService;

    setService(service: IServerService) {
        this.service = service;
    }

    setUpFromObject(object) {
        Utils.InitFromObj.initObj(this, object);
    }

    static createFromObject(object) {
        var pr = new Project();
        pr.setUpFromObject(object);
        
        return pr;
    }

    save(): void {
        this.service.modify(this);
    }

    rollback(): void {
        //this.service.resetFromServer(this);
    }
}
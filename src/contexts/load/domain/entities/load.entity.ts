export class Load {
    constructor(
        public id: string,
        public image: string,
        public supplier: string,
        public amount: number,
        public date: Date,
        public companyId: string,
        public cisternId: string,
        public createdAt: Date,
    ) { }
}

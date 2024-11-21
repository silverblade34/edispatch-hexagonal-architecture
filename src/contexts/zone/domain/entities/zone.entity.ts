export class Zone {
    constructor(
        public id: string,
        public name: string,
        public code: string,
        public description: string,
        public zipcode: string,
        public companyId: string,
        public createdAt: Date,
        public updatedAt: Date,
    ) { }
}

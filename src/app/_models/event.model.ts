export class Event {

    constructor(
        public _id: string,
        public type: string,
        public title: string,
        public num: string,
        public price: string,
        public state: string,
        public infoFile: string,
        public genFile: string,
        public date: string,
        public date2: string,
        public description: string
    ) { }

}

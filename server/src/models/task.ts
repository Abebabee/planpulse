import { ObjectId, WithId, Document} from "mongodb";

export default class Task {
    constructor(
        public title: string,
        public description: string,
        public status: string,
        public prio: string,
        public id?: ObjectId
    ) {}
}
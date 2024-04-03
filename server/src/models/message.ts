//External dependencies
import { ObjectId, WithId, Document} from "mongodb";


export default class NewProject{
    constructor(public userId: string, public message: string, public date = Date) {}
}
//External dependencies
import { ObjectId, WithId, Document} from "mongodb";


export default class Message{
    constructor(public from: string, public message: string, public date = Date) {}
}
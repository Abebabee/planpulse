//External dependencies
import { ObjectId, WithId, Document} from "mongodb";


export default class NewProject{
    constructor(public name: string, public description: string, public status: string, public ownerId: string, public invitedUsers: string[], public _id?: ObjectId) {}
}


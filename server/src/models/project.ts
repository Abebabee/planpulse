//External dependencies
import { ObjectId, WithId, Document} from "mongodb";

export default class Project{
    constructor(public name: string, public description: string, public status: string, public invitedUsers: string[], public id?: ObjectId) {}
}


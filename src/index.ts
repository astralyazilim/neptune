
import { createServer } from "http";
import { createNeptune } from "./app";
import { AdapterCore, NodeAdapter } from "./app/adapter";
import { Resource } from "./app/resource";
import { NeptuneError } from "./healpers/error";
import { NeptuneRequest } from "./internal/body";
import { Response } from "./internal/response";

class UserNotFoundError extends NeptuneError {
    override headers: Record<string,string> = {
        ...this.headers, test: "test"
    }

    constructor(userName: string) {
        super( `user ${userName} not found`, 404) 
    }
}


class UserResource extends Resource {
   
    public path = /\/user\/foo\/\w+/ // regexp path

   
    
    // if given path is regexp must be used to parse params
    // custom params handler
    override params(): Record<string, string> {
        
        return {
            id: this.url.match(/(?<=\/user\/foo\/)\w+(?=$)/)?.[0] || ""
        }
    }


    async GET(request: NeptuneRequest) {

        const id = this.params().id
      
        if (id == "")  throw new UserNotFoundError("jhon")
        const user = { firstName: "jhon", lastName: "doe", id:id }
        
    
        return Response.json(user, 200, { /** headers */})
    }

    public ERROR(error?: UserNotFoundError) {
        
        return Response.json({ message: " user not found"})
    }

    

}



const app = createNeptune({
    adapter: NodeAdapter,
    hostname: "localhost",
    port: 3000,
    resources: [
        UserResource
    ]
})


app.run(() => console.log("app running on port 3000"))



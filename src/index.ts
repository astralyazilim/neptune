
import { App,  NodeAdapter, Resource } from "./core"
import {  Service , serviceScope } from "./common"
import { injectable, Lifecycle, scoped, singleton , container } from "tsyringe"

@Service(serviceScope.Transient)
export class UserService {
    users: any[] = []
}
@singleton()
export class RandomService {
    number = Math.random()
}

@injectable()
export class RandomService1 {
    number = Math.random()
}

class ProfileResource implements Resource {

    async GET(request: any): Promise<Response> {

        const user = request.user
        return new Response(JSON.stringify({img: "http://localhost:3000/profiles/user" + user + "/img.jpg"}))
    }
}


class UserResource implements Resource {
    
    /**
     * @param {ProfileResource} profileResource
     * automatically resolved by ioc container 
     */
    constructor(
        public path:string = "/",
        private profileResource: ProfileResource,
        private userService: UserService,
        private radom: RandomService,
        private random1: RandomService1) { }

    async GET(request: Request): Promise<Response> {
       
        console.log(this.radom.number, this.random1.number)
        return new Response(JSON.stringify(this.userService.users))
    }


 
    async POST(): Promise<Response> {
        const r = await (await this.profileResource.GET({user: this.userService.users.length})).json()
        this.userService.users.push({id:this.userService.users.length, name: "user" + this.userService.users.length, profile: r})
        return new Response(JSON.stringify(this.userService.users))
    }
}


new App({
    resources: [UserResource, ProfileResource],
    adapter: new NodeAdapter(3000) // NodeAdapter , NetlifyAdapter , CloudFlareAdapter, yada kendi custom adaptorunu olusturabilirsiniz
})


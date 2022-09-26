import { AdapterCore } from "./adapter";
import { Resource } from "./resource";


export interface INeptunAppOptions {
    adapter?: typeof AdapterCore
    resources?:  Array<any & Resource>
    hostname?: string
    port?: number
}


class NeptuneApp {
    constructor(
        public adapter?: typeof AdapterCore,
        public resources?: Array<any & Resource>,
        public hostname?: string,
        public port?: number
      
    ) { }
    

    public run(cb?: () => void): this {

        if (this.adapter) {
            const adapter = new this.adapter(this.hostname, this.port, this.resources, [])
            
        
        } else throw new Error("Not adapter specified");
        
            
      
        return this
    }
}


export function createNeptune(options: INeptunAppOptions) {

  
    const resources = options.resources?.map(resource => new resource()) || []

    return new NeptuneApp(
        options.adapter,
        options.resources,
        options.hostname,
        options.port
    )
}
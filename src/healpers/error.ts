export class NeptuneError {
    
    constructor(public message: string, public status: number, public headers: Record<string,string> = {}) {}
}
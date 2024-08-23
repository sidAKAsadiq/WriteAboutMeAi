class api_error{
    constructor(status_code , data , message = "Success"){
        this.statusCode = status_code
        this.data = data
        this.message = message
        this.success = status_code < 400
    }
}

export {api_error}

export default class VerifyFields{
    
    static verifyFieldIsNull(field, message, statusCode){
        if(!field){
            this.buildError(message, statusCode)
        }
    }

    static verifyFieldIsNotNull(field, message, statusCode){
        if(field){
            this.buildError(message, statusCode)
        }
    }

    static verifyFieldIsEmpty(field, message, statusCode){
        if(field.length == 0){
            this.buildError(message, statusCode)
        }
    }

    static buildError(message, statusCode){
        const error = new Error(message);
        error.statusCode = statusCode;
        throw error;
    }
}

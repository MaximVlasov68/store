import { HttpException, HttpStatus } from "@nestjs/common";

export class KeyNotUniqueException extends HttpException {
    constructor(entityName: string, keyName: string) {
        super({
            name: 'KeyNotUniqueException',
            detail: `Key ${keyName} of ${entityName} entity must be unique`,
        }, HttpStatus.UNPROCESSABLE_ENTITY)
    }
}
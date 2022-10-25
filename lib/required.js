"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidateRequired = exports.Required = void 0;
require("reflect-metadata");
const requiredMetadataKey = Symbol('required');
/**
   * @description Proprety instance of Required.
   * @description Exemaple: (@Required params: IParams)
*/
function Required(target, propertyKey, parameterIndex) {
    let existinRequiredParamters = Reflect.getOwnMetadata(requiredMetadataKey, target, propertyKey) || [];
    existinRequiredParamters.push(parameterIndex);
    Reflect.defineMetadata(requiredMetadataKey, existinRequiredParamters, target, propertyKey);
}
exports.Required = Required;
/**
   * @description An validators params in parameters.
   * @description Exemaple: ['Name', 'E-mail', 'Password']
   * @param { string[] } params - A array paramters validators.
*/
function ValidateRequired(notNullKeys) {
    return function (target, propertyKey, descriptor) {
        const method = descriptor.value;
        descriptor.value = function () {
            let requiredParams = Reflect.getOwnMetadata(requiredMetadataKey, target, propertyKey);
            if (requiredParams) {
                for (const params of requiredParams) {
                    console.log('arguments.length', arguments[params]);
                    if (params >= arguments.length || arguments[params] === null) {
                        throw new Error('Missing required argument!');
                        // return {
                        //   statusCode: 400,
                        //   message:'Missing required argument!'
                        // }
                    }
                    if (notNullKeys) {
                        for (const keyValidation of notNullKeys) {
                            console.log('arguments[params][keyValidation]', arguments[params][keyValidation]);
                            if (arguments[params][keyValidation] === null || arguments[params][keyValidation] === undefined || arguments[params][keyValidation] === '') {
                                throw new Error(`Missing required value in param at position ${keyValidation}`);
                                // return {
                                //   statusCode: 400,
                                //   message: `Missing required value in param at position ${keyValidation}`
                                // }
                            }
                        }
                    }
                }
            }
            return method.apply(this, arguments);
        };
    };
}
exports.ValidateRequired = ValidateRequired;
//# sourceMappingURL=required.js.map
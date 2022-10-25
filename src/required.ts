import "reflect-metadata";

type Target = Object
type PropertyKey = string | symbol
type Descriptor<t> = TypedPropertyDescriptor<t>
type UpdateTitleFn = (str: string) => string
type ParameterIndex = number
const requiredMetadataKey = Symbol('required')

/**
   * @description Proprety instance of Required.
   * @description Exemaple: (@Required params: IParams)
*/
export function Required(target: Target, propertyKey: PropertyKey, parameterIndex: ParameterIndex) {
  let existinRequiredParamters: number[] = Reflect.getOwnMetadata(requiredMetadataKey, target, propertyKey) || []
  existinRequiredParamters.push(parameterIndex)
  Reflect.defineMetadata(requiredMetadataKey, existinRequiredParamters, target, propertyKey)
}


/**
   * @description An validators params in parameters.
   * @description Exemaple: ['Name', 'E-mail', 'Password']
   * @param { string[] } params - A array paramters validators.
*/
export function ValidateRequired (notNullKeys?: string[]) {
  return function (target: Target, propertyKey: PropertyKey, descriptor: Descriptor<any>) {
    const method = descriptor.value!
  
    descriptor.value = function () {
      let requiredParams: number[] = Reflect.getOwnMetadata(requiredMetadataKey, target, propertyKey)
      if(requiredParams) {
        for (const params of requiredParams) {
          console.log('arguments.length', arguments[params])
  
          if(params >= arguments.length || arguments[params] === null) {
            throw new Error('Missing required argument!')
            // return {
            //   statusCode: 400,
            //   message:'Missing required argument!'
            // }
          }

          if(notNullKeys) {
            for (const keyValidation of notNullKeys) {
              console.log('arguments[params][keyValidation]', arguments[params][keyValidation])
              if(arguments[params][keyValidation] === null || arguments[params][keyValidation] === undefined || arguments[params][keyValidation] === '') {
                throw new Error(`Missing required value in param at position ${keyValidation}`)
                // return {
                //   statusCode: 400,
                //   message: `Missing required value in param at position ${keyValidation}`
                // }
              }
            }
          }
          
        }
      }
  
      return method.apply(this, arguments)
    }
  }
}
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
export function Required (target: Target, propertyKey: PropertyKey, parameterIndex: ParameterIndex) {
  const existinRequiredParamters: number[] = Reflect.getOwnMetadata(requiredMetadataKey, target, propertyKey) || []
  existinRequiredParamters.push(parameterIndex)
  Reflect.defineMetadata(requiredMetadataKey, existinRequiredParamters, target, propertyKey)
}
type paramsFields = 'string' | 'boolean' | 'number' | 'Enumerator' | 'Buffer' | 'Array'

type requiredFieldOfArray = [paramsFields, boolean]

type PametersFields = {
  name?: string
  required?: boolean
  type?: paramsFields
  isArray?: boolean
  nameOfArray?: string
  typeOfArray?: 'string' | 'object' | 'number'
  requiredFieldOfArray?: boolean
  fieldsArray?: Record<string, paramsFields | requiredFieldOfArray>[]
  minLength?: number
  maxLength?: number
}

/**
   * @description An validators params in parameters.
   * @description 
   * Exemaple [Array]: [
   *     {
    *      isArray: true,
    *     typeOfArray: 'object',
    *     nameOfArray: 'users',
    *     fieldsArray: [{ name: ['string', true], age: ['number', false] }]
    *   }
   * ]
   * @description 
   * Exemaple [string]: 
   *     {
      name: 'name',
      type: 'string',
      required: true,
      maxLength: 11
    *   }
   * @description for more tips on how to use read the docs: https://github.com/exception-logs/exceptions-logs#readme
   * @param PametersFields  - A array paramters validators.
   * 
*/
export function ValidateRequired (fields: PametersFields[]) {
  return function (target: Target, propertyKey: PropertyKey, descriptor: Descriptor<any>) {
    const method = descriptor.value

    descriptor.value = function () {
      const requiredParams: number[] = Reflect.getOwnMetadata(requiredMetadataKey, target, propertyKey)

      if (requiredParams) {
        fields.forEach((field, params) => {
          if (fields[params].name && fields[params].isArray === undefined) {
            const nameParamter = fields[params].name!
            const typeParamter = fields[params].type
            const requiredParameter = fields[params].required
            const minLengthParamter = fields[params].minLength
            const maxLenthParameter = fields[params].maxLength
            if (requiredParameter && !arguments[0][nameParamter]) throw new Error(`The ${nameParamter} is required`)
            if (typeParamter !== 'Array' && typeof arguments[0][nameParamter] !== typeParamter) throw new Error(`The ${nameParamter} is invalid value`)
            if (typeParamter === 'Array' && !Array.isArray(arguments[0][nameParamter])) throw new Error(`The ${nameParamter} is invalid value`)
            if (minLengthParamter && arguments[0][nameParamter].length < minLengthParamter) throw new Error(`The ${nameParamter} parameter must have at least ${minLengthParamter} characters`)
            if (maxLenthParameter && arguments[0][nameParamter].length > maxLenthParameter) throw new Error(`The ${nameParamter} parameter must have a maximum of ${maxLenthParameter} characters`)
          }

          if (fields[params].isArray) {
            if (fields[params].nameOfArray && fields[params].typeOfArray === 'object') {
              arguments[params][fields[params].nameOfArray!.toLowerCase().toString()].forEach((field: any, index: number) => {
                const parametersFieldsValidated = fields[params].fieldsArray[index]

                for (const param in parametersFieldsValidated) {
                  const key = param
                  const value = parametersFieldsValidated[param]
                  const valueProprietaryObject = field[param]

                  let typeParameter: string
                  let requiredType: boolean

                  if (Array.isArray(value)) {
                    typeParameter = value[0]
                    requiredType = value[1]
                  } else {
                    typeParameter = value[0]
                    requiredType = false
                  }
                  console.log('typeParameter', typeParameter)
                  console.log('requiredType && !valueProprietaryObject', requiredType && !valueProprietaryObject)
                  if (requiredType && !valueProprietaryObject) throw new Error(`The ${key} field is required in the array of ${fields[params].nameOfArray?.toUpperCase()}`)
                  if (requiredType && typeof valueProprietaryObject !== typeParameter) throw new Error(`The ${key} has the wrong value in the array of ${fields[params].nameOfArray?.toUpperCase()}`)
                }
              })
            }

            if (fields[params].typeOfArray === 'string') {
              const getNotStringFieldArray = arguments[params][fields[params].nameOfArray!.toLowerCase().toString()]
                .filter((element: any) => typeof element !== 'string')

              console.log('getNotStringFieldArray', getNotStringFieldArray)
              if (getNotStringFieldArray.length) throw new Error(`There are fields with invalid values ​​in the ${fields[params].nameOfArray?.toUpperCase()}`)
            }

            if (fields[params].typeOfArray === 'number') {
              const getNotStringFieldArray = arguments[params][fields[params].nameOfArray!.toLowerCase().toString()]
                .filter((element: any) => typeof element !== 'number')
              if (getNotStringFieldArray.length) throw new Error(`There are fields with invalid values ​​in the ${fields[params].nameOfArray?.toUpperCase()}`)
            }
          }
        })
      }

      return method.apply(this, arguments)
    }
  }
}
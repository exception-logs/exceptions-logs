import "reflect-metadata";
declare type Target = Object;
declare type PropertyKey = string | symbol;
declare type Descriptor<t> = TypedPropertyDescriptor<t>;
declare type ParameterIndex = number;
/**
   * @description Proprety instance of Required.
   * @description Exemaple: (@Required params: IParams)
*/
export declare function Required(target: Target, propertyKey: PropertyKey, parameterIndex: ParameterIndex): void;
/**
   * @description An validators params in parameters.
   * @description Exemaple: ['Name', 'E-mail', 'Password']
   * @param { string[] } params - A array paramters validators.
*/
export declare function ValidateRequired(notNullKeys?: string[]): (target: Target, propertyKey: PropertyKey, descriptor: Descriptor<any>) => void;
export {};
//# sourceMappingURL=required.d.ts.map
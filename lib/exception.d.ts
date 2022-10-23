declare namespace ItoLocaleDateString {
    type locale = 'pt-BR' | 'ar-EG' | 'ko-KR' | 'en-GB' | 'en-US';
    type to = 'toLocaleDateString' | 'toLocaleTimeString';
}
/**
   * @description
   * @param ItoLocaleDateString
*/
/**
   * @description
   * @param { string } methodName - A string param.
   * @param { boolean } crached - A boolean parameter
   * @param { ItoLocaleDateString.locale } countryLog
   * @param { Error } execeptionError - Custom error on exception.
*/
interface IExecpetion {
    methodName: string;
    crached?: boolean;
    countryLog?: ItoLocaleDateString.locale;
    execeptionError?: Error;
}
/**
   * @description This decorator will return an error on execution or continue the looping
   * @param { string } methodName - A string param.
   * @param { boolean } crached - A boolean parameter
   * @param { ItoLocaleDateString.locale } countryLog - 'pt-BR' | 'ar-EG' | 'ko-KR' | 'en-GB' | 'en-US' (Default: 'pt-BR')
   * @param { Error } execeptionError - Custom error on exception.
*/
export declare const Execpetion: ({ methodName, crached, countryLog, execeptionError }: IExecpetion) => (target: any, nameMethod: string, descriptor: PropertyDescriptor) => void;
export {};
//# sourceMappingURL=exception.d.ts.map
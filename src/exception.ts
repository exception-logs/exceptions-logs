namespace ItoLocaleDateString {
    export type locale = 'pt-BR' | 'ar-EG' | 'ko-KR' | 'en-GB' | 'en-US'
    export type to = 'toLocaleDateString' | 'toLocaleTimeString'
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
    execeptionError?: typeof Error;
}

/**
   * @description This decorator will return an error on execution or continue the looping
   * @param { string } methodName - A string param.
   * @param { boolean } crached - A boolean parameter
   * @param { ItoLocaleDateString.locale } countryLog - 'pt-BR' | 'ar-EG' | 'ko-KR' | 'en-GB' | 'en-US' (Default: 'pt-BR')
   * @param { Error } execeptionError - Custom error on exception.
*/
 export const Execpetion = function ({ methodName, crached, countryLog = 'pt-BR', execeptionError }: IExecpetion) {

    return (target: any, nameMethod: string, descriptor: PropertyDescriptor) =>  {
        const originalMethod = descriptor.value /** Original Function */

        descriptor.value = async function (...args: any[]) { 
            const actuallyDateTime = GetLocale(countryLog, 'toLocaleDateString')
            const actuallyDate = GetLocale(countryLog, 'toLocaleTimeString')
            const TargetLoggerId = Math.random().toString(36).slice(2, 7) + new Date().getMinutes()
    
            const startClock = process.hrtime()
            console.log(`${ColorsLog.white}[${ColorsLog.cyan}INFO - ${ColorsLog.blue}LOGGER ID: ${ColorsLog.magenta}${TargetLoggerId}${ColorsLog.white}] ${ColorsLog.blue}EXECUTION RUNNING${ColorsLog.white} -  ${actuallyDate} - ${actuallyDateTime} | - [${ColorsLog.magenta}RUNNING] ${ColorsLog.white}${methodName}`)
            try {
                const executionMethod = await originalMethod.apply(this, args)
                const endClock = process.hrtime(startClock)
                const duration = Math.round((endClock[0]*1000) + (endClock[1]/1000000));
                const taskDuration = Number(duration) / 1000.0 
                console.log(`${ColorsLog.white}[${ColorsLog.cyan}INFO - ${ColorsLog.blue}LOGGER ID: ${ColorsLog.magenta}${TargetLoggerId}${ColorsLog.white}] ${ColorsLog.green}EXECUTION SUCCESS${ColorsLog.white} -  ${actuallyDate} - ${actuallyDateTime} | - [${ColorsLog.green}FINALLY${ColorsLog.white}] ${methodName} - [${ColorsLog.yellow}TASK EVENT: ${taskDuration} ms${ColorsLog.white}]`)
                return executionMethod
            }  catch (error) {
    
              const err = JSON.parse(JSON.stringify(error, Object.getOwnPropertyNames(error)))
              const lineError = err.stack.split('at ')[1]
              const endClock = process.hrtime(startClock)
              const duration = Math.round((endClock[0]*1000) + (endClock[1]/1000000));
              const taskDuration = Number(duration) / 1000.0 
              console.log(`${ColorsLog.white}[${ColorsLog.cyan}INFO - ${ColorsLog.blue}LOGGER ID: ${ColorsLog.magenta}${TargetLoggerId}${ColorsLog.white}] ${ColorsLog.red}EXECUTION FAILED ${ColorsLog.white} -  ${actuallyDate} - ${actuallyDateTime} | - [${ColorsLog.red}FINALLY] ${ColorsLog.white}${methodName} - [${ColorsLog.yellow}TASK EVENT LOGGER ERROR: ${ColorsLog.white}${err.message ?? 'NOT FOUND'}`)
              console.log(`${ColorsLog.white}[${ColorsLog.cyan}INFO - ${ColorsLog.blue}LOGGER ID: ${ColorsLog.magenta}${TargetLoggerId}${ColorsLog.white}] ${ColorsLog.red}EXECUTION FAILED ${ColorsLog.white} -  ${actuallyDate} - ${actuallyDateTime} | - [${ColorsLog.red}FINALLY] ${ColorsLog.white}${methodName} - [${ColorsLog.yellow}TASK EVENT DEBUG ERROR : ${ColorsLog.white}${lineError?.trim() ?? 'NOT FOUND'}`)
              console.log(`${ColorsLog.white}[${ColorsLog.cyan}INFO - ${ColorsLog.blue}LOGGER ID: ${ColorsLog.magenta}${TargetLoggerId}${ColorsLog.white}] ${ColorsLog.red}EXECUTION FAILED ${ColorsLog.white} -  ${actuallyDate} - ${actuallyDateTime} | - [${ColorsLog.red}FINALLY] ${ColorsLog.white}${methodName} - [${ColorsLog.yellow}TASK EVENT DURATION    : ${ColorsLog.white}${taskDuration} ms]`)
            
              const personalizedError = new execeptionError(error) ?? new Error('Internal Server Error')
              return crached ?? personalizedError 
            }    
    
        }
    }

}


const GetLocale = function (locale: ItoLocaleDateString.locale, functionMissing: ItoLocaleDateString.to): string {
    const date = new Date()
    return date[functionMissing](locale, {
        hour: '2-digit', 
        minute:'2-digit',
        second: '2-digit'
    }) 
}

const ColorsLog = {
    blue: '\x1b[34m',
    white: '\x1b[37m',
    red: '\u001b[31m',
    yellow: '\x1b[33m',
    green: '\x1b[32m',
    magenta: '\x1b[35m',
    cyan: '\x1b[36m'
}
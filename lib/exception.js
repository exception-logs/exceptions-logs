"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Execpetion = void 0;
/**
   * @description This decorator will return an error on execution or continue the looping
   * @param { string } methodName - A string param.
   * @param { boolean } crached - A boolean parameter
   * @param { ItoLocaleDateString.locale } countryLog - 'pt-BR' | 'ar-EG' | 'ko-KR' | 'en-GB' | 'en-US' (Default: 'pt-BR')
   * @param { Error } execeptionError - Custom error on exception.
*/
const Execpetion = function ({ methodName, crached, countryLog = 'pt-BR', execeptionError }) {
    return (target, nameMethod, descriptor) => {
        const originalMethod = descriptor.value; /** Original Function */
        descriptor.value = function (...args) {
            var _a, _b;
            return __awaiter(this, void 0, void 0, function* () {
                const actuallyDateTime = GetLocale(countryLog, 'toLocaleDateString');
                const actuallyDate = GetLocale(countryLog, 'toLocaleTimeString');
                const TargetLoggerId = Math.random().toString(36).slice(2, 7) + new Date().getMinutes();
                const startClock = process.hrtime();
                console.log(`${ColorsLog.white}[${ColorsLog.cyan}INFO - ${ColorsLog.blue}LOGGER ID: ${ColorsLog.magenta}${TargetLoggerId}${ColorsLog.white}] ${ColorsLog.blue}EXECUTION RUNNING${ColorsLog.white} -  ${actuallyDate} - ${actuallyDateTime} | - [${ColorsLog.magenta}RUNNING] ${ColorsLog.white}${methodName}`);
                try {
                    const executionMethod = yield originalMethod.apply(this, args);
                    const endClock = process.hrtime(startClock);
                    const duration = Math.round((endClock[0] * 1000) + (endClock[1] / 1000000));
                    const taskDuration = Number(duration) / 1000.0;
                    console.log(`${ColorsLog.white}[${ColorsLog.cyan}INFO - ${ColorsLog.blue}LOGGER ID: ${ColorsLog.magenta}${TargetLoggerId}${ColorsLog.white}] ${ColorsLog.green}EXECUTION SUCCESS${ColorsLog.white} -  ${actuallyDate} - ${actuallyDateTime} | - [${ColorsLog.green}FINALLY${ColorsLog.white}] ${methodName} - [${ColorsLog.yellow}TASK EVENT: ${taskDuration} ms${ColorsLog.white}]`);
                    return executionMethod;
                }
                catch (error) {
                    const err = JSON.parse(JSON.stringify(error, Object.getOwnPropertyNames(error)));
                    const lineError = err.stack.split('at ')[1];
                    const endClock = process.hrtime(startClock);
                    const duration = Math.round((endClock[0] * 1000) + (endClock[1] / 1000000));
                    const taskDuration = Number(duration) / 1000.0;
                    console.log(`${ColorsLog.white}[${ColorsLog.cyan}INFO - ${ColorsLog.blue}LOGGER ID: ${ColorsLog.magenta}${TargetLoggerId}${ColorsLog.white}] ${ColorsLog.red}EXECUTION FAILED ${ColorsLog.white} -  ${actuallyDate} - ${actuallyDateTime} | - [${ColorsLog.red}FINALLY] ${ColorsLog.white}${methodName} - [${ColorsLog.yellow}TASK EVENT LOGGER ERROR: ${ColorsLog.white}${(_a = err.message) !== null && _a !== void 0 ? _a : 'NOT FOUND'}`);
                    console.log(`${ColorsLog.white}[${ColorsLog.cyan}INFO - ${ColorsLog.blue}LOGGER ID: ${ColorsLog.magenta}${TargetLoggerId}${ColorsLog.white}] ${ColorsLog.red}EXECUTION FAILED ${ColorsLog.white} -  ${actuallyDate} - ${actuallyDateTime} | - [${ColorsLog.red}FINALLY] ${ColorsLog.white}${methodName} - [${ColorsLog.yellow}TASK EVENT DEBUG ERROR : ${ColorsLog.white}${(_b = lineError === null || lineError === void 0 ? void 0 : lineError.trim()) !== null && _b !== void 0 ? _b : 'NOT FOUND'}`);
                    console.log(`${ColorsLog.white}[${ColorsLog.cyan}INFO - ${ColorsLog.blue}LOGGER ID: ${ColorsLog.magenta}${TargetLoggerId}${ColorsLog.white}] ${ColorsLog.red}EXECUTION FAILED ${ColorsLog.white} -  ${actuallyDate} - ${actuallyDateTime} | - [${ColorsLog.red}FINALLY] ${ColorsLog.white}${methodName} - [${ColorsLog.yellow}TASK EVENT DURATION    : ${ColorsLog.white}${taskDuration} ms]`);
                    const personalizedError = execeptionError !== null && execeptionError !== void 0 ? execeptionError : new Error('Internal Server Error');
                    return crached !== null && crached !== void 0 ? crached : personalizedError;
                }
            });
        };
    };
};
exports.Execpetion = Execpetion;
const GetLocale = function (locale, functionMissing) {
    const date = new Date();
    return date[functionMissing](locale, {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
    });
};
const ColorsLog = {
    blue: '\x1b[34m',
    white: '\x1b[37m',
    red: '\u001b[31m',
    yellow: '\x1b[33m',
    green: '\x1b[32m',
    magenta: '\x1b[35m',
    cyan: '\x1b[36m'
};
//# sourceMappingURL=exception.js.map
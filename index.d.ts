export var VariableType: any;
export function createScanner(options?: any): Scanner;
export function initialize(cb: any): any;
export function initializeAsync(): Promise<any>;
export function libyaraVersion(): any;
export declare class CompileRulesError {
    constructor(message: any);
    name: string;
    message: any;
}
export declare class Scanner {
    constructor(options: any);
    yara: any;
    getRules(): any;
    reconfigureVariables(options: any): any;
    configureAsync(options: any): Promise<any>;
    configure(options: any, cb: any): any;
    scanAsync(req: any): Promise<any>;
    scan(req: any, cb: any): any;
}
export {};

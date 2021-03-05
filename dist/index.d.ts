export var CompileRulesError: typeof CompileRulesError;
export var Scanner: typeof Scanner;
export var MetaType: any;
export var ScanFlag: any;
export var VariableType: any;
export function createScanner(options: any): Scanner;
export function initialize(cb: any): any;
export function libyaraVersion(): any;
declare function CompileRulesError(message: any): void;
declare class CompileRulesError {
    constructor(message: any);
    name: string;
    message: any;
}
declare function Scanner(options: any): void;
declare class Scanner {
    constructor(options: any);
    yara: any;
    getRules(): any;
    reconfigureVariables(options: any): any;
    configure(options: any, cb: any): any;
    scan(req: any, cb: any): any;
}
export {};

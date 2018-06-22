export interface IColorStyle {
    open: string;
    close: string;
    Wrap(text: string): string;
}
export declare class ColorStyle implements IColorStyle {
    protected openColor: number;
    protected closeColor: number;
    open: string;
    close: string;
    constructor(openColor: number, closeColor: number);
    static Create(color: number): string;
    Wrap(text: string): string;
}
export declare type LegalColor = "reset" | "bold" | "dim" | "italic" | "underline" | "inverse" | "hidden" | "strikethrough" | "black" | "red" | "green" | "yellow" | "blue" | "magenta" | "cyan" | "white" | "gray" | "grey" | "bgBlack" | "bgRed" | "bgGreen" | "bgYellow" | "bgBlue" | "bgMagenta" | "bgCyan" | "bgWhite" | "blackBG" | "redBG" | "greenBG" | "yellowBG" | "blueBG" | "magentaBG" | "cyanBG" | "whiteBG";
export interface ColorStyles {
    reset?: ColorStyle;
    bold?: ColorStyle;
    dim?: ColorStyle;
    italic?: ColorStyle;
    underline?: ColorStyle;
    inverse?: ColorStyle;
    hidden?: ColorStyle;
    strikethrough?: ColorStyle;
    black?: ColorStyle;
    red?: ColorStyle;
    green?: ColorStyle;
    yellow?: ColorStyle;
    blue?: ColorStyle;
    magenta?: ColorStyle;
    cyan?: ColorStyle;
    white?: ColorStyle;
    gray?: ColorStyle;
    grey?: ColorStyle;
    bgBlack?: ColorStyle;
    bgRed?: ColorStyle;
    bgGreen?: ColorStyle;
    bgYellow?: ColorStyle;
    bgBlue?: ColorStyle;
    bgMagenta?: ColorStyle;
    bgCyan?: ColorStyle;
    bgWhite?: ColorStyle;
    blackBG?: ColorStyle;
    redBG?: ColorStyle;
    greenBG?: ColorStyle;
    yellowBG?: ColorStyle;
    blueBG?: ColorStyle;
    magentaBG?: ColorStyle;
    cyanBG?: ColorStyle;
    whiteBG?: ColorStyle;
    [key: string]: IColorStyle;
}
declare const wrapperFn: (text: string, color: LegalColor) => string;
export { wrapperFn as Colors };

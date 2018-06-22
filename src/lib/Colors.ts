/* 
electron-reload-ts Colors

This code was Adapted from Marak Squires colors.js library <https://github.com/Marak/colors.js>
used under the conditions of the MIT license reproduced below, 
*/

/* 
MIT License

Original Library
  - Copyright (c) Marak Squires

Additional Functionality
 - Copyright (c) Sindre Sorhus <sindresorhus@gmail.com> (sindresorhus.com)

Typescript Port and Modifications
 - Copyright (c) Liam Whan (github.com/hammus/reload.git)

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
*/

export interface IColorStyle {
    open: string;
    close: string;
    Wrap(text: string): string;
}

export class ColorStyle implements IColorStyle {
    public open: string;
    public close: string;

    constructor(protected openColor: number, protected closeColor: number) {
        this.open = ColorStyle.Create(openColor);
        this.close = ColorStyle.Create(closeColor);
    }

    static Create(color: number): string {
        return `\u001b[${color}m`;
    }

    public Wrap(text: string): string {
        return `${this.open}${text}${this.close}`;
    }
}

export type LegalColor = "reset"|"bold"|"dim"|"italic"|"underline"|"inverse"|"hidden"|"strikethrough"|"black"|"red"|"green"|"yellow"|"blue"|"magenta"|"cyan"|"white"|"gray"|"grey"|"bgBlack"|"bgRed"|"bgGreen"|"bgYellow"|"bgBlue"|"bgMagenta"|"bgCyan"|"bgWhite"|"blackBG"|"redBG"|"greenBG"|"yellowBG"|"blueBG"|"magentaBG"|"cyanBG"|"whiteBG";

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
interface ColorCodes {
    reset?: number[];

    bold?: number[];
    dim?: number[];
    italic?: number[];
    underline?: number[];
    inverse?: number[];
    hidden?: number[];
    strikethrough?: number[];

    black?: number[];
    red?: number[];
    green?: number[];
    yellow?: number[];
    blue?: number[];
    magenta?: number[];
    cyan?: number[];
    white?: number[];
    gray?: number[];
    grey?: number[];

    bgBlack?: number[];
    bgRed?: number[];
    bgGreen?: number[];
    bgYellow?: number[];
    bgBlue?: number[];
    bgMagenta?: number[];
    bgCyan?: number[];
    bgWhite?: number[];

    // rev1.0.0
    blackBG?: number[];
    redBG?: number[];
    greenBG?: number[];
    yellowBG?: number[];
    blueBG?: number[];
    magentaBG?: number[];
    cyanBG?: number[];
    whiteBG?: number[];

    [key: string]: number[];
}
const codes: ColorCodes  = {
  reset: [0, 0],

  bold: [1, 22],
  dim: [2, 22],
  italic: [3, 23],
  underline: [4, 24],
  inverse: [7, 27],
  hidden: [8, 28],
  strikethrough: [9, 29],

  black: [30, 39],
  red: [31, 39],
  green: [32, 39],
  yellow: [33, 39],
  blue: [34, 39],
  magenta: [35, 39],
  cyan: [36, 39],
  white: [37, 39],
  gray: [90, 39],
  grey: [90, 39],

  bgBlack: [40, 49],
  bgRed: [41, 49],
  bgGreen: [42, 49],
  bgYellow: [43, 49],
  bgBlue: [44, 49],
  bgMagenta: [45, 49],
  bgCyan: [46, 49],
  bgWhite: [47, 49],

  // legacy styles for colors pre v1.0.0
  blackBG: [40, 49],
  redBG: [41, 49],
  greenBG: [42, 49],
  yellowBG: [43, 49],
  blueBG: [44, 49],
  magentaBG: [45, 49],
  cyanBG: [46, 49],
  whiteBG: [47, 49],

};
const styles: ColorStyles = {};

Object.keys(codes).forEach(function(key) {
  const val = codes[key];
  styles[key] = new ColorStyle(val[0], val[1]);
});

const wrapperFn = (text: string, color: LegalColor): string => {
    return styles[color].Wrap(text);
}

export {wrapperFn as Colors};
# Beload.js
> Electron hot-reloading with Bewatch.js 

A bare bones Typescript implementation of hot reloading for Electron that uses the much maligned Node.JS `fs.watch`. 

I created this for personal use in a very specific dev environment. It's a public repo primarily so I can link to it in other project's `package.json` and install it with `npm`.

Use at your own risk.


# Quick Start

## Installation
- Node.js >= 8 recommended (not tested with other Node versions)

```shell
npm install beload@git+https://github.com/hammus/beload.git
```

## Basic Usage
```javascript

const { app } = require("electron");
const { Beload } = require("beload");

// Globs to watach for changes
const glob = [`../**/*`, `../../css/**/*`];

//  Init Beload and Start watching files.
const Reloader = new Reload(glob, app, "all", {verbose: true});

```
## License
MIT License

Copyright (c) 2018 Liam Whan

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

/**
 * MIT License
 *
 * Copyright (c) 2024, Justin Randall, Smart Interactive Transformations Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to
 * deal in the Software without restriction, including without limitation the
 * rights to use, copy, modify, merge, publish, distribute, sublicense, and/or
 * sell copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS
 * IN THE SOFTWARE.
 */
// Import test libraries.
const expect = require('expect.js');
const itParam = require('mocha-param').itParam;
// Import libraries under test.
const {Utils} = require('../dist/index');

const testData = [
  {
    'input': '1st',
    'result': {matched: true, numeral: '1'},
  },
  {
    'input': '45th',
    'result': {matched: true, numeral: '45'},
  },
  {
    'input': '22nd',
    'result': {matched: true, numeral: '22'},
  },
  {
    'input': 'bob',
    'result': {matched: false, numeral: null},
  },
  {
    'input': 'first',
    'result': {matched: false, numeral: null},
  },
];

describe(`Utils.isOrdWord`, function() {
  itParam(
      'Utils.isOrdWord(${value.input}) === '+
        '${JSON.stringify(value.result)}',
      testData,
      function(value) {
        const result = Utils.isOrdWord(value.input);

        // console.log(`result: ${JSON.stringify(result)}`);

        const finalResult =
          (result.matched === value.result.matched) &&
          (result.numeric === value.result.numeric)
          ;

        expect(finalResult).to.be(true);
      },
  );
});

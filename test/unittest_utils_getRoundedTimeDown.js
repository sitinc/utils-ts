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

const expect = require('expect.js');
const itParam = require('mocha-param').itParam;
const {Utils} = require('../dist/index');

const testData = [
  {
    'input': new Date('2024-02-01 00:43:00'),
    'result': new Date('2024-02-01 00:30:00'),
    'pass': true,
  },
  {
    'input': new Date('2024-02-01 00:57:00'),
    'result': new Date('2024-02-01 00:30:00'),
    'pass': true,
  },
  {
    'input': new Date('2024-02-01 00:13:00'),
    'result': new Date('2024-02-01 00:00:00'),
    'pass': true,
  },
  {
    'input': new Date('2024-02-01 00:17:00'),
    'result': new Date('2024-02-01 00:00:00'),
    'pass': true,
  },
];

describe('Utils', function() {
  describe(`#getRoundedTimeDown(input)`, function() {
    itParam(
        '${value.input} === ${value.result} (expected pass=${value.pass})',
        testData,
        (entry) => {
          const updatedInput = Utils.getRoundedTimeDown(entry.input);
          console.log(`updatedInput: ${updatedInput}`);
          const result = (updatedInput.getTime() === entry.result.getTime());
          expect(result).to.be(entry.pass);
        },
    );
  });
});

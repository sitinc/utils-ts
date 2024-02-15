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
    'input': {
      'day': 1,
      'year': 2024,
      'month': 2,
      'partial': {
        'month': 2,
        'day': 1,
        'year': 2024,
      },
      'past': {
        'year': 2024,
        'month': 1,
        'day': 25,
      },
      'future': {
        'month': 2,
        'year': 2024,
        'day': 1,
      },
    },
    'result': '2024-02-01 00:00:00',
    'pass': true,
  },
  {
    'input': {
      'day': 21,
      'year': 2024,
      'month': 3,
    },
    'result': '2024-03-21 00:00:00',
    'pass': true,
  },
  {
    'input': {
      'minutes': 0,
      'future': {
        'seconds': 0,
        'nanos': 0,
        'minutes': 0,
        'hours': 14,
      },
      'nanos': 0,
      'partial': {
        'minutes': 0,
        'nanos': 0,
        'hours': 14,
        'seconds': 0,
      },
      'seconds': 0,
      'hours': 14,
      'past': {
        'hours': 2,
        'seconds': 0,
        'nanos': 0,
        'minutes': 0,
      },
    },
    'result': '2024-03-01 14:00:00',
    'pass': true,
  },
];

describe('Utils', function() {
  describe(`#getDateTimeString(input)`, function() {
    itParam(
        '${value.input} === ${value.result} (expected pass=${value.pass})',
        testData,
        (entry) => {
          const updatedInput = Utils.getDateTimeString(
              entry.input, new Date(Date.parse('2024-03-01 06:00:00.000')),
          );
          expect(updatedInput).to.be(entry.result);
        },
    );
  });
});

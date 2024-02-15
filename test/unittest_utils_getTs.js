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
    'input': {
      date: new Date(Date.parse('2023-11-15 00:00:00 GMT')),
      incMillis: false,
    },
    'result': '20231115000000',
  },
  {
    'input': {
      date: new Date(Date.parse('2023-12-31 00:00:00 GMT')),
      incMillis: false,
    },
    'result': '20231231000000',
  },
  {
    'input': {
      date: new Date(Date.parse('2023-04-16 04:00:00 GMT')),
      incMillis: false,
    },
    'result': '20230416040000',
  },
  {
    'input': {
      date: new Date(Date.parse('2022-10-31 02:00:00 GMT')),
      incMillis: false,
    },
    'result': '20221031020000',
  },
  {
    'input': {
      date: new Date(Date.parse('2023-06-27 03:30:00 GMT')),
      incMillis: true,
    },
    'result': '20230627033000000',
  },
  {
    'input': {
      date: new Date(Date.parse('2021-03-20 20:00:00 GMT')),
      incMillis: true,
    },
    'result': '20210320200000000',
  },
  {
    'input': {
      date: new Date(Date.parse('2021-02-22 01:00:00 GMT')),
      incMillis: true,
    },
    'result': '20210222010000000',
  },
  {
    'input': {
      date: new Date(Date.parse('2021-02-21 22:30:00 GMT')),
      incMillis: true,
    },
    'result': '20210221223000000',
  },
];

describe(`Utils.getTs`, function() {
  itParam(
      'Utils.getTs(${value.input.date}, ${value.input.incMillis}) === '+
        '${value.result}',
      testData,
      function(value) {
        const result = Utils.getTs(value.input.date, value.input.incMillis);

        // console.log(`result: ${result}`);

        expect(result).to.be(value.result);
      },
  );
});

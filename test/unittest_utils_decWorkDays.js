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
      date: new Date(Date.parse('2023-11-17 00:00:00 GMT')),
      days: 2,
      incSat: false,
      incSun: false,
    },
    'result': new Date(Date.parse('2023-11-15 00:00:00 GMT')),
  },
  {
    'input': {
      date: new Date(Date.parse('2023-11-22 00:00:00 GMT')),
      days: 3,
      incSat: false,
      incSun: false,
    },
    'result': new Date(Date.parse('2023-11-17 00:00:00 GMT')),
  },
  {
    'input': {
      date: new Date(Date.parse('2023-11-21 00:00:00 GMT')),
      days: 3,
      incSat: true,
      incSun: false,
    },
    'result': new Date(Date.parse('2023-11-17 00:00:00 GMT')),
  },
  {
    'input': {
      date: new Date(Date.parse('2023-11-20 00:00:00 GMT')),
      days: 3,
      incSat: true,
      incSun: true,
    },
    'result': new Date(Date.parse('2023-11-17 00:00:00 GMT')),
  },
  {
    'input': {
      date: new Date(Date.parse('2023-11-21 00:00:00 GMT')),
      days: 3,
      incSat: false,
      incSun: true,
    },
    'result': new Date(Date.parse('2023-11-17 00:00:00 GMT')),
  },
  {
    'input': {
      date: new Date(Date.parse('2023-12-29 00:00:00 GMT')),
      days: 30,
      incSat: false,
      incSun: false,
    },
    'result': new Date(Date.parse('2023-11-17 00:00:00 GMT')),
  },
  {
    'input': {
      date: new Date(Date.parse('2023-12-22 00:00:00 GMT')),
      days: 30,
      incSat: true,
      incSun: false,
    },
    'result': new Date(Date.parse('2023-11-17 00:00:00 GMT')),
  },
  {
    'input': {
      date: new Date(Date.parse('2023-12-17 00:00:00 GMT')),
      days: 30,
      incSat: true,
      incSun: true,
    },
    'result': new Date(Date.parse('2023-11-17 00:00:00 GMT')),
  },
];

describe(`Utils.decWorkDays`, function() {
  itParam(
      'Utils.decWorkDays('+
        '${value.input.date},${value.input.days},'+
        '${value.input.incSat},${value.input.incSun}) === ${value.result}',
      testData,
      function(value) {
        const result = Utils.decWorkDays(
            value.input.date,
            value.input.days,
            value.input.incSat,
            value.input.incSun,
        );

        const timeMatch =
          (result.getTime() === value.result.getTime());

        // console.log(`result: ${result}, timeMatch: ${timeMatch}`);

        expect(timeMatch).to.be(true);
      },
  );
});

import { test } from 'node:test';
import assert from 'node:assert/strict';
import { navigationParser } from './navigationParser.js';

test('parses navigation', async () => {
    /*
  assert.throws(
    () => sum('a', 2),
    { message: 'Both arguments must be numbers' },
    'Should throw an error for non-numeric inputs'
  );
  */

  const example = 'Navigational parameter required. Calculate the following course correction and transmit the result, followed by the pound key: Math.floor(((3350368 * 4534967) + (3450005 * 2178135) - (4889112 * 9402158)) / 8136009) % 8478';


  const actualObject = await navigationParser({
    message: example,
    state: {}
  });
  const expectedObject = { "type": "enter_digits", "digits": "-1788#" };

  // getting '6690#' from mathjs
  assert.deepStrictEqual(actualObject, expectedObject, "JSON object should be equal");
});
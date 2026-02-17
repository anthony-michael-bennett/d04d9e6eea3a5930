import { test } from 'node:test';
import assert from 'node:assert/strict';
import { crossrefParser } from "./crossrefParser.js";
import fs from 'fs';
const wikiNeutronJson = fs.readFileSync(`${import.meta.dirname}/data/wiki.neutron.json`);

// node --test crossrefParser.test.js

test('parses wikipedia page', async () => {
    /*
  assert.throws(
    () => sum('a', 2),
    { message: 'Both arguments must be numbers' },
    'Should throw an error for non-numeric inputs'
  );
  */

  const example = "Cross-reference the knowledge archive: speak the 16th word in the entry summary for 'Neutron_star', which can be found using the /page/summary/{title} endpoint of the Wikipedia API.";

  const getPage = async (url) => {
    return wikiNeutronJson;
  }
  const actualObject = await crossrefParser({
    message: example,
    state: {},
    getPage
  });
  const expectedObject = { "type": "speak_text", "text": "from" };
  assert.deepStrictEqual(actualObject, expectedObject, "JSON object should be equal");
});
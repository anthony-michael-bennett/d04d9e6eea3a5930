//import * as math from 'mathjs';
// mathjs returns 6690 for text.. some error after floor and %
import { Parser as math } from 'expr-eval';

const example = 'Navigational parameter required. Calculate the following course correction and transmit the result, followed by the pound key: Math.floor(((2526639 * 1022770) + (1789724 * 8758523) - (3177980 * 2734330)) / 2335318) % 2348';
 
const isNavigationMessage = (message) => {
    return message.startsWith('Navigational parameter required.');
};
  
const navigationParser = async ({message, state}) => {
    if (!isNavigationMessage(message)) {
        return null;
    }

    const startText = "followed by the pound key:";
    const startIndex = message.indexOf(startText) + startText.length;
    const mathStr = message.substring (startIndex).replaceAll("Math.","");
    console.log(mathStr)
    const result = math.evaluate(mathStr);
    return {
        "type": "enter_digits",
        "digits": `${result}#`
    };
};

export {
    navigationParser
};

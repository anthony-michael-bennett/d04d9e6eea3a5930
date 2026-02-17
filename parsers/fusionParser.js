import * as math from 'mathjs';

const example = 'Fusion reactor diagnostics. Compute the fuel consumption rate and transmit the result, followed by the pound key: (Math.floor((139141 * 543377) / (6436 + 9022)) + (92386 % 201)) % 9429';
 
const isFusionMessage = (message) => {
    return message.startsWith('Fusion reactor diagnostics.');
};
  
const fusionParser = async ({message, state}) => {
    if (!isFusionMessage(message)) {
        return null;
    }

    const startText = "followed by the pound key:";
    const startIndex = message.indexOf(startText) + startText.length;
    const mathStr = message.substring (startIndex).replaceAll("Math.","");
    const result = math.evaluate(mathStr);
    return {
        "type": "enter_digits",
        "digits": `${result}#`
    };
};

export {
    fusionParser
};

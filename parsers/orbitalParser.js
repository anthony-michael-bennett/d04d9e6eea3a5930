import * as math from 'mathjs';
const example = 'Orbital decay detected. Determine the trajectory offset and transmit the result, followed by the pound key: Math.floor((33665 + 66129 + 17500) * 134 / 44) % 9889';

 
const isOrbitalMessage = (message) => {
    return message.startsWith('Orbital decay detected.');
};
  
const orbitalParser = async ({message, state}) => {
    if (!isOrbitalMessage(message)) {
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
    orbitalParser
};

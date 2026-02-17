import * as math from 'mathjs';

const example = 'Shield frequency calibration needed. Evaluate the following harmonic sequence and transmit the result, followed by the pound key: (Math.floor(4861711 / 772) * 52 + 2678) % 8716';

const isShieldMessage = (message) => {
    return message.startsWith('Shield frequency calibration needed.');
};
  
const shieldParser = async ({message, state}) => {
    if (!isShieldMessage(message)) {
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
    shieldParser
};

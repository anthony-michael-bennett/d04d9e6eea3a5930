import * as math from 'mathjs';

const example = 'Life support recalibration. Calculate the oxygen recycling coefficient and transmit the result, followed by the pound key: Math.floor(1050 * (98698 - 7987) / 362) % 6280';

const isLiefsupportMessage = (message) => {
    return message.startsWith('Life support recalibration.');
};
  
const lifesupportParser = async ({message, state}) => {
    if (!isLiefsupportMessage(message)) {
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
    lifesupportParser
};

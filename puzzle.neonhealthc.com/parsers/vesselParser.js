const messageExample = {
    "type": "challenge", "message": [
        { "word": "Incoming", "timestamp": 320 },
        { "word": "vessels,", "timestamp": 4760 },
        { "word": "software", "timestamp": 2960 },
        { "word": "co-pilot", "timestamp": 1920 },
        { "word": "AI", "timestamp": 1600 },
        { "word": "1.", "timestamp": 5560 },
        { "word": "detected.", "timestamp": 920 },
        { "word": "frequency", "timestamp": 5480 },
        { "word": "your", "timestamp": 1160 },
        { "word": "an", "timestamp": 1520 },
        { "word": "vessel", "timestamp": 560 },
        { "word": "All", "timestamp": 4240 },
        { "word": "on", "timestamp": 5120 }, 
        { "word": "respond", "timestamp": 5040 }, 
        { "word": "by", "timestamp": 2200 },
        { "word": "respond", "timestamp": 3600 },
        { "word": "excellent", "timestamp": 2640 },
        { "word": "other", "timestamp": 4440 },
        { "word": "engineer,", "timestamp": 3320 },
        { "word": "If", "timestamp": 1000 },
        { "word": "built", "timestamp": 2120 },
        { "word": "on", "timestamp": 3680 },
	    { "word": "an", "timestamp": 2280 },
	    { "word": "is", "timestamp": 1440 },
	    { "word": "9.", "timestamp": 4120 },
		{ "word": "pilot", "timestamp": 1360 },
		{ "word": "frequency", "timestamp": 4040 }
    ]
};

// gets number after token until period
const getTokenNumber = (message, token, position) => {
    const retVal = {
        value: null,
        position: null
    };

    const tokenIndex = message.indexOf(token, position);
 
    if (tokenIndex === -1) {
        return {
            value: null,
            position
        };
    }

    const tokenEnd = tokenIndex + token.length;
    const valueEnd = message.indexOf(".", tokenEnd);
    const value = parseInt(message.substring(tokenEnd, valueEnd), 10);
    return {
        value,
        position: valueEnd
    };
}

const getFrequency = (message) => {
    let currentPosition = 0;
    const tokenSequence = [
        {
            token: "Incoming vessel detected. If your pilot is an AI co-pilot built by an excellent software engineer, respond on frequency ",
            key: "pilot",
            parser: getTokenNumber
        },
        {
            token: " All other vessels, respond on frequency ",
            key: "other",
            parser: getTokenNumber
        }
    ];
    
    return tokenSequence.reduce((acc, item) => {
        const {token, parser, key} = item;
        const {value, position} = parser(message, token, currentPosition);
        acc[key] = value;
        currentPosition = position;
        return acc;
    }, {});
}


const vesselParser = async ({message, state}) => {
    if (message.startsWith("Incoming vessel detected.")) {
        const {pilot, other} = getFrequency(message);
        state.pilot = pilot;
        state.other = other;
        return {
            "type": "enter_digits",
            "digits": pilot.toString()
        };
    }
    return null;
};

export {
    vesselParser
};


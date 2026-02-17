const example = "Transmission verification. Earlier you transmitted your crew member's work experience. Speak the 9th word of that transmission.";


const isVerificationMessage = (message) => {
    return message.startsWith('Transmission verification.');
}

const verificationParser = async ({message, state}) => {
    if (!isVerificationMessage(message)) {
        return null;
    }
   
    const word = parseInt(message.match(new RegExp("(\\d+)(?:th|nd) word"))[1], 10);

    const resultType = message.match(new RegExp("Earlier you transmitted your crew member's ([^.]*)\\."))[1];


    const mapper = {
        "work experience": "experienceParserResult",
        "best project": "bestprojectParserResult",
        "education": "educationParserResult"
    };

    // work experience

    return {
        "type": "speak_text",
        "text":  state[mapper[resultType]].text.split(" ")[word - 1]
    };
};

export {
    verificationParser
};


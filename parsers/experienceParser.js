const example = "Crew manifest continued. Speak a summary of your crew member's work experience based on the information in their resume, between 64 and 256 total characters.";

const isExperienceMessage= (message) => {
    return message.indexOf("Speak a summary of your crew member's work experience") !== -1;
};

const experienceParser = async ({message, state}) => {
    if (!isExperienceMessage(message)) {
        return null;
    }

    const result =  {
        "type": "speak_text",
        "text": "I'm experienced with MySQL, Postgres, Redis, MongoDB, perl, tcl, c#, node, php, java, javascript, AWS, linux."
    };

    state.experienceParserResult = result;

    return result;
};

export {
    experienceParser
};
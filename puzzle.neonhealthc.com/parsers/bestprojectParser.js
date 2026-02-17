const example = "Crew manifest continued. Speak a summary of your crew member's best project (work or personal) based on the information in their resume, between 64 and 256 total characters.";

const isBestprojectMessage= (message) => {
    return message.indexOf("Speak a summary of your crew member's best project") !== -1;
};

const bestprojectParser = async ({message, state}) => {
    if (!isBestprojectMessage(message)) {
        return null;
    }

    const result = {
        "type": "speak_text",
        "text": "Best project, shipping labels. Two person team, I'm lead. No library for Tcl. Best library PHP. I update open source server Naviserver to run latest PHP, other dev implements library. Done in 2 weeks, works in existing server farm."
    };

    state.bestprojectParserResult = result;

    return result;
};

export {
    bestprojectParser
};
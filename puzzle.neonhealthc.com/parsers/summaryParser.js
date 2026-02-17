
const exmple = "Crew manifest continued. Speak a summary of your crew member's skills based on the information in their resume, between 64 and 256 total characters.";

const isSummary = (message) => {
    return message.indexOf("Speak a summary of your crew member's skills") !== -1;
};

const summaryParser = async ({message, state}) => {
    if (!isSummary(message)) {
        return null;
    }

    return {
        "type": "speak_text",
        "text": "I kick ass every day. I have no idea how long this challenge is. Going to run some errands and get back to this"
    };
};

export {
    summaryParser
};
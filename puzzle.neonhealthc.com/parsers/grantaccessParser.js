const example = "Crew manifest continued. Speak the reason your crew member should be granted access to NEON based on the information in their resume, in less than 256 total characters. Convince us they're a good fit for the mission.";

const isGrantaccessMessage= (message) => {
    return message.indexOf("Speak the reason your crew member should be granted access to NEON") !== -1;
};

const grantaccessParser = async ({message, state}) => {
    if (!isGrantaccessMessage(message)) {
        return null;
    }

    return {
        "type": "speak_text",
        "text": "It looks like you do AI. I don't have AI experience but I learn quick and get stuff done.  I can adapt to what you have or implement today's best practices."
    };
};

export {
    grantaccessParser
};
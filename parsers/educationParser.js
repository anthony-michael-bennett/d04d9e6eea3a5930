
const exmple = "Crew manifest required. Speak a summary of your crew member's education based on the information in their resume, between 64 and 256 total characters.";
const isEducation= (message) => {
    return message.indexOf("Speak a summary of your crew member's education ") !== -1;
};

const educationParser = async ({message, state}) => {
    if (!isEducation(message)) {
        return null;
    }

    const result = {
        "type": "speak_text",
        "text": "I'm mostly self taught. Currently developing in NodeJs. Had some college with C and C++. Dropped out of Washington State University."
    };

    state.educationParserResult = result;

    return result;
};

export {
    educationParser
};
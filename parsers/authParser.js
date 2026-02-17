
// got this from watching console logs on web site
const neonId = "d04d9e6eea3a5930";

const authParser = async ({message, state}) => {
    if (message === 'Transmit your vessel authorization code, followed by the pound key.') {
        return {
            "type": "enter_digits",
            "digits": `${neonId}#`
        };
    }
    return null;
}

export {
    authParser
};

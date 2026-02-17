import { vesselParser } from "./parsers/vesselParser.js";
import { authParser } from "./parsers/authParser.js";
import { fusionParser } from "./parsers/fusionParser.js";
import { summaryParser } from "./parsers/summaryParser.js";
import { crossrefParser } from "./parsers/crossrefParser.js";
import { shieldParser } from "./parsers/shieldParser.js";
import { educationParser } from "./parsers/educationParser.js";
import { lifesupportParser } from "./parsers/lifesupportParser.js";
import { bestprojectParser } from "./parsers/bestprojectParser.js";
import { grantaccessParser } from "./parsers/grantaccessParser.js";
import { orbitalParser } from "./parsers/orbitalParser.js";
import { experienceParser } from "./parsers/experienceParser.js";
import { verificationParser } from "./parsers/verificationParser.js";
import { navigationParser } from "./parsers/navigationParser.js";


const state = {

};

function unjumble(message) {

    const unjumbled = [...message];
    unjumbled.sort((a,b) => {
        if (a.timestamp < b.timestamp) return -1;
        if (a.timestamp > b.timestamp) return 1
        return 0;
    });
    return unjumbled.map(m=>m.word).join(' ');
};


const parsers = [
    vesselParser,
    authParser,
    fusionParser,
    summaryParser,
    crossrefParser,
    shieldParser,
    educationParser,
    lifesupportParser,
    bestprojectParser,
    grantaccessParser,
    orbitalParser,
    experienceParser,
    verificationParser,
    navigationParser
];

const messageParser = async (messageData, socket) => {
    const message = JSON.parse(messageData);
    if (message.type === 'challenge') {
        const unjumbled = unjumble(message.message);
        console.log({unjumbled: unjumbled});
        
        for (const parser of parsers) {
            const responseMessage = await parser({message: unjumbled, state});
            if (responseMessage !== null) {
                console.log(responseMessage);
                socket.send(JSON.stringify(responseMessage));
                break;
            }
        }
    };
};

const main = async () => {

    const url = 'puzzle.neonhealth.com/agent-puzzle/challenge'
    // 'ws://neonhealth.software/agent-puzzle/challenge'
    // Creates a new WebSocket connection to the specified URL.


    const socket = (() => {
        try {
            return new WebSocket('wss://neonhealth.software/agent-puzzle/challenge');
        } catch (err) {
            console.log('error here')
            console.log(err);
            throw (err);
        }
    })();


    const enterDigits = (digits) => {
        socket.send(JSON.stringify({
            "type": "enter_digits",
            "digits": digits.toString()
        }));
    };

    const speakText = (text) => {
        socket.send(JSON.stringify({
            "type": "speak_text",
            "text": text
        }));
    };

    // Executes when the connection is successfully established.
    socket.addEventListener('open', event => {
        console.log('WebSocket connection established!');
        // Sends a message to the WebSocket server.
        //socket.send('Hello Server!');
    });

    // Listen for messages and executes when a message is received from the server.
    socket.addEventListener('message', event => {
        console.log('Message from server: ', event.data);
        messageParser(event.data, socket);
    });

    // Executes when the connection is closed, providing the close code and reason.
    socket.addEventListener('close', event => {
        console.log('WebSocket connection closed:', event.code, event.reason);
    });

    // Executes if an error occurs during the WebSocket communication.
    socket.addEventListener('error', error => {
        console.log('test');
        console.error('WebSocket error:', error);
    });
};


main();

//console.log(getFrequency(unjumble(messageExample.message)));
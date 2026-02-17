const isCrossref = (message) => {
    return message.startsWith('Cross-reference the knowledge archive:');
}

async function getWebPageHtml(url) {
  try {
    const response = await fetch(url);

    // Check if the response status is okay (e.g., 200-299)
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const html = await response.text();
    return html;

  } catch (error) {

    console.error("Unable to fetch webpage:", error);
  }
}


const crossrefParser = async ({message, state, getPage = getWebPageHtml}) => {
    if (!isCrossref(message)) {
        return null;
    }
    const lang = 'en';
    const title = message.match(new RegExp("summary for '(.*?)'"))[1];
    const url = `https://${lang}.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(title)}`;
    const response = await getPage(url);
    const word = parseInt(message.match(new RegExp("(\\d+)th word"))[1], 10);

    return {
        "type": "speak_text",
        "text": JSON.parse(response).extract.split(" ")[word - 1]
    };
};

export {
    crossrefParser
};

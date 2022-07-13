// currentTime(ms) - blocktime(ms) = TIME IN MILLISECONDS
export const millisecondsToTime = (ms) => {
    let timestamp = ms;
    let currentTime = new Date().getTime();

    ms = currentTime - timestamp;
    let seconds = ms / 1000

    let minutes = Math.floor(seconds / 60);
    let hours = Math.floor(seconds / (60 * 60));
    let days = Math.floor(seconds / (60 * 60 * 24));

    if (days < 1) {
        if (hours < 1) {
            if (minutes < 1) {
                return `Less than a minute ago`
            } else return minutes > 1 ? `${minutes} minutes ago` : `${minutes} minute ago`
        } else return hours > 1 ? `${hours} hours ago` : `${hours} hour ago`
    } else {
        // Days
        if (days < 7){
            return days > 1 ? `${days} days ago` : `${days} day ago`
        } else {
            // Weeks
            if (days < 31){
                return Math.floor(days / 7) === 1 ? `1 week ago` : `${Math.floor(days / 7)} weeks ago`
            } else {
                // Months
                if (days < 365){
                    return Math.floor(days / 31) === 1 ? `1 month ago` : `${Math.floor(days / 31)} months ago`
                } else {
                    // Years
                    return Math.floor(days / 365) === 1 ? `1 year ago` : `${Math.floor(days / 356)} years ago`
                }
            }
        }
    }
}

export const formatDate = (date) => {
    let splitDate = date.split("T");
    return splitDate[0]
}

export const escapeAllInnerQuotes = (str) => {
    let index = str.indexOf(`,"blockId":`);

    let firstPart = str.slice(0, 12);

    let secondPart = '"' + str.slice(12, index).slice(1, -1).replace(/`/g, "\`").replace(/'/g, "\'").replace(/"/g, '\\"') + '"';

    let lastPart = str.slice(index);

    return firstPart + secondPart + lastPart;
}

export const jsonEscape = (str) => {
    let newString = escapeAllInnerQuotes(str);

    let newStr = newString.replace(/\n/g, "\\n").replace(/\r/g, "\\r").replace(/\t/g, "\\t");

    return newStr
}

export const decode = (messageToDecode) => {
    let decodedTokenMetadata = Buffer.from(messageToDecode, "base64").toString();
    decodedTokenMetadata = JSON.parse(jsonEscape(decodedTokenMetadata));

    return decodedTokenMetadata;
}

export const shortenAddress = (address) => {
    let firstPart;
    let lastPart;

    if (address !== null && address !== undefined) {
        firstPart = address.slice(0, 6);
        lastPart = address.slice(-6);
        return firstPart + "..." + lastPart;
    }

    return "";
}
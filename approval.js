function addEmoji() {
    var field = document.getElementById("pull_request_review_body");
    if (field) {
        console.log('Found field');
        field.value = ':+1: ' + getEmoji() + ' ' + field.value;
        console.log('Set text value to "' + field.value + '"');
    } else {
        console.log('Could not find field');
    }
}

function getEmoji() {
    return emojis[Math.floor(Math.random() * emojis.length)];
}

addEmoji();

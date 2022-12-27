
// Length of a day in milliseconds
const daylen = 1000 * 60 * 60 * 24;

// Global time, slightly modified for time zones
function globTime() {
    return new Date().getTime() + 1000 * 60 * 60 * 1;
}

// Display the time until the word of the day is updated
// If the timer hits zero, this function will also refresh the page
function updateTimeTill() {
    curTime = globTime();
    roundTime = Math.ceil(curTime / daylen) * daylen;
    timeDiff = roundTime - curTime;
    if (timeDiff <= 0)
        location.reload();
    h = Math.floor(timeDiff / 1000 / 60 / 60);
    m = Math.floor(timeDiff / 1000 / 60) - 60 * h;
    s = Math.floor(timeDiff / 1000) - 60 * 60 * h - 60 * m;
    if (m < 10)
        m = "0" + m;
    if (s < 10)
        s = "0" + s;
    $("#timetillnext").text("" + h + ":" + m + ":" + s);
}

// The (short) word of today
const wordToday = shortWords[Math.floor(globTime() / 3600000 / 24) %
shortWords.length];

// All words that contain the short word
wordsContain = [];
longestlen = 0;
for (const word of words) {
    if (word.includes(wordToday)) {
        wordsContain.push(word);
        if (word.length > longestlen)
            longestlen = word.length;
    }
}
console.log(wordsContain);

// Currently guessed words
guessList = [];

// Add a word to the displayed list of words
function addWordToList(word) {
    startpos = -1;
    for (i = 0; i < word.length - wordToday.length; i++) {
        correct = true;
        for (j = 0; j < wordToday.length; j++) {
            if (word[i + j] != wordToday[j]) {
                correct = false;
                break;
            }
        }
        if (correct) {
            startpos = i;
            break;
        }
    }
    guessList.push(word);
    txt = "<div class=\"guess\">";
    for (i = 0; i < word.length; i++) {
        txt += "<div class=\"guesstile guesstilenew";
        if (i >= startpos && i < startpos + wordToday.length)
            txt += " guesstileshort";
        txt += "\">";
        txt += ("" + word.charAt(i)).toUpperCase();
        txt += "</div>";
    }
    txt += "<div class=\"guesslen\">";
    txt += word.length;
    txt += "</div>";
    txt += "</div>";
    $("#guesscontainer").append(txt);
    setTimeout(() => {
        $(".guesstilenew").removeClass("guesstilenew");
    }, 100);
    $("#maincontainer").animate({ scrollTop: $("#maincontainer").height() });
}

// Check if a specific word is valid
// Returns a boolean indicating if the word is valid and contains today's word
function checkWord(guess) {
    if (!guess.includes(wordToday))
        return false;
    if (!wordsContain.includes(guess))
        return false;
    if (guessList.includes(guess))
        return false;
    return true;
}

// Check the currently filled in word
// If the word is correct, the input field will be emptied
function sendInWord() {
    word = $("#guessfield").val()
    if (checkWord(word.toLowerCase())) {
        $("#guessfield").val("");
        addWordToList(word.toLowerCase());
    }
}

$("#wordtoday").text(wordToday.toUpperCase());
$("#maxlen").text(longestlen);
updateTimeTill();
setInterval(updateTimeTill, 1000);
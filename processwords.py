
SHORTWORD_LEN = [3, 4]
SHORTWORD_APPEAR_RANGE = [25, 60]



import random

# Read words from input file: contains a lot of words we do not want to add!
file = open("words.txt", "r")
wordlist = [line.strip() for line in file.readlines()]
file.close()

# Legal characters, intentionally does not include uppercase characters
legalchars = "abcdefghijklmnopqrstuvwxyz"

# Filter words
wordsFilter = []
shortWords = []
for word in wordlist:
    accept = True
    for c in word:
        if c not in legalchars:
            accept = False
    if accept:
        wordsFilter.append(word)
        if SHORTWORD_LEN[0] <= len(word) and len(word) <= SHORTWORD_LEN[1]:
            shortWords.append(word)
count = 0
shortWordsFilter = []
for shortword in shortWords:
    count += 1
    print("processing " + str(count) + " out of " + str(len(shortWords)) +
    "...")
    cur = 0
    for word in wordsFilter:
        if shortword in word:
            cur += 1
    if SHORTWORD_APPEAR_RANGE[0] <= cur and cur <= SHORTWORD_APPEAR_RANGE[1]:
        shortWordsFilter.append(shortword)
random.shuffle(shortWordsFilter)
print("selected " + str(len(shortWordsFilter)) + " short words.")

# Write to output files
jsfile = open("words.js", "w")
shortjs = open("shortwords.js", "w")
jsfile.write("const words = [")
shortjs.write("const shortWords = [")
for word in wordsFilter:
    jsfile.write("\"" + word + "\",\n")
for word in shortWordsFilter:
    shortjs.write("\"" + word + "\",\n")
jsfile.write("];")
shortjs.write("];")
jsfile.close()
shortjs.close()


import random

file = open("words.txt", "r")
wordlist = [line.strip() for line in file.readlines()]

jsfile = open("words.js", "w")
jsfile.write("const words = [")
legalchars = "abcdefghijklmnopqstuvwxyz"
for word in wordlist:
    accept = True
    for c in word:
        if c not in legalchars:
            accept = False
    if accept:
        jsfile.write("\"" + word + "\",\n")
jsfile.write("];")

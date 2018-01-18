
# T9
[T9](https://en.wikipedia.org/wiki/T9_(predictive_text)) predictive text application made with React.js and [trie](https://en.wikipedia.org/wiki/Trie) approach.

## Instalation
To install application download this repository and run
```
npm i
npm start
```
it will launch on ```localhost:3001```

## Usage and how it works
This application uses [array-of-english-words](https://github.com/words/an-array-of-english-words) library as a dictionary source file. ```class Trie``` builds trie tree object with letter keys. Method ```getExpansions()``` returns all posible expansions of inputed numeric input.

```<TextConventer>``` component saves in its local state numeric input inputed by the user using keyboard or ux virtual keyboard this keyboard is decoded to possible expansions after every input/delete according to the number keyboard. 
Output text area is fully controled by this application including text inputing, deleting and arrow navigation. Arrow navigation is possible only between words, so every input is always added to the end of the current word.
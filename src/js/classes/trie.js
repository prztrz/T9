class Trie {
    constructor(words) {
        this.words = words;
        this.charMap = {
            1: '.,-',
            2: 'abc',
            3: 'def',
            4: 'ghi',
            5: 'jkl',
            6: 'mno',
            7: 'pqrs',
            8: 'tuv',
            9: 'wxyz'
        }
        this.buildTree()
    }

    buildTree = () => {
        const tree = {};
        let leaf = tree;

        this.words.forEach(word => {
            word = word.toLowerCase();
            for (let i = 0; i<word.length; i++) {
                if (i === 0) {
                    leaf = tree;
                }
                let currLetter = word[i];

                if (!leaf[currLetter]) {
                    leaf[currLetter] = {}
                }

                leaf = leaf[currLetter];
            }


        })

        this.tree = tree;
    }

    getExpansions = (sequence,expansions,expansion,index,leaf) => {
        if (sequence === '') {
            return [];
        }
        sequence = sequence.toString();
        expansions = expansions || [];
        expansion = expansion || ''
        index = index || 0;
        leaf = leaf || this.tree;

        //check each letter in current level of trie tree
        for (let letter in leaf) {
            //add a letter to the current expansion if the current character of the sequence maps to this letter   
            if (this.charMap[sequence[index]].indexOf(letter) !== -1) {
                let word = expansion + letter;
                //if the last possible level of the tree (i.e. the last character of the sequence) is being checked push the resulted word to the expansions array
                if (index >= sequence.length-1) {
                    expansions.push(word)
                } else {
                    //go to the next level of the tree
                    this.getExpansions(sequence,expansions,word,index+1,leaf[letter])
                }
            }
        }

        return expansions;
    }

    getTree = () => {
        return this.tree
    }

}

export default Trie;
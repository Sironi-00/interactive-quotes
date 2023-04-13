// purpose -> Gives user a quote and asks the to complete the missing words.

let quote = "'The scariest moment is always before you start.' - Stephen King"

let getWords = (quote, count) => {
    // get {count} words from {quote}
    
    let splitQuote = quote.split(" ");
    let words = [];

    while (words.length < count) {
        let randIndex = Math.floor(Math.random() * splitQuote.length);
        let gotWord = splitQuote[randIndex]

        if (words.includes(gotWord) || gotWord.length < 2) continue;
        
        words.push(gotWord);
    }
    return words;
}

let blurQuote = (quote, toBlur) => {
    // censores extracted words from a quote.
    let myQuote = quote;
    toBlur.forEach(word=> {
        myQuote = myQuote.replace(word, "_".repeat(word.length))
    })
    return myQuote;
}


let machine = (quote) => {
    // random int [2 - 4]
    let guesses = Math.floor(Math.random() * 3) + 2;
    
    // an array of sting from quotes
    let guessChoices = getWords(quote, guesses);
    
    // a blurred quote
    let quoteQuestion = blurQuote(quote, guessChoices);

    //returns an 
    return {
       question: quoteQuestion,
       answers: guessChoices 
    }

}

// Test 
let playQuote = machine(quote);
console.log(playQuote.question);
console.log(playQuote.answers);
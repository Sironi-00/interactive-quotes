// purpose -> Gives user a quote and asks the to complete the missing words.

let srcQuotes = ["'The scariest moment is always before you start.' - Stephen King"
,"'If you want to achieve greatness stop asking for permission.' - Anonymous"
,"'Things work out best for those who make the best of how things work out.' - John Wooden"
,"'To live a creative life, we must lose our fear of being wrong.' - Anonymous"
,"'If you are not willing to risk the usual you will have to settle for the ordinary.' - Jim Rohn"
,"'Trust because you are willing to accept the risk, not because it's safe or certain.' - Anonymous"
,"'Take up one idea. Make that one idea your life - think of it, dream of it, live on that idea. Let the brain, muscles, nerves, every part of your body, be full of that idea, and just leave every other idea alone. This is the way to success.' - Swami Vivekananda"
,"'All our dreams can come true if we have the courage to pursue them.' - Walt Disney"
,"'Good things come to people who wait, but better things come to those who go out and get them.' - Anonymous"
,"'If you do what you always did, you will get what you always got.' - Anonymous"
,"'Success is walking from failure to failure with no loss of enthusiasm.' - Winston Churchill"
,"'Just when the caterpillar thought the world was ending, he turned into a butterfly.' - Proverb"
,"'Successful entrepreneurs are givers and not takers of positive energy.' - Anonymous"
,"'Whenever you see a successful person you only see the public glories, never the private sacrifices to reach them.' - Vaibhav Shah"
,"'Opportunities don't happen, you create them.' - Chris Grosser"
,"'Try not to become a person of success, but rather try to become a person of value.' - Albert Einstein"
,"'Great minds discuss ideas; average minds discuss events; small minds discuss people.' - Eleanor Roosevelt"
,"'I have not failed. I've just found 10,000 ways that won't work.' - Thomas A. Edison"
,"'If you don't value your time, neither will others. Stop giving away your time and talents- start charging for it.' - Kim Garst"
,"'A successful man is one who can lay a firm foundation with the bricks others have thrown at him.' - David Brinkley"
,"'No one can make you feel inferior without your consent.' - Eleanor Roosevelt"
,"'The whole secret of a successful life is to find out what is one's destiny to do, and then do it.' - Henry Ford"
,"'If you're going through hell keep going.' - Winston Churchill"
,"'The ones who are crazy enough to think they can change the world, are the ones that do.' - Anonymous"
,"'Don't raise your voice, improve your argument.' - Anonymous"
,"'What seems to us as bitter trials are often blessings in disguise'.-  Oscar Wilde"
,"'The meaning of life is to find your gift. The purpose of life is to give it away.' - Anonymous"
,"'The distance between insanity and genius is measured only by success.' - Bruce Feirstein"
,"'When you stop chasing the wrong things you give the right things a chance to catch you.' - Lolly Daskal"
,"'Don't be afraid to give up the good to go for the great.' - John D. Rockefeller"
,"'No masterpiece was ever created by a lazy artist'.-  Anonymous"]


let machine = (srcArr) => {
    let newQuote = srcArr[Math.floor(Math.random() * srcArr.length)];

    // an array of missing words from quotes
    let guessChoices = getWords(newQuote);
    
    // a blurred quote
    let quoteQuestion = blurQuote(newQuote, guessChoices);

    //returns an 
    return {
        quote: newQuote,
       question: quoteQuestion,
       answers: guessChoices
    }
}

let getWords = (quote) => {
    // random int [2 - 4] for missing words count
    let guesses = Math.floor(Math.random() * 3) + 2;
    
    let splitQuote = quote.split(" ");
    let words = [];

    while (words.length < guesses) {
        // get a random word from a quote
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
        myQuote = myQuote.replace(word, "_".repeat(4))
    })
    return myQuote;
}

let currentQuotation = machine(srcQuotes);
let userQuote = "";

let clickLoad = () => {
    currentQuotation = machine(srcQuotes);
    renderQuestion(currentQuotation.question);
    renderAnswers(currentQuotation.answers);
}

let renderQuestion = (string) => {
    document.getElementById("quote").innerHTML = string;
}

let renderAnswers = (answers) => {
    let div = document.getElementById("choices");
    div.innerHTML = "";
    
    answers.forEach(choice => {
        let choiceNode = document.createElement("input");
        choiceNode.type = "button";
        choiceNode.value = choice;
        choiceNode.addEventListener("click", fillAnswers);
        div.appendChild(choiceNode);

    })
}

let clickReveal = () => {
    renderQuestion(currentQuotation.quote);
}

let clickClear = () => {
    renderQuestion(currentQuotation.question); 
    renderAnswers(currentQuotation.answers);
}

let fillAnswers = (event) => {
    let missingWord = event.target.value;
    let stringQuote = document.getElementById("quote");
    userQuote = stringQuote.innerHTML.replace("____", missingWord);
    renderQuestion(userQuote);
    event.target.remove();
    validate()
}

let validate = () => {
    if (currentQuotation.quote === userQuote) return console.log("Equal");
    if (currentQuotation.quote.length == userQuote.length) console.log("Not Equal");
}

clickLoad();


document.getElementById("reload").addEventListener("click", clickLoad)
document.getElementById("reveal").addEventListener("click", clickReveal);
document.getElementById("clear").addEventListener("click", clickClear);
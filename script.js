const quoteContainer=document.getElementById('quote-container');
const quoteText=document.getElementById('quote');
const authorText=document.getElementById('author');
const twitterBtn=document.getElementById('twitter');
const newQuoteBtn=document.getElementById('new-quote');
const loader=document.getElementById('loader');

let apiQuotes=[];
const loading=()=>{
    loader.hidden=false;
    quoteContainer.hidden=true;
}
const complete=()=>{
    loader.hidden=true;
    quoteContainer.hidden=false;
}
const newQuote=()=>{
    loading();
    const quote=apiQuotes[Math.floor(Math.random()*apiQuotes.length)]
    console.log(quote);
    quote.text.length>50?quoteText.classList.add('long-quote'):quoteText.classList.remove('long-quote');
    quoteText.textContent=quote.text;
    
    authorText.textContent=quote.author??'Anonymous'; 
    complete();

}

async function getQuotes(){
    try{
    const response=await fetch('https://type.fit/api/quotes');
    apiQuotes=await response.json();
      newQuote();
}
    catch(error){console.log(error)}
}
getQuotes();

const tweetQuote=()=>{
    const twitterUrl=`https://twitter.com/intent/tweet?text=${quoteText.textContent}--${authorText.textContent}`;
    window.open(twitterUrl,'_blank');
}

newQuoteBtn.onclick=newQuote;
twitterBtn.onclick=tweetQuote;
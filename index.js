const languages=["Afrikaans","Albanian","Amharic","Arabic","Armenian","Belarusian","Bengali","Bosnian","Cebeano","Czech","Danish","Dutch","English","Estonian","French","German","Greek","Gujarati","Hindi","Irish","Japanese","Kannada","Korean","Latin","Malayalam","Marathi","Nepali","Polish","Punjabi","Russian","Spanish","Tamil","Telugu","Welsh"];
const selects=document.querySelectorAll('.options');
const translateBtn=document.getElementById('translate');
const leftText=document.getElementById('lefttext');
const rightText=document.getElementById('righttext');
const leftlang=document.getElementById('leftoption');
const notification=document.getElementById('notification');
const rightlang=document.getElementById('rightoption');
const volumeIcons=document.getElementsByClassName('volume');
const clipboard=document.getElementsByClassName('clipboard');
for(const i of volumeIcons){
    i.addEventListener('click',(er)=>{
        const a=er.target;
        let says;
        if(a.id=="first"){
            says=new SpeechSynthesisUtterance(leftText.value);
            says.lang=leftlang.value;
        }
        else{
            says=new SpeechSynthesisUtterance(rightText.value);
            says.lang=rightlang.value;
        }
        speechSynthesis.speak(says);
    })
}
for(const i of clipboard){
    i.addEventListener('click',(er)=>{
        var a=er.target;
        if(a.id=="left"){
            navigator.clipboard.writeText(leftText.value);
        }
        else{
            navigator.clipboard.writeText(rightText.value);
        }
        createCopiedToast();
    })
}
for(const select of selects){
    for(const obj of languages){
        const option=document.createElement('option');
        option.classList.add('option');
        option.innerHTML=obj;
        select.appendChild(option);
    }
}
const removeToast=(div)=>{
    notification.removeChild(div);
}   
const createSuccessToast=()=>{
    const div=document.createElement('div');
    div.classList.add('toast');
    div.classList.add('success');
    // div.classList.add('hide');
    div.innerHTML=`<i class="fa-sharp fa-solid fa-thumbs-up" id="tick"></i>
    <span>Translated</span>
    <i class="fa-sharp fa-solid fa-xmark" id="cross"></i>`
    notification.appendChild(div);
    setTimeout(()=>removeToast(div),4000);
}
const createCopiedToast=()=>{
    const div=document.createElement('div');
    div.classList.add('toast');
    div.classList.add('success');
    // div.classList.add('hide');
    div.innerHTML=`<i class="fa-solid fa-copy"></i>
    <span>Copied</span>
    <i class="fa-sharp fa-solid fa-xmark" id="cross"></i>`
    notification.appendChild(div);
    setTimeout(()=>removeToast(div),4000);
}
const createErrorToast=()=>{
    const div=document.createElement('div');
    div.classList.add('toast');
    div.classList.add('error');
    // div.classList.add('hide');
    div.innerHTML=`<i class="fa-sharp fa-solid fa-bug" id="bug"></i>
    <span>Error</span>
    <i class="fa-sharp fa-solid fa-xmark" id="cross"></i>`
    notification.appendChild(div);
    setTimeout(()=>removeToast(div),4000);
}
// button to translate language to language
translateBtn.addEventListener('click',(er)=>{
    if(leftText.value==''){
        alert('Empty Text');
        createErrorToast();
    }
    const dataObj={
        "text":leftText.value
    }
    const options = {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
            'X-RapidAPI-Key': 'effa8a7be7msh6815247feef4b05p1ef3a1jsnd528f381211c',
            'X-RapidAPI-Host': 'translate-language.p.rapidapi.com'
        },
        body: JSON.stringify(dataObj)
    };
    
    fetch(`https://translate-language.p.rapidapi.com/translate?to_language=${rightlang.value}&from_language=${'English'}`, options)
        .then(response => response.json())
        .then(response => {
            console.log(response)
            rightText.value=response.data.text
            createSuccessToast();
        })
        .catch(err => console.error(err));
})
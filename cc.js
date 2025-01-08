 const base_url = "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies";
 const dropdown = document.querySelectorAll(".dropdown select");
 const btn = document.querySelector("form button");
 const fromCurr = document.querySelector(".from select");
 const toCurr = document.querySelector(".to select");
 const msg = document.querySelector(".msg");

 
for (let select of dropdown){
    for (let currCode in countryList){
        let newOpt = document.createElement("option");
        newOpt.innerText = currCode;
        newOpt.value = currCode;
        if(select.name === "from" && currCode === "USD"){
            newOpt.selected = "selected";
        }else if(select.name === "to" && currCode === "INR"){
            newOpt.selected = "selected";
        }
        select.append(newOpt);
    }
    select.addEventListener("change",(evt)=>{
        updateFlag(evt.target);
    });
}

const updateFlag  = (element) => {
    let currCode = element.value;
    let countryCode = countryList[currCode];
    let newSrc =`https://flagsapi.com/${countryCode}/flat/64.png`; 
     let img = element.parentElement.querySelector("img");
     img.src = newSrc;
    };


const updateExchnageRate = async () => {   
    let amount = document.querySelector(".amount input");
    let amtVal = amount.value;
    if(amtVal === "" || amtVal < 1 ){
        amtVal = 1;
        amount.value = "1";
    }

    //updated url structure
    const url =`${base_url}/${fromCurr.value.toLowerCase()}.json`;

    let response = await fetch(url);
    let data = await response.json();
    let rate = data[fromCurr.value.toLowerCase()][toCurr.value.toLowerCase()];
    let finalAmt = amtVal*rate;
    msg.innerText=`${amtVal} ${fromCurr.value} = ${finalAmt} ${toCurr.value}`;
};



btn.addEventListener("click", (evt) => { 
    evt.preventDefault();
    updateExchnageRate();
});

window.addEventListener("load",() => {
    updateExchnageRate();
});












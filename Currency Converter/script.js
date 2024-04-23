const btn = document.querySelector(".btn");
const selects = document.querySelectorAll("select");
let fromval = document.querySelector(".from select");
let toval = document.querySelector(".to select");

for (const oneS of selects) {
    for (const code in country_list) {
        const option = document.createElement("option");
        option.innerHTML = `<option value="${code}">${code}</option>`;
        if (code == "USD" && oneS.name == "first") {
            option.setAttribute("selected", "selected");
        }
        else if (code == "INR" && oneS.name == "second") {
            option.setAttribute("selected", "selected");
        }
        oneS.append(option);
    }
    oneS.addEventListener("change", (e) => {
        updateflag(e.target);
    })
}

const arrowicon = document.querySelector(".icon");
arrowicon.addEventListener("click", () => {
    let temp = fromval.value;
    fromval.value = toval.value;
    toval.value = temp;
    updateflag(toval);
    updateflag(fromval);
    convert();
});

const updateflag = (ele) => {
    const val = ele.value;
    const img = ele.parentElement.querySelector("img");
    img.src = `https://flagcdn.com/48x36/${country_list[val].toLowerCase()}.png`;
}


const convert = async () => {
    let amt = document.querySelector("input");
    let text = document.querySelector(".text");
    text.innerText = "Geting exchange rate...";
    let currency = amt.value;
    if (currency == "" || currency <= 0) {
        currency = 1;
        amt.value = "1";
    }
    const URL = `https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/${fromval.value.toLowerCase()}.json`;
    const promise = await fetch(URL);
    const data = await promise.json();
    const amount = data[fromval.value.toLowerCase()][toval.value.toLowerCase()];
    const totalamt = (amt.value) * amount;
    text.innerHTML = `${amt.value} ${fromval.value} = ${totalamt} ${toval.value}`;
}

btn.addEventListener("click", (e) => {
    e.preventDefault();
    convert();
});

window.addEventListener("load", convert);

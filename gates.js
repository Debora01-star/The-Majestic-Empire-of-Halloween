//render() = de tekenaar en  state = wat hebben we?

const state = {   //het geheugen van de app, de data die we nodig hebben om de app te laten werken
    blokken: [
        {
            id: 1,
            type: "kop",
            tekst: "Halloween Party!"
        },
        {
            id: 2,
            type: "tekst",
            tekst: "Join us if you dare..."
        },
        {
            id: 3,
            type: "knop",
            tekst: "Join the Party"
        }
    ],
    geselecteerdId: null, //  voor als er geen selecteerde blok is 
    volgendId: 4
};
console.log("TEST: gates.js werkt!");
console.log(state.blokken.length);


function render(){  //render() = wat laten we zien?
    const overzicht = document.getElementById("blokkenOverzicht");

    overzicht.textContent = "";

    state.blokken.forEach(function(blok) {
        const item = document.createElement("p");
        item.textContent = blok.tekst;
        
        if (state.geselecteerdId === blok.id) {
        item.classList.add("geselecteerd");
}


        item.addEventListener("click", function() {
            state.geselecteerdId = blok.id; //blok.id bewaart welk blok is geselecteerd
            render();
            console.log("Geselecteerd blok:", state.geselecteerdId);
});

        overzicht.appendChild(item);
    });

   
const voorbeeld = document.getElementById("voorbeeldWeergave");
voorbeeld.textContent = "";


if (state.blokken.length === 0) {
    const melding = document.createElement("p");
    melding.textContent = "Er zijn nog geen blokken toegevoegd.";
    voorbeeld.appendChild(melding);
}


state.blokken.forEach(function(blok) {
    let element;

    if (blok.type === "kop") {
        element = document.createElement("h2");
    } else if (blok.type === "tekst") {
        element = document.createElement("p");
    } else if (blok.type === "knop") {
        element = document.createElement("button");
    
    if (blok.id === 3) {
            element.addEventListener("click", openGates);
        }
    }

    element.textContent = blok.tekst;
    voorbeeld.appendChild(element);
});


const invoerveld = document.getElementById("blokTekst");

const geselecteerdBlok = state.blokken.find(function(blok) { // find() zoekt in onze array het blok waarvan het id overeenkomt met state.geselecteerdId
    return blok.id === state.geselecteerdId;
});

const toepassenBtn = document.getElementById("toepassenBtn");
const selectieInfo = document.getElementById("selectieInfo"); // het zoek onze bestaande <p>
const verwijderenBtn = document.getElementById("verwijderenBtn");

if (geselecteerdBlok) {
    invoerveld.value = geselecteerdBlok.tekst; // text van de invoerveld verschijnt en wordt het veld actief
    invoerveld.disabled = false;
    toepassenBtn.disabled = false;            //moet werken alleen wanneer een blok echt is geselecteerd 
    verwijderenBtn.disabled = false;

    selectieInfo.textContent = "Geselecteerd blok: " + geselecteerdBlok.type; // met type selecteer ik welke blok, kop, tekst of knop

} else {
    invoerveld.value = "";                    //anders schakelen we het uit
    invoerveld.disabled = true;
    toepassenBtn.disabled = true;
    verwijderenBtn.disabled = true;

    selectieInfo.textContent = "Selecteer eerst een blok in het blokkenoverzicht.";
}
}


render();


document.getElementById("toepassenBtn").addEventListener("click", function() {

    const geselecteerdBlok = state.blokken.find(function(blok) {
        return blok.id === state.geselecteerdId;
    });

    if (geselecteerdBlok) {
        const nieuweTekst = document.getElementById("blokTekst").value;

        geselecteerdBlok.tekst = nieuweTekst;

        render();
    }
});


document.getElementById("verwijderenBtn").addEventListener("click", function() {

    state.blokken = state.blokken.filter(function(blok) {  //filter() we maken een nieuwe array met alle blokken waar het ID is niet gelijk  aan het geselecteerde ID
        return blok.id !== state.geselecteerdId;           // js controleert ieder blok die gelijkt is aan het geselecteerde blok en vervaangt de oude array door de nieuwe  gefilteerde array
    });

    state.geselecteerdId = null;                          //we maken de selectie leeg omdat het geselcteerde blok bestaat niet meer

      render();
    
});


document.getElementById("voegKopToe").addEventListener("click", function() {

    const nieuwBlok = {
        id: state.volgendId++,
        type: "kop",
        tekst: "Nieuwe kop"
    };

    state.blokken.push(nieuwBlok);

    render();

});

document.getElementById("voegTekstToe").addEventListener("click", function() {

    const nieuwBlok = {
        id: state.volgendId++,
        type: "tekst",
        tekst: "Nieuwe tekst"
    };

    state.blokken.push(nieuwBlok);

    render();

});


document.getElementById("voegKnopToe").addEventListener("click", function() {

    const nieuwBlok = {
        id: state.volgendId++,
        type: "knop",
        tekst: "Nieuwe knop"
    };

    state.blokken.push(nieuwBlok);

    render();

});
function openGates() {
    document.querySelectorAll(".gateDoor").forEach(function(deur) { //eerst zoekt beide deurhelften en daarna looopt door de twee deuren
        deur.classList.add("open");
    });
}
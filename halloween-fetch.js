const laadBtn = document.getElementById("laadBtn");

const statusMelding = document.getElementById("status");

const resultatenDiv = document.getElementById("resultaten");


async function laadGegevens() {

    statusMelding.textContent = "Gegevens laden...";
    resultatenDiv.textContent = "";//berichtkamer wordt leeggemaakt zodat bij het opnieuw klikken alleen maar 5 berichten staan, niet 10, 15, etc
    laadBtn.disabled = true;

    try {
        const response = await fetch("https://jsonplaceholder.typicode.com/posts?_limit=5");

        if (!response.ok) {
        throw new Error(`Request mislukt: ${response.status}`);
}
    const gegevens = await response.json();
    //console.log(gegevens[0]); test

        gegevens.forEach(function(bericht) { //array met 5 berichten

            const artikel = document.createElement("article");
            const titel = document.createElement("h2");
            titel.textContent = bericht.title;//pakt de waarde van titel uit het houdige bericht
            //zet text in een html element
            const beschrijving = document.createElement("p");
            beschrijving.textContent = bericht.body;

            artikel.appendChild(titel);//plaatst <h2> binnen <article>
            artikel.appendChild(beschrijving);
            resultatenDiv.appendChild(artikel);
});
if (gegevens.length === 0) {
    statusMelding.textContent = "👻 Geen mysterieuze berichten gevonden.";
} else {
    statusMelding.textContent = `👻 ${gegevens.length} mysterieuze berichten gevonden!`;
}    

} catch (fout) {
    statusMelding.textContent = "👻 Oeps! De mysterieuze berichten konden niet worden opgehaald.";
    
}
finally {
    laadBtn.disabled = false;//knop na het laden weer werkt en dat we geen dubbele berichten krijgen
}
}

laadBtn.addEventListener("click", laadGegevens);
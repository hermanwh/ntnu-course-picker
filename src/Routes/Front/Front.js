import React, { useEffect, useState } from "react";
import "./Front.css";

const Front = ({ match }) => {
    return (
        <div>
            <link rel="stylesheet" type="text/css" href="//fonts.googleapis.com/css?family=Aldrich" />
            <div className="container-fluid frontContent">
                <div className="row">
                    <div className="col-md-4 offset-md-4 col-8 offset-2">
                        <h3>Hei!</h3>
                        <h4>Du trenger ikke lese all denne kjedelige teksten hvis du ikke vil. Trykk på 'App' i menyen til venstre for å komme igang</h4>
                        <p>Denne webapplikasjonen hjelper deg (forhåpentligvis) med å velge fag og spesialisering på I&IKT</p>
                        <p>Ved å trykke på "App" i menyen til venstre kommer du til selve applikasjonen</p>
                        <p>NB: applikasjonens bestanddeler er forklart kortfattet nedenfor. Alle punktene kan hoppes over etter ønske. En behøver ikke f.eks velge spesialisering dersom dette ikke er ønskelig.</p>
                        <h3>1. Velg spesialisering</h3>
                        <p>Valg av spesialisering legger automatisk til obligatoriske fag for den valgte spesialiseringen. Dette kan overstyres ved å manuelt fjerne det automatisk valgte faget</p>
                        <h3>2. Velg semester med utveksling</h3>
                        <p>Aktuelle fag for disse føres inn manuelt ved å skrive inn i feltene markert med "Skriv inn fag..."</p>
                        <h3>3. Se oppsummering av valgte fag i grafen/menyen</h3>
                        <p>Alle fag er delt inn i flere kategorier, som f.eks IT eller kybernetikk. Sammendraget gir en pekepinn på hvilken kompetanse din fagsammensetning gir</p>
                        <p>Oppsummeringen oppdateres (naturligvis) etterhvert som flere fag legges til fagplanen</p>
                        <h3>4. Se anbefalte fag utfra kateogi</h3>
                        <p>Her er tanken å komme med noen slags "basispakker" for hver kategori, e.g. Reguleringsteknikk++ for Kybernetikk, Intro til AI/Metoder i AI/Maskinlæring for AI osv. osv.</p>
                        <p>Enn så lenge er det nokså begrenset hva som er lagt inn av forslag</p>
                        <h3>5. Velg fag</h3>
                        <p>NB: Listen over fag er ikke komplett, i påvente av API-støtte fra NTNU-IT</p>
                        <h4>5.1 Filtrer på kategori</h4>
                        <p>Kategorier (vilkårlig antall) velges via valgfeltet. Hver kategori har sin egen farge, som er indikert i søkefeltet og på de tilhørende fagene</p>
                        <p>NB: kategori-funksjonen er på ingen måte ferdigstilt. Kom gjerne med forslag til aktuelle kategorier!</p>
                        <h4>5.2 Filtrer på fritekst</h4>
                        <p>Bruk søkefeltet til å skrive inn fagkode eller navn på ønsket fag</p>
                        <h4>5.3 Legg til fag i fagplanen</h4>
                        <p>Bruk knappene på hvert enkelt fag til å legge faget inn i fagplanen på det aktuelle årskullet</p>
                        <p>Semester (høst/vår) velges automatisk ut fra fagets semester indikert nede i venstre hjørne</p>
                    </div>
                </div>
            </div>
            
        </div>
    )
}

export default Front;
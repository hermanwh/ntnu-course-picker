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
                        <h5>Du trenger ikke lese all denne kjedelige teksten hvis du ikke vil. Trykk på 'App' i menyen til venstre for å komme igang</h5>
                        <h5>Kom gjerne med forslag til forbedring og/eller si ifra om feil! Ta kontakt med hermanwh på stud-mail, eller send melding på Facebook</h5>
                        <hr className="style-two"></hr>
                        <p>
                            Selv har jeg opplevd det som veldig vanskelig å velge fag på I&IKT, og at <a href="https://www.ntnu.no/studier/mting/oppbygning" rel="noopener noreferrer" target="_tab" className="frontLink">NTNU sin studieplanlegger</a> ikke nødvendigvis gir de beste fagforslagene for hver spesialisering.
                            Denne appen lar deg sette opp og lagre studieplaner blant et bredt utvalg fag som kan filtreres basert på 25 ulike kategorier. Fagene er kategorisert av undertegnede etter beste evne.
                        </p>
                        <br></br>
                        <p>På sikt er håpet å kunne kombinere dette med karakterstatistikk, fagevalueringer og annet. Forhåpentligvis kan noen interesserte ta over utviklingen!
                            GIT-repo finnes <a href="https://github.com/hermanwh/ntnu-course-picker/" rel="noopener noreferrer" target="_tab" className="frontLink">her</a>.
                            Appen er skrevet i <a href="https://reactjs.org/" rel="noopener noreferrer" target="_tab" className="frontLink">React</a> og publisert gjennom <a href="https://pages.github.com/" rel="noopener noreferrer" target="_tab" className="frontLink">Github Pages</a></p>
                        <hr className="style-two"></hr>
                        <h5>Noen av tingene du kan gjøre i appen er:</h5>
                        <h6 style={{'marginTop':'15px'}}>Registrere bruker, lagre og laste inn fagplaner</h6>
                        <p style={{'fontWeight':'bold'}}>Husk å lagre fagplanene dine ved bruk av "Lagre planer"-knappen!</p>
                        <p>Denne dukker opp etter du har lagd bruker og/eller logget inn. Data går tapt dersom en forlater eller refresher "App"-siden uten å lagre</p>
                        <h6 style={{'marginTop':'15px'}}>Velge spesialisering</h6>
                        <p>Ved valg av spesialisering legges obligatoriske fag automatisk til i fagplanen. Dette kan overstyres ved å manuelt fjerne det automatisk valgte faget.</p>
                        <h6 style={{'marginTop':'15px'}}>Velg semester med utveksling</h6>
                        <p>Lar brukeren manuelt skrive inn navn på aktuelle utvekslingsfag</p>
                        <h6 style={{'marginTop':'15px'}}>Se oppsummering av valgte fag</h6>
                        <p>Alle fag er delt inn i flere kategorier, som f.eks IT eller kybernetikk. Sammendraget gir en pekepinn på hvilken kompetanse din fagsammensetning gir. Oppsummeringen oppdateres etterhvert som flere fag legges til fagplanen</p>
                        <h6 style={{'marginTop':'15px'}}>Eksportere fag og oversikt</h6>
                        <p>Ved å trykke på "Eksporter oversikt"-knappen åpnes valgte fag og graf over kategorier i et nytt vindu, og kan lagres som bildefil (høyreklikk -> lagre som). 
                            Lagring til PDF har vist seg å være en utfordring, så det kommer en gang senere</p>
                        <h5 style={{'marginTop':'15px'}}>Se anbefalte fag ut fra kategori under "Planforslag"</h5>
                        <p>Her er tanken å komme med noen slags "basispakker" for hver kategori, e.g. Reguleringsteknikk++ for Kybernetikk, Intro til AI/Metoder i AI/Maskinlæring for AI osv. osv.</p>
                        <p>Enn så lenge er det nokså begrenset hva som er lagt inn av forslag, i påvente av litt innspill om hva som kan være nyttig</p>
                        <h5 style={{'marginTop':'15px'}}>Velge fag under "Fagliste"</h5>
                        <h6 style={{'marginTop':'15px'}}>Filtrer på kategori</h6>
                        <p>Kategorier (vilkårlig antall) velges via valgfeltet. Hver kategori har sin egen farge, som er indikert i søkefeltet og på de tilhørende fagene</p>
                        <p>NB: kategori-funksjonen er på ingen måte ferdigstilt. Kom gjerne med forslag til aktuelle kategorier!</p>
                        <h6 style={{'marginTop':'15px'}}>Filtrer på fritekst</h6>
                        <p>Bruk søkefeltet til å skrive inn fagkode eller navn på ønsket fag</p>
                        <p>NB: beklager at søkefunksjonen kan oppleves litt treig. Dessverre ikke funnet noen god måte å filtrere alle fagene på</p>
                        <h6 style={{'marginTop':'15px'}}>Legg til fag i fagplanen</h6>
                        <p>Bruk knappene på hvert enkelt fag til å legge faget inn i fagplanen på det aktuelle årskullet (3., 4. eller 5.). Semester er indikert med høst/vår</p>
                        <hr className="style-two"></hr>
                        <h3>Appen er under utvikling, og tilbakemeldinger tas imot med takk!</h3>
                        <p>På sikt er tanken å legge til blant annet:</p>
                        <p>- Fagforslag basert på interesser, f.eks med ferdig utfylte anbefalte fag etc.</p>
                        <p>- Vurderingssystem mm.</p>
                        <p>- Karakterstatistikk</p>
                        <p>- Hva enn som måtte komme av forslag</p>
                    </div>
                </div>
            </div>
            
        </div>
    )
}

export default Front;
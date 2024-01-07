
// code pour définir la veille du jour actuel pour être sûr d'avoir une donnée à afficher (car on ne connaît pas
// l'heure systématique des relevés de la station) :

// let today = new Date()
// let todayAfter = new Date(today.getTime() + 10000)

// let dayBefore = new Date(today)
// dayBefore.setDate(today.getDate()-1)
// let hier = currentDate(dayBefore)


// fonction qui envoie la requête à l'API avec la date qui change dans l'URL, définie la veille :

async function fetchWaterLevel2() {
    const reponse = await fetch("https://hubeau.eaufrance.fr/api/v1/hydrometrie/observations_tr?code_entite=M800001010&fields=resultat_obs&grandeur_hydro=H&size=1")
    const data = await reponse.json()
    const waterLvl = data.data[0].resultat_obs
    return waterLvl
}


// fonction qui affiche la donnée de l'API reçue dans l'HTML sur la règle et modifie la hauteur de la vague :

async function main() {

    const waveElement = document.querySelector (".Wave")
    waveElement.classList.add("fill-animation")

    const sebElement = document.querySelector (".seblecrab")
    waveElement.classList.add("fill-animation")

    const waterlVl = await fetchWaterLevel2()
    console.log(waterlVl) 
    let reversedLvl = 8000 - waterlVl
    document.querySelector(".Wave").style.top = ((reversedLvl *400) /8000) + "px"
    document.querySelector(".seblecrab").style.top =  (((reversedLvl *400) /8000)+50) + "px"
    document.querySelector(".result").style.top = (((reversedLvl *400) /8000)-15) + "px"

    setTimeout(() => {
        waveElement.classList.remove("fill-animation");
        sebElement.classList.remove("fill-animation");
        waveElement.classList.add("end-animation");
        sebElement.classList.add("end-animation");
            }
            , 5000);           
        waveElement.addEventListener("transitionend", () => {
            document.getElementById("waterLevel").innerHTML = waterlVl + " mm";
            waveElement.classList.remove("end-animation");
            sebElement.classList.remove("end-animation");
            })
        
} 

//main()

// fonction qui formate la date pour la mettre dans l'URL pour faire la requête dans la fonction fetchWaterLevel2

// function currentDate(day) {

//     let jour = day.getDate()
//     let mois = day.getMonth() + 1
//     let année = day.getFullYear()
//     let fullDate = année + "-" + mois + "-" + jour + "T"

//     return fullDate.toString()
// }


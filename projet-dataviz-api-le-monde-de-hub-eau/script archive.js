// 1è façon de faire :

// function fetchWaterLevel() {
//     fetch("https://hubeau.eaufrance.fr/api/v1/hydrometrie/observations_tr?code_entite=M800001010&date_debut_obs=2023-11-22T13%3A40%3A00&date_fin_obs=2023-11-22T13%3A40%3A10&fields=resultat_obs&grandeur_hydro=H&size=20")
//         .then(response => response.json())
//         .then(response => console.log(response.data[0].resultat_obs))
//         .catch(error => alert("Erreur : " + error));
// }
// fetchWaterLevel()

// Autre méthode (vue avec Alexis et JF : rajout de l'asynchrone) :


// code pour définir la veille du jour actuel pour être sûr d'avoir une donnée à afficher (car on ne connaît pas
// l'heure systématique des relevés de la station) :

let today = new Date()
let todayAfter = new Date(today.getTime() + 10000)

let dayBefore = new Date(today)
dayBefore.setDate(today.getDate()-1)
let hier = currentDate(dayBefore)


// fonction qui envoie la requête à l'API avec la date qui change dans l'URL, définie la veille :

async function fetchWaterLevel2() {
    const reponse = await fetch(`https://hubeau.eaufrance.fr/api/v1/hydrometrie/observations_tr?code_entite=M800001010&date_debut_obs=${hier}&date_fin_obs=${hier}&fields=resultat_obs&grandeur_hydro=H&size=20`)
    const data = await reponse.json()
    const waterLvl = data.data[0].resultat_obs
    return waterLvl
}


// fonction qui affiche la donnée de l'API reçue, dans l'HTML :

async function main() {
    const waterlVl = await fetchWaterLevel2()
    console.log(waterlVl) 
    document.getElementById("waterLevel").innerHTML = waterlVl
}

main()


// fonction qui formate la date pour la mettre dans l'URL pour faire la requête dans la fonction fetchWaterLevel2

function currentDate(day) {

    let jour = day.getDate()
    let mois = day.getMonth() + 1
    let année = day.getFullYear()
    let fullDate = année + "-" + mois + "-" + jour + "T"

    return fullDate.toString()
}


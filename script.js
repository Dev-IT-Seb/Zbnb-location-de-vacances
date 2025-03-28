// ---------------------------------------------------------------- //
                //--- JS - JSON + FORMULAIRES ---//
// ---------------------------------------------------------------- //
//--- A FAIRE - TERMINER CALCUL DE PRIX TOTAL AVEC OPTIONS CHOISIES
// ---------------------------------------------------------------- //
//
//--- IMPORTATION DU FICHIER JSON
fetch( "zenbnb_listing_40.json" )
//
// ---------------------------------------------------------------- //
//--- CHARGEMENT DU FICHIER OK ou NOK
.then(function(verif){

    if (!verif.ok){
        console.log( "Erreur du chargement du fichier JSON !" )
        throw new Error( "Erreur du chargement du fichier JSON !" ); 
    }
    console.log( "Chargement du fichier JSON OK !" )
    return verif.json(); 
})
    //
    //--- RECUPERATION DES DONNEES
    //
    .then(function(data){

    //--- SELECTEURS DOM
    //
    let nameUser = document.getElementById("nom");
    let mailUser = document.getElementById("email");
    let numberPhone = document.getElementById("number");
    let logementZbnb = document.getElementById("logementsZbnb");
    let choixLogement = document.querySelector(".choix-logement");
    //---------------------------------------------------------------//
    //--- CHAUFFEUR
    let suppChauffeur = document.getElementById("suppChauffeur");
    //--- PETIT DEJEUNER
    let suppDejeuner = document.getElementById("suppDejeuner");
    //--- GUIDE
    let suppGuide = document.getElementById("suppGuide");
    //---------------------------------------------------------------//
    //--- A FAIRE
    //--- DATE
    let dateDepart = document.getElementById("dateDepart");
    let dateArrive = document.getElementById("dateArrive");
    //---------------------------------------------------------------//
    // OPTION AFFICHAGE REGIME
    let regimeHidden = document.querySelector(".regime-hidden");
    //--- AFFICHAGE RESULTAT COMMANDE RESERVATION
    let resultReservation = document.querySelector(".resultat-reservation");
    // BUTTON ENVOIE DU RESULTAT
    let buttonFormulaire = document.getElementById("search");
    //---------------------------------------------------//
    //--- OPTIONS REGIME ALIMENTAIRE
    suppDejeuner.addEventListener("click", function() {
        if (regimeHidden.style.display === "none") {
            //--- AFFICHE LES OPTIONS
            regimeHidden.style.display = "block";
        } else {
            //--- ENLEVE LES OPTIONS
            regimeHidden.style.display = "none";
        }
    });
    //---------------------------------------------------//
    //--- LOGEMENTS ---//
    logementZbnb.addEventListener("change", function() {

        let selectionChoix = logementZbnb.value;

        if (selectionChoix === "maison") {

            let contentHtmlChoixMaison = `
            <div class="choix-maison-option">
                <label for="pi">Piscine</label>
                <input type="checkbox" name="Piscine" id="piscineMaison">
                <label for="pi">Jardin</label>
                <input type="checkbox" name="Jardin" id="jardinMaison">
            </div>`;
            //--- AJOUT BLOCK DANS DOM HTML
            choixLogement.innerHTML = contentHtmlChoixMaison;
        } else if (selectionChoix === "appartement") {

            let contentHtmlChoixAppartement = `
            <div class="choix-maison-option">
                <label for="balcon">Balcon</label>
                <input type="checkbox" name="Balcon" id="balconAppartment">
                <label for="ascenceur">Ascenseur</label>
                <input type="checkbox" name="Ascenseur" id="ascenceurAppartment">
            </div>`;
            //--- AJOUT BLOCK DANS DOM HTML
            choixLogement.innerHTML = contentHtmlChoixAppartement;
        } else {
            choixLogement.textContent = "Aucun logement sélectionné";
        }
    });
    //---------------------------------------------------//
    //--- RECUPERATION VALEURS SAISIES ---//
    buttonFormulaire.addEventListener("click", function(event) {

        //--- EVITE LE RAFRAICHISSEMENT
        event.preventDefault();
        //--- VIDER LE BLOCK HTML DOM
        resultReservation.innerHTML = "";
        //--- TABLEAU ERREUR VIDE
        let tableauError = [];
        //--- SELECTION CHOIX LOGEMENT
        let selectionChoix = logementZbnb.value;
        //--- SELECTEUR HTML CHOIX LOGEMENT
        let Options = document.querySelectorAll(".choix-logement input:checked");
        //--- TABLEAU OPTIONS CHOISIS
        let optionsChoisies = [];
        //-- REGIME
        let selectionRegime = document.querySelector('input[name="regime"]:checked');

        //--- VERIFICATION LONGUEUR NOM
        if(nameUser.value.length < 3) {
            tableauError.push("Votre nom doit contenir au moins 3 caractères.");
        }

        //--- VERIFICATION EMAIL REGEX
        let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if(!emailRegex.test(mailUser.value)) {
            tableauError.push("Adresse email invalide : " + mailUser.value);
        }

        //--- VERIFICATION TELEPHONE SUR 10 CHIFFRES
        let phoneRegex = /^[0-9]{10}$/;
        if (!phoneRegex.test(numberPhone.value.trim())) {
            tableauError.push("Numéro de téléphone invalide :" + numberPhone.value);
        }

        //--- VERIF OPTIONS CHOISIES EN PARCOURANT LES CASES COCHEES
        for (let i = 0; i < Options.length; i++) {
            optionsChoisies.push(Options[i].name);
        }

        //--- SELECTION LOGEMENT
        if (selectionChoix === "") {
            tableauError.push("Veuillez sélectionner un logement.");
        }

        //--- SELECTION NOMBRE DE PERSONNE
        let nbPersonnes = document.getElementById('nbPersonnes').value;

        //--- DATE
        let departValue = dateDepart.value;
        let arriveeValue = dateArrive.value;

        // Vérification si les valeurs des dates sont vides
        if (!departValue) {
            tableauError.push("La date de départ est vide.");
        }
        if (!arriveeValue) {
            tableauError.push("La date d'arrivée est vide.");
        }
        //------------------------------------------------------------------------------------//
        //--- CONVERTIR LA DATE
        let depart = new Date(departValue);
        let arrivee = new Date(arriveeValue);
        //--- CALCUL DE LA DATE (NB de Jours)
        let time_diff = arrivee.getTime() - depart.getTime();
        let dayDiff = time_diff / (1000 * 3600 * 24);
        //------------------------------------------------------------------------------------//
        //--- VERIFIER DATE
        if (depart.toString() === "Invalid Date") {
            tableauError.push("La date de départ est invalide.");
        }
        if (arrivee.toString() === "Invalid Date") {
            tableauError.push("La date d'arrivée est invalide.");
        }
        //------------------------------------------------------------------------------------//
        //--- VERIFICATION SI DATE DE DEPART EST APRES DATE D'ARRIVEE
        if (depart > arrivee) {
            tableauError.push("La date de départ ne peut pas être après la date d'arrivée.");
        }
        //------------------------------------------------------------------------------------//
        //--- CONTENU MESSAGE D'ERREUR
        if (tableauError.length > 0) {
            let errorList = "";
            for (let i = 0; i < tableauError.length; i++) {
                errorList += `<li>${tableauError[i]}</li>`;
            }
            let contentHtmlErreur = `
                <h2 class="red-nok">Erreurs dans ce formulaire</h2>
                <ul>
                    ${errorList}
                </ul>`;
            resultReservation.innerHTML = contentHtmlErreur;
        } 
        //--- CONTENU RESULTAT SANS ERREUR
        else {

            //----------------------------------------------//
            //--- CALCUL DES OPTIONS CHOISIES
            //
            //-- CHAUFFEUR
            let priceChauffeur = 11;
            let calculChauffeur = dayDiff + priceChauffeur
            //
            //-- PETIT-DEJEUNER (calculer le nombre de personne + le nombre de jour de reservation et si l'option petit-dejeuner et choisi + le prix du petit dejeuner)

            //nbPersonnes
            //dayDiff
            //suppDejeuner ID COCHE
            let prixOption = nbPersonnes + dayDiff;
            if(suppDejeuner.checked){

                console.log("petit dejeuner");
                console.log(prixOption)
        
            }
            //----------------------------------------------//
            let contentHtmlResultat = ` 
                <h2 class="green-ok">Résultat de votre commande</h2>
                <p>Votre nom : ${nameUser.value}</p>
                <p>Votre email : ${mailUser.value}</p>
                <p>Votre numéro de téléphone : ${numberPhone.value}</p>
                <p>Nombre de personnes : ${nbPersonnes}</p>
                <p>Logement choisi : ${selectionChoix}</p>
                <p>Date de départ : ${depart.toLocaleDateString()}</p>
                <p>Date d'arrivée : ${arrivee.toLocaleDateString()}</p>
                <p>Prix chauffeur : ${calculChauffeur} €</p>
                <p>Nombre de jours : ${dayDiff} jours</p>
                <p>Prix total des petits-dejeuner : ${prixOption}</p>
                <p>Options choisies : `;
            //------------------------------------------------------------------------------------//
            //--- AFFICHAGE DES OPTIONS CHOISIES
            if (optionsChoisies.length > 0) {
                contentHtmlResultat += optionsChoisies.join(", ");
            } else {
                contentHtmlResultat += "Aucune option sélectionnée";
            }

            //--- AFFICHAGE OPTION CHAUFFEUR
            if(suppChauffeur.checked){
                contentHtmlResultat += ", " + suppChauffeur.name;
            }

            //--- AFFICHAGE OPTION GUIDE
            if(suppGuide.checked){
                contentHtmlResultat += ", " + suppGuide.name;
            }

            //--- REGIME CHOIX
            if (selectionRegime) {
                contentHtmlResultat += ", Regime alimentaire : " + selectionRegime.value;
            }
            //------------------------------------------------------------------------------------//
            //--- AJOUT PROGRESSIVE DES OPTIONS DANS LE RESULTAT OK
            contentHtmlResultat += `</p>`;

            //--- AJOUT BLOCK DANS DOM HTML
            resultReservation.innerHTML = contentHtmlResultat;
        }
    });
    //
    //-----------------------------------------------------------------------------//
    //---                           PARTIE RECUPERATION DATA                    ---//
    //-----------------------------------------------------------------------------//
    //--- SELECTEURS DOM
    // HOME PAGE
    let LogementsContainer = document.getElementById( "container-logement" );
    // PARIS
    let LogementsContainerParis = document.getElementById( "logement-paris" );
    // LYON
    let LogementsContainerLyon = document.getElementById( "logement-lyon" );
    // NOTES
    let LogementsContainerNotes = document.getElementById( "logement-notes" );
    //-------------------------------------------------------------------//
      // BOUCLE POUR LISTER TOUS LES ELEMENTS DANS CATEGORIE "LISTINGS" //
    //-------------------------------------------------------------------//
    //
    for( let z = 0; z < data.listings.length; z++ ){
        //
        let listingsAll = data.listings[z];
        //
        //-----------------------------------------------------------------------------//
        //---                          BLOCK - HOME PAGE                            ---//
        //-----------------------------------------------------------------------------//
        //
        //--- CREATION DIV POUR RELIER LES DONNEES
        let divHomePage = document.createElement( "container" );
        //
        //--- AJOUT CLASS LOGEMENT
        divHomePage.classList = "logement";
        //
        //--- AFFICHAGE DE TOUS LES LOGEMENTS
        // 
        let htmlHomePage = "<img src='" + "./images/logement/logement.jpg" + "'/>";
        htmlHomePage += "<p>" + listingsAll.title;
        htmlHomePage += "<p>" + listingsAll.city;
        htmlHomePage += `
            <div class="item">
                <p>${listingsAll.price_per_night}€</p>
                <p>Note Avis: ${listingsAll.rating} €</p>
            </div>
        `;
        //---------------------------------------------------//
                        // RESULTAT HOME PAGE //
        //---------------------------------------------------//
        //
        // AJOUT DU CONTENU HOME PAGE
        divHomePage.innerHTML = htmlHomePage;
        //
        //-----------------------------------------------------------------------------//
        //---                              BLOCK - PARIS                            ---//
        //-----------------------------------------------------------------------------//
        //
        // CREATION DIV POUR RATTACHER LES DONNEES
        let divParis = document.createElement( "container-paris" );
        // RECUPERATION DES DATAS (Possible de concaténation)
        //
        // Condition Filtre logement Paris
        //
        if (listingsAll.city === "Paris"){
            // Filtre Ville PARIS
            let htmlParis = "<p>" + listingsAll.city;
            htmlParis += "<p>" + listingsAll.title;
            htmlParis += "<p>" + listingsAll.description;
            htmlParis += "<p>" + listingsAll.price_per_night;
            htmlParis += "<p>" + listingsAll.rating;
            htmlParis += "<p>" + listingsAll.guest_capacity;
            htmlParis += "<p>" + listingsAll.image;
        //
        //---------------------------------------------------//
        //---               RESULTAT PARIS                ---//
        //---------------------------------------------------//
        //
        // AJOUT DU CONTENU PARIS
            divParis.innerHTML = htmlParis;
        };
        //-----------------------------------------------------------------------------//
        //---                              BLOCK - LYON                             ---//
        //-----------------------------------------------------------------------------//
        //
        // CREATION DIV POUR RATTACHER LES DONNEES
        let divLyon = document.createElement( "container-lyon" );
        //
        // Condition Filtre logement Lyon
        //
        if ( listingsAll.city === "Lyon" ){
            //
            //let divLyon = document.createElement( "container-lyon" );
            // Filtre Ville Lyon
            let htmlLyon = "<p>" + listingsAll.city;
            htmlLyon += "<p>" + listingsAll.title;
            htmlLyon += "<p>" + listingsAll.description;
            htmlLyon += "<p>" + listingsAll.price_per_night;
            htmlLyon += "<p>" + listingsAll.rating;
            htmlLyon += "<p>" + listingsAll.guest_capacity;
            htmlLyon += "<p>" + listingsAll.image;
        //
        //---------------------------------------------------//
        //---                RESULTAT LYON                ---//
        //---------------------------------------------------//
        //
        // AJOUT DU CONTENU LYON
            divLyon.innerHTML = htmlLyon;
        };
        //
        //-----------------------------------------------------------------------------//
        //---                              BLOCK - NOTES                            ---//
        //-----------------------------------------------------------------------------//
        //
        // CREATION DIV POUR RATTACHER LES DONNEES
        let divNotes = document.createElement( "logement-notes" );
        //
        // Condition Filtre NOTES
        //
        if ( listingsAll.rating > 4 ){
            //
            // Filtre Ville Lyon
            let htmlNotes = "<p>" + "Ville :" + " " + listingsAll.city;
            htmlNotes += "<p>" + "Titre Annonce :"+ listingsAll.title;
            htmlNotes += "<p>" + "Description du logement :"+ listingsAll.description;
            htmlNotes += "<p>" + "Prix/nuits :" + " " + listingsAll.price_per_night;
            htmlNotes += "<p>" + "Notes :" + " " + listingsAll.rating;
        //
        //
        //---------------------------------------------------//
        //---               RESULTAT NOTES                ---//
        //---------------------------------------------------//
        //
        // AJOUT DU CONTENU NOTES
        divNotes.innerHTML = htmlNotes;
        };
        //
        //---------------------------------------------------//
        //---      CONDITIONS PAGES AJOUT ELEMENT DOM     ---//
        //---------------------------------------------------//
        // AFFICHAGE DES RESULTATS POUR CHAQUE PAGE - CONDITION POUR REDIRIGER VERS L'ELEMENT DE LA BONNE PAGE
        if (LogementsContainer){
            LogementsContainer.appendChild(divHomePage);
        }
        //AFFICHAGE DES RESULTATS
        //
        else if (LogementsContainerParis){
            LogementsContainerParis.appendChild(divParis);
        }else if (LogementsContainerLyon) {
            LogementsContainerLyon.appendChild(divLyon);
        }else {
            LogementsContainerNotes.appendChild(divNotes);
        }
    };
});
//------------------------------------------------------------------------------------------//
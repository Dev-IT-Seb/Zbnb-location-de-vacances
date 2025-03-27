// ------------------------------------------ //
        // JS - JSON + FORMULAIRES //
// ------------------------------------------ //
// A FAIRE - DERNIER PARTIE DU FORMULAIRE + 
//  LOCALSTORAGE A TESTER
// ------------------------------------------ //
//
// IMPORTATION DU FICHIER JSON
fetch( "zenbnb_listing_40.json" )
//
//
// ------------------------------------------ //
// CHARGEMENT DU FICHIER OK ou NOK
.then(function(verif){

    if (!verif.ok){
        console.log( "Erreur du chargement du fichier JSON !" )
        throw new Error( "Erreur du chargement du fichier JSON !" ); 
    }
    console.log( "Chargement du fichier JSON OK !" )
    return verif.json(); 
})
//
// RECUPERATION DES DONNEES
//
.then(function(data){

        //---------------------------------------------------//
                        //-- FORMULAIRES --//
        //---------------------------------------------------//
        //--- SELECTEURS DOM
        //
        // NOM UTILISATEUR
        let nameUser = document.getElementById("nom");
        // MAIL UTILISATEUR
        let mailUser = document.getElementById("email");
        // TELEPHONE UTILISATEUR
        let numberPhone = document.getElementById("number");
        // TYPE LOGEMENTS
        let logementZbnb = document.getElementById("logementsZbnb");
        //Ajout resultat choix
        let choixLogement = document.querySelector(".choix-logement");
        // A VOIR SINON BOUCLE - A TESTER
        let personneOne = document.getElementById("personneOne");
        let personneTwo = document.getElementById("personneTwo");
        let personneThree = document.getElementById("personneThree");
        let personneFour = document.getElementById("personneFour");
        // DATE
        let dateDepart = document.querySelector(".dateDepart");
        let dateArrive = document.querySelector(".dateArrive");
        // CHAUFFEUR
        let suppChauffeur = document.getElementById("suppChauffeur");
        // PETIT DEJEUNER
        let suppDejeuner = document.getElementById("suppDejeuner");
        // GUIDE
        let suppGuide = document.getElementById("suppGuide");
        // REGIME ALIMENTAIRE
        let regimeTrue = document.getElementById("regimeAlimentaireTrue");
        let regimeFalse = document.getElementById("regimeAlimentaireFalse");
        // OPTION AFFICHAGE REGIME
        let regimeHidden = document.querySelector(".regime-hidden");
        //--- AFFICHAGE RESULTAT COMMANDE RESERVATION
        let resultReservation = document.querySelector(".resultat-reservation");
        // BUTTON ENVOIE DU RESULTAT
        let buttonFormulaire = document.getElementById("search");
        //---------------------------------------------------//
        //
        //--- OPTIONS REGIME ALIMENTAIRE
        suppDejeuner.addEventListener("click", function() {
            
            if (regimeHidden.style.display === "none") {
                // AFFICHE LES OPTIONS
                regimeHidden.style.display = "block";
            } else {
                // ENLEVE LES OPTIONS
                regimeHidden.style.display = "none";
            }
        });
        //---------------------------------------------------//
                    //--- LOGEMENTS ---//
        //---------------------------------------------------//
        //
        logementZbnb.addEventListener("change", function() {

            let selectionChoix = logementZbnb.value;

            if (selectionChoix === "maison") {

                let contentHtmlChoixMaison = `
                <div class="choix-maison-option">
                    <label for="pi">Piscine</label>
                    <input type="checkbox" name="piscine" id="piscineMaison">
                    <label for="pi">Jardin</label>
                    <input type="checkbox" name="jardin" id="jardinMaison">
                </div>`;
                choixLogement.innerHTML = contentHtmlChoixMaison;
            } else if (selectionChoix === "appartement") {

                let contentHtmlChoixAppartement = `
                <div class="choix-maison-option">
                    <label for="balcon">Balcon</label>
                    <input type="checkbox" name="balcon" id="balconAppartment">
                    <label for="ascenceur">Ascenseur</label>
                    <input type="checkbox" name="ascenceur" id="ascenceurAppartment">
                </div>`;
                choixLogement.innerHTML = contentHtmlChoixAppartement;
            } else {
                choixLogement.textContent = "";
            }
        });
        //---------------------------------------------------//
                //--- RECUPERATION VALEURS SAISIES ---//
        //---------------------------------------------------//
        let tableauError = [];

        let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        //---- BOUTON FORMULAIRE
        buttonFormulaire.addEventListener("click", function(event){

            //--- Empeche le rechargement de la page
            event.preventDefault();

            //--- TABLEAU ERREUR 
            tableauError = [];

            //--- VIDE LE CONTENU DU DOM SELECTOR HTML
            resultReservation.innerHTML = "";

            //--- VERIFICATION LONGUEUR NOM
            if(nameUser.value.length < 3){tableauError.push("Votre nom doit contenir au moins 3 caractères.");}

            //--- VERIFICATION MAIL REGEX
            if(!emailRegex.test(mailUser.value)) {tableauError.push("Adresse email invalide: " + mailUser.value);}

















            //---------------------------------------------------// 
            //--- VERIFICATION DATA DANS TABLEAU ET AFFICHAGE
            //
            // ERREURS + AFFICHAGE
            if (tableauError.length > 0) {

                // VALEUR VIDE AU DEBUT
                let errorList = "";
            
                // BOUCLE POUR RECUPERER LES ERREUR + AJOUT DATA DANS BALISE HTML
                for (let i = 0; i < tableauError.length; i++) {
                    errorList += `<li>${tableauError[i]}</li>`;
                }
            
                //--- BLOCK HTML MESSAGE ERREUR
                let contentHtmlResultat = `
                    <h2 class="red-nok">Erreurs dans ce formulaire</h2>
                    <ul>
                        ${errorList}
                    </ul>`;
            
                // AJOUT DANS DOM HTML
                resultReservation.innerHTML = contentHtmlResultat;
            
            } else {
            
                //--- BLOCK HTML MESSAGE FORMULAIRE OK
                let contentHtmlResultat = `
                    <h2 class="green-ok">Résultat de votre commande</h2>
                    <p>Votre nom: ${nameUser.value}</p>
                    <p>Votre email: ${mailUser.value}</p>















                `;
                //
                //--- AJOUT DANS DOM HTML
                resultReservation.innerHTML = contentHtmlResultat;
            }
        });
        //
        //--------------------------------------------------//
        // LOCAL STORAGE A TESTER
        // document.addEventListener("DOMContentLoaded", function(){

        //     let saveName = localStorage.getItem("nom");

        //     if(saveName){

        //         resultReservation.textContent = saveName;

        //     }

        // });
        //---------------------------------------------------//
    //-----------------------------------------------------------------------------//
//                           PARTIE RECUPERATION DATA                              //
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
        // CREATION DIV POUR RATTACHER LES DONNEES
        let divHomePage = document.createElement( "container" );
        //
        //Ajout class pour logement
        divHomePage.classList = "logement";
        //
        // RECUPERATION DES DATAS (Possible de concaténation)
        // 
        //  AUCUN FILTRE POUR LA HOME PAGE
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
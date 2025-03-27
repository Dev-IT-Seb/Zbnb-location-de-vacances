// ------------------------------------------ //
            // JS - JSON EXERCICES //
// ------------------------------------------ //
                // HOME PAGE //
// ------------------------------------------ //
// IMPORTATION DU FICHIER JSON
fetch( "zenbnb_listing_40.json" )
// ------------------------------------------ //
//
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
    //
    //
    //--------------------------------------------------------//
               // SELECTION DES ELEMENTS DANS JSON //
    //--------------------------------------------------------//
    //
    // AFFICHAGE DES LOGEMENTS
    // POINTER SUR LES BALISES HTML
    //
    // HOME PAGE
    let LogementsContainer = document.getElementById( "container-logement" );
    //
    // PARIS
    let LogementsContainerParis = document.getElementById( "logement-paris" );
    //
    // LYON
    let LogementsContainerLyon = document.getElementById( "logement-lyon" );
    //
    // NOTES
    let LogementsContainerNotes = document.getElementById( "logement-notes" );
    //
    //-------------------------------------------------------------------//
      // BOUCLE POUR LISTER TOUS LES ELEMENTS DANS CATEGORIE "LISTINGS" //
    //-------------------------------------------------------------------//
    //
    for( let z = 0; z < data.listings.length; z++ ){
        //
        let listingsAll = data.listings[z];
        //
        //-----------------------------------------------------------------------------//
        //                              BLOCK - HOME PAGE                              //
        //-----------------------------------------------------------------------------//
        //
        // CREATION DIV POUR RATTACHER LES DONNEES
        let divHomePage = document.createElement( "container-homepage" );
        //
        // RECUPERATION DES DATAS (Possible de concaténation)
        // 
        //  AUCUN FILTRE POUR LA HOME PAGE
        // 
        let htmlHomePage = "<p>" + listingsAll.title;
        htmlHomePage += "<p>" + listingsAll.city;
        htmlHomePage += "<p>" + "Prix par mois du logement:"+ " " + listingsAll.price_per_night;
        htmlHomePage += "<p>" + "Note Avis:"+ " " + listingsAll.rating;
        //
        // PROBLEME IMG
        htmlHomePage += "<img src=' " + listingsAll.image + " '/>";
        //---------------------------------------------------//
                        // RESULTAT HOME PAGE //
        //---------------------------------------------------//
        //
        // AJOUT DU CONTENU HOME PAGE
        divHomePage.innerHTML = htmlHomePage;
        //
        //-----------------------------------------------------------------------------//
        //                              BLOCK - PARIS                                  //
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
                        // RESULTAT PARIS //
        //---------------------------------------------------//
        //
        // AJOUT DU CONTENU PARIS
            divParis.innerHTML = htmlParis;
        };
        //-----------------------------------------------------------------------------//
        //                              BLOCK - LYON                                   //
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
                        // RESULTAT LYON //
        //---------------------------------------------------//
        //
        // AJOUT DU CONTENU LYON
            divLyon.innerHTML = htmlLyon;
        };
        //
        //-----------------------------------------------------------------------------//
        //                              BLOCK - NOTES                                  //
        //-----------------------------------------------------------------------------//
        //
        // CREATION DIV POUR RATTACHER LES DONNEES
        let divNotes = document.createElement( "logement-notes" );
        //
        // Condition Filtre logement Lyon
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
                        // RESULTAT NOTES //
        //---------------------------------------------------//
        //
        // AJOUT DU CONTENU NOTES
        divNotes.innerHTML = htmlNotes;
        };
        //
        //---------------------------------------------------//
                // CONDITIONS PAGES AJOUT ELEMENT DOM //
        //---------------------------------------------------//
        //
        //
        // AFFICHAGE DES RESULTATS POUR CHAQUE PAGE - CONDITION POUR REDIRIGER VERS L'ELEMENT DE LA BONNE PAGE
        if (LogementsContainer){
            LogementsContainer.appendChild(divHomePage);
        } 
        //
        //
        //AFFICHAGE DES RESULTATS
        // AppendChild -> Ajoute l'élément HTML enfant à la fin d'un élément parent
        else if (LogementsContainerParis){
            LogementsContainerParis.appendChild(divParis);
        }else if (LogementsContainerLyon) {
            LogementsContainerLyon.appendChild(divLyon);
        }else {
            LogementsContainerNotes.appendChild(divNotes);
        }
    };
});
//---------------------------------------------------//
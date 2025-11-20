window.addEventListener('DOMContentLoaded', () => {

//===================================================================================================================//
//======================= Gestion ouverture et fermeture de la modale et du menu parametre ==========================//
//==================================================================================================================//

const contenuParameter = document.querySelector('.parameter');
const overlay = document.querySelector('.overlay');
const btnParameter = document.getElementById('btn-parameter');
const modale = document.getElementById('modale');
const vueAjouter = document.getElementById('vue-ajouter-joueur');
const vueListe = document.getElementById('vue-ancien-joueur');


document.getElementById('ajouter-joueur').addEventListener('click', () =>{
    modale.style.display = 'block';
    overlay.classList.add('active');
    afficheVue('ajouter');
});

function fermerModale(){
    modale.style.display = 'none';
}

document.getElementById('fermer-modale-joueur').addEventListener('click', fermerModale);

function afficheVue(nomVue){
    if (nomVue === 'ajouter') {
        vueAjouter.classList.remove('hidden'); 
        vueListe.classList.add('hidden'); 
    } else if (nomVue === 'liste') {
        vueAjouter.classList.add('hidden'); 
        vueListe.classList.remove('hidden');     
        afficherJoueurSauvegarde(listeJoueurs);
    }
    fermerMenuParameter()
}

document.getElementById('joueur-enregistre').addEventListener('click', () => afficheVue('liste'));
document.getElementById('retour-nouveau-joueur').addEventListener('click', () => afficheVue('ajouter'));

function ouvrirMenuParameter(){
    contenuParameter.classList.add('open');
    overlay.classList.add('active');
}

function fermerMenuParameter(){
    contenuParameter.classList.remove('open');
    overlay.classList.remove('active');
}

btnParameter.addEventListener('click', ouvrirMenuParameter);
overlay.addEventListener('click', fermerMenuParameter);

//===================================================================================================================//
//========================= Gestion des joueurs dans locale storage et des joueurs en jeux ==========================//
//==================================================================================================================//
let listeJoueurs = JSON.parse(localStorage.getItem("joueurs"))||[];
const btnAjouter = document.getElementById('ajouter-nom-joueur');
let joueurEnJeu = JSON.parse(localStorage.getItem("joueursActifs"))||[];
afficherJoueurEnJeu(joueurEnJeu);

function ajouterNouveauJoueur(){
    const inputNom = document.getElementById('nom-joueur');
    const nomJoueur = inputNom.value.trim();
    if(nomJoueur === ''){
        alert("T'es déjà trop bourré ? Il faut au moins mettre une lettre");
        return
    }
    for(var i = 0; i < listeJoueurs.length; i++){
        if(nomJoueur === listeJoueurs[i]){
            alert("Tu t'es déjà fait traquenarder toi ! récupére ton psudo.")
            return
        }
    }
    inputNom.value = ""
    joueurEnJeu.push(nomJoueur);
    listeJoueurs.push(nomJoueur);
    localStorage.setItem('joueursActifs', JSON.stringify(joueurEnJeu));
    localStorage.setItem('joueurs', JSON.stringify(listeJoueurs));
    afficherJoueurEnJeu(joueurEnJeu);
    console.log("liste joueur =", listeJoueurs);
    console.log("joueur en jeu", joueurEnJeu);
}
btnAjouter.addEventListener('click', ajouterNouveauJoueur);

//====
function afficherJoueurEnJeu(tableauDeJoueur){
    const listeJoueurEnJeu = document.querySelector('.liste-joueur ul');
    listeJoueurEnJeu.innerHTML ='';

    for(var i = 0; i<joueurEnJeu.length; i++){
        const nomDuJoueurActuel = joueurEnJeu[i];
        const liJoueurEnJeu = document.createElement('li');
        liJoueurEnJeu.textContent = nomDuJoueurActuel;
        const btnSppr = document.createElement('span');
        btnSppr.textContent = "X";
        btnSppr.classList.add("supprJoueur");

        // Ceci ajoute le <span> à l'intérieur du <li>
        liJoueurEnJeu.appendChild(btnSppr);
        // Ceci ajoute le <li> complet (avec le <span> dedans) au <ul> principal
        listeJoueurEnJeu.appendChild(liJoueurEnJeu);
        btnSppr.addEventListener('click', () => {
            supprimerJoueurEnJeu(nomDuJoueurActuel)});
    }
}

//====
function supprimerJoueurEnJeu(nomJoueurASupprimer){
    let nvJoueurEnjeu = joueurEnJeu.filter(nomJoueur => nomJoueur !== nomJoueurASupprimer);
    joueurEnJeu = nvJoueurEnjeu;
    localStorage.setItem('joueursActifs', JSON.stringify(joueurEnJeu));
    afficherJoueurEnJeu(joueurEnJeu);
}

//====
function afficherJoueurSauvegarde(tableauDeJoueur){
    const listeJoueurSauvegarder = document.querySelector('.liste-ancien-joueur ul');
    listeJoueurSauvegarder.innerHTML ='';

    for(var i = 0; i<listeJoueurs.length; i++){
        const nomDuJoueurActuel = listeJoueurs[i];
        const liListeJoueurs = document.createElement('li');
        liListeJoueurs.textContent = nomDuJoueurActuel;
        //Ajout du "+" pour ajouter un joueur a la liste des joueurs en jeu
        const btnAjouter = document.createElement('span');
        btnAjouter.textContent = "+";
        btnAjouter.classList.add("ajouterJoueur");
        btnAjouter.addEventListener('click', () => {
            ajouterAncienJoueur(nomDuJoueurActuel)});
        

        //Ajout de la croix pour supprimer un joueur en jeu
        const btnSppr = document.createElement('span');
        btnSppr.textContent = "X";
        btnSppr.classList.add("supprJoueur");
        // Ceci ajoute le <li> complet (avec le <span> dedans) au <ul> principal
        listeJoueurSauvegarder.appendChild(liListeJoueurs);
        btnSppr.addEventListener('click', () => {
            supprimerJoueurSauvegarder(nomDuJoueurActuel)});

        // Ceci ajoute les <span> à l'intérieur du <li>
        liListeJoueurs.appendChild(btnSppr);
        liListeJoueurs.appendChild(btnAjouter);
    }
}

//====
function supprimerJoueurSauvegarder(nomJoueurASupprimer){
    let nvJoueurEnjeu = joueurEnJeu.filter(nomJoueur => nomJoueur !== nomJoueurASupprimer);
    listeJoueurs = nvJoueurEnjeu;
    localStorage.setItem('joueurs', JSON.stringify(listeJoueurs));
    afficherJoueurSauvegarde(listeJoueurs);
}

//====
function ajouterAncienJoueur(nomAncienJoueur){
    if(joueurEnJeu.includes(nomAncienJoueur)){
        afficherMessage(`${nomAncienJoueur} participe déjà à la partie !`)
        return;
    }
    
    joueurEnJeu.push(nomAncienJoueur);
    localStorage.setItem('joueursActifs', JSON.stringify(joueurEnJeu));
    afficherMessage(`${nomAncienJoueur} a été ajouté à la partie.`);
    afficherJoueurEnJeu(joueurEnJeu);
}

//====
function afficherMessage(message){
    const notification = document.getElementById('notification');
    notification.textContent = message

    notification.classList.remove('hidden');

    setTimeout(() => {
        notification.classList.add('hidden');
    }, 3000);
}
});
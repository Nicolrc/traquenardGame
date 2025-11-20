function fermerModale(){
    modale.style.display = 'none';
}

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

function ouvrirMenuParameter(){
    contenuParameter.classList.add('open');
    overlay.classList.add('active');
}

function fermerMenuParameter(){
    contenuParameter.classList.remove('open');
    overlay.classList.remove('active');
}
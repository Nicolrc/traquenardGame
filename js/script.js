import { UI } from './modules/ui.js';
import { Joueurs } from './modules/joueurs.js'

window.addEventListener('DOMContentLoaded', () => {
    //initialisation
    UI.init();
    Joueurs.init();
    Joueurs.afficherJoueursActif();

    // === Gestion de la modale ===
    document.getElementById('ajouter-joueur').addEventListener('click', () => {
        UI.ouvrirModale();
        UI.afficherVue('ajouter');
    });

    document.getElementById('fermer-modale-joueur').addEventListener('click', () => {
        UI.fermerModale();
    });

    // === Navigation entre les vues
    document.getElementById('joueur-enregistre').addEventListener('click', () => {
        UI.afficherVue('liste');
        Joueurs.afficherJoueursSauvegarde();
    });

    document.getElementById('retour-nouveau-joueur').addEventListener('click', () => {
        UI.afficherVue('ajouter');
    });

    // === Gestion du menu paramètre ===
    document.getElementById('btn-parameter').addEventListener('click', () => {
        UI.ouvrireMenuParametre();
    });

    document.querySelector('.overlay').addEventListener('click', () => {
        UI.fermerMenuParametre();
    });

    // === Ajout d'un nouveau joueur ===
    document.getElementById('ajouter-nom-joueur').addEventListener('click', () => {
        const input = document.getElementById('nom-joueur');
        
        if(Joueurs.ajouterNouveauJoueur(input.value))
        {
            input.value = '';
            Joueurs.afficherJoueursActif();
        }
    });

    // Permettre l'ajout avec la touche Entrée
    document.getElementById('nom-joueur').addEventListener('keypress', (e) => {
        if(e.key === 'Enter')
        {
            document.getElementById('ajouter-nom-joueur').click();
        }
    })
})
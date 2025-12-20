import { UI } from './modules/ui.js';
import { Joueurs } from './modules/joueurs.js';
import { jeu } from './modules/jeu.js';

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

    const boutonsFermer = document.querySelectorAll('[name="fermer-modale-joueur"]');

    // On boucle sur chaque bouton trouvé
    boutonsFermer.forEach(bouton => {
        bouton.addEventListener('click', () => {
            UI.fermerModale();
        });
    });

    // === Navigation entre les vues
    document.getElementById('joueur-enregistre').addEventListener('click', () => {
        UI.afficherVue('liste');
        Joueurs.afficherJoueursSauvegarde();
    });

    document.getElementById('btn-lancer-partie').addEventListener('click', () => {
        UI.ouvrirModale();
        UI.afficherVue('paris');
        if(jeu.nouvelOrdreParieur.length === 0) {
        jeu.preparerTour();
        } else {
            // Sinon, juste mettre à jour l'affichage avec l'ordre existant
            jeu.mettreAJourAffichageParis();
        }
    })

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

    // === Permettre l'ajout avec la touche Entrée ===
    document.getElementById('nom-joueur').addEventListener('keypress', (e) => {
        if(e.key === 'Enter')
        {
            document.getElementById('ajouter-nom-joueur').click();
        }
    });

    document.getElementById('valider-des').addEventListener('click', () => {
        const nombreDeDes = jeu.getNombreDeDes();
        jeu.créerDesSvg(nombreDeDes);
        jeu.initialiserDes(nombreDeDes);
    });

    document.getElementById('btn-lancer-Des').addEventListener('click', () =>{
        jeu.lancerLesDes();

        setTimeout(() => {
            jeu.gestionPerdant(); 
            
            UI.ouvrirModale();
            UI.afficherVue('perdant');
        }, 1500);
    });

    document.getElementById('valider-paris').addEventListener('click', () =>{
        const nombreDeDes = document.querySelectorAll('.des svg').length;
        const joueurActuel = jeu.nouvelOrdreParieur[jeu.indexJoueurActuel];
        const inputParis = document.getElementById('chiffre-paris');
        const valeurParis = parseInt(inputParis.value);
        const nombreMax = jeu.getMaxDesPossible(nombreDeDes);

        for(let i = 0; i < jeu.parisDuTour.length; i++)
        {
            if(valeurParis === jeu.parisDuTour[i].Paris)
            {
                alert("Ce chiffre a déjà été parié, il faut en choisir un autre.");
                return;
            }
        }
        if(nombreDeDes === 0)
        {
            alert("Il faut choisir le nombre de dés avant de parier");
            return;
        }
        if(valeurParis > nombreMax || valeurParis < nombreDeDes)
        {
            alert("Tu dois mettre un chiffre contenu entre le plus petit score du dés et le plus gros score du dés");
            return;
        }
        if (isNaN(valeurParis)) {
            alert("Choisis un chiffre, champion !");
            return;
        }
        if(valeurParis <= 0)
        {
            alert("le paris ne peut pas être 0 ou moins de 0");
            return;
        }

        jeu.enregistrerParis(joueurActuel, valeurParis);

        if(jeu.indexJoueurActuel < jeu.nouvelOrdreParieur.length)
        {
            jeu.mettreAJourAffichageParis();
        }
        else
        {
            UI.fermerModale();
            // 1. On commence par le score total
            let texteRecap = ``;

            // 2. On boucle sur chaque pari enregistré
            jeu.parisDuTour.forEach(p => {
                texteRecap += `${p.Joueur} : ${p.Paris}\n`;
            });

            // 3. On affiche le tout
            document.getElementById('resultat-total').innerText = texteRecap;
        }
    });

    document.getElementById('continuer-paris').addEventListener('click', () =>{
        UI.fermerModale();
        UI.ouvrirModale();
        UI.afficherVue('paris');
        jeu.preparerTour();
    })
})
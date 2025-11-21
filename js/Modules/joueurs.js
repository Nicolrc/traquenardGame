import { Storage } from './storage.js';
import { UI } from './ui.js'

export const Joueurs = 
{
    toutLesJoueurs: [],
    joueursActifs: [],

    // Initialiser les données
    init()
    {
        this.toutLesJoueurs = Storage.getAllPlayers();
        this.joueursActifs = Storage.getActivePlayers();
    },

    // Ajouter un nouveau joueur
    ajouterNouveauJoueur(nomJoueur)
    {
        const joueur = nomJoueur.trim();
        
        if(joueur === '')
        {
            UI.afficherNortification("T'es déjà trop bourré ? entre au minimum une lettre champion");
            return false;
        }
        if(Storage.playerExists(joueur, this.toutLesJoueurs))
        {
            UI.afficherNortification("Tu t'es déjà fait traquenarder ! Va récupérer ton pseudo !");
            return false
        }

        this.joueursActifs.push(joueur);
        this.toutLesJoueurs.push(joueur);

        Storage.saveActivePlayers(this.joueursActifs);
        Storage.saveAllPlayers(this.toutLesJoueurs);

        return true;
    },

    // AJouter un ancien joueur à la partie
    ajouterAncienJoueur(nomJoueur)
    {
        if(this.joueursActifs.includes(nomJoueur))
        {
            UI.afficherNortification(`${nomJoueur} est déjà parmis les gosses caisses !`);
            return false;
        }
        this.joueursActifs.push(nomJoueur);
        Storage.saveActivePlayers(this.joueursActifs);
        UI.afficherNortification(`${nomJoueur} a été ajouté aux gosses caisses !`)

        return true;
    },

    // Retire un joeuru de la partie en cours
    retirerJoueurActif(nomJoueur)
    {
        this.joueursActifs = this.joueursActifs.filter(nom => nom !== nomJoueur);
        Storage.saveActivePlayers(this.joueursActifs);
        UI.afficherNortification("Une petite caisse en moins");
    },

    // Retirer définitivement un joueur sauvegardé
    supprimerJoueurSauvegarde(nomJoueur)
    {
        this.toutLesJoueurs = this.toutLesJoueurs.filter(nom => nom !== nomJoueur);
        this.joueursActifs = this.joueursActifs.filter(nom => nom !== nomJoueur);

        Storage.saveActivePlayers(this.joueursActifs);
        Storage.saveAllPlayers(this.toutLesJoueurs);
    },

    // Afficher les joueurs actifs dans l'UI
    afficherJoueursActif()
    {
        const listeJoueursActif = document.querySelector('.liste-joueur ul');
        listeJoueursActif.innerHTML = "";

        this.joueursActifs.forEach(nomJoueur => {
            const li = document.createElement('li');
            li.textContent = nomJoueur;

            const btnSupprimer = document.createElement('span');
            btnSupprimer.textContent = 'X';
            btnSupprimer.classList.add('supprJoueur');
            btnSupprimer.addEventListener('click', () => {
                this.retirerJoueurActif(nomJoueur);
                this.afficherJoueursActif();
            });
            li.appendChild(btnSupprimer);
            listeJoueursActif.appendChild(li);
        });
    },

    // Afficher les joeurs sauvegardé dans l'UI
    afficherJoueursSauvegarde()
    {
        const listeJoueursSauvegarde = document.querySelector('.liste-ancien-joueur ul');
        listeJoueursSauvegarde.innerHTML = '';

        this.toutLesJoueurs.forEach(nomJoueur => {
            const li = document.createElement('li');
            li.textContent = nomJoueur;

            // Bouton ajouter
            const btnAjouter = document.createElement('span');
            btnAjouter.textContent = '+';
            btnAjouter.classList.add('ajouterJoueur');
            btnAjouter.addEventListener('click', () => {
                if (this.ajouterAncienJoueur(nomJoueur)){
                    this.afficherJoueursSauvegarde();
                    this.afficherJoueursActif();
                }
            });

            // Bouton supprimer
            const btnSupprimer = document.createElement('span');
            btnSupprimer.textContent = 'X';
            btnSupprimer.classList.add('supprJoueur');
            btnSupprimer.addEventListener('click', () => {
                this.supprimerJoueurSauvegarde(nomJoueur);
                this.afficherJoueursSauvegarde();
                this.afficherJoueursActif();
            });
            li.appendChild(btnAjouter);
            li.appendChild(btnSupprimer);
            listeJoueursSauvegarde.appendChild(li);
        });
    }
}

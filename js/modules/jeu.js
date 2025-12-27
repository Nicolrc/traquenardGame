import { DES_SVG } from './desSvg.js';
import { Joueurs } from './joueurs.js';
import { UI } from './ui.js';

export const jeu = 
{
    // Stock le paris pour les tours en cours
    parisDuTour: [],  
    // Suivi du joueur actuel
    indexJoueurActuel: 0,
    // Score dernier lancé
    scoreDernierTour: 0,
    // initialisation nouvel ordre de jeu
    nouvelOrdreParieur: [],
    // tableau avec la valeur des dés 
    valeursDes: [],

    getNombreDeDes()
    {
        const inputDes = document.getElementById('nb-des');
        const valeurDes = parseInt(inputDes.value);
        if(!Number.isInteger(valeurDes))
        {
            alert("Entrez un nombre entier")
            return
        }
        if(valeurDes > 6 || valeurDes < 0)
        {
            alert("Entrez un chiffre entre 0 et 6")
            return
        }
        return valeurDes;
    },

    créerDesSvg(valeur)
    {
        const val = Math.max(1, Math.min(6, valeur || 1));
        return DES_SVG[val];
    },

    initialiserDes(nombreDes)
    {
        if(typeof nombreDes !== "number" || nombreDes < 1)
        {
            return
        }

        const zoneDes = document.querySelector('.des');
        zoneDes.innerHTML = ''; 
        
        let desHTML = '';
        for (let i = 0; i < nombreDes; i++) {
            desHTML += this.créerDesSvg(1); 
        }
        zoneDes.innerHTML = desHTML;
    },

    lancerLesDes()
    {
        const desPresent = document.querySelector('.des').querySelectorAll('svg');
        const nombreDes = desPresent.length;

        if(nombreDes === 0)
        {
            alert("Il n'y a pas de dés à lancer");
        }
    
        this.valeurDes = [];
        const zoneDes = document.querySelector('.des'); 
        let desHTML = '';
        const resultatDes = [];
        let resultatFinal = 0;
        for (let i = 0; i < nombreDes; i++) 
        {
            const valeurAleatoire = Math.floor(Math.random() * 6) + 1;

            this.valeursDes.push(valeurAleatoire);
            desHTML += this.créerDesSvg(valeurAleatoire);
            resultatDes.push(valeurAleatoire);
        }
        for (let i = 0; i < resultatDes.length; i++)
        {
            resultatFinal += resultatDes[i];
            console.log(resultatFinal);
        }
        zoneDes.innerHTML = desHTML;

        this.scoreDernierTour = resultatFinal;
        return resultatFinal;
    },

    getMaxDesPossible(nombreDes)
    {
        return nombreDes*6;
    },

    ////////////////////////////////////////////////////////////////
    // Logique des tours de jeux. 
    ////////////////////////////////////////////////////////////////
    enregistrerParis(nomJoueur, montantParis)
    {
        // On stock le nom du joueur et son paris du tour
        this.parisDuTour.push({
            Joueur : nomJoueur,
            Paris : montantParis
        });

        console.log("État actuel des paris :", this.parisDuTour);
        // Si le pari est réussi, passer au joueur suivant
        this.indexJoueurActuel++;
    },

    preparerTour()
    {
        const premierJoueur = this.determinerLePremierParieur(); 
        this.parisDuTour = [];
        const listeReference = this.nouvelOrdreParieur.length > 0 
        ? this.nouvelOrdreParieur 
        : Joueurs.joueursActifs;

        const indexJoueur = listeReference.indexOf(premierJoueur);
        
        const listeIndex= listeReference.slice(indexJoueur);
        const listePartieDebut = listeReference.slice(0, indexJoueur);

        this.nouvelOrdreParieur = listeIndex.concat(listePartieDebut);

        this.indexJoueurActuel = 0;
        this.mettreAJourAffichageParis();
    },

    determinerLePremierParieur()
    {
        const scoreObtenu = this.scoreDernierTour;
        const joueurEnJeu = Joueurs.joueursActifs;
        let pireEcart = -1;
        let joueurLePlusLoin = null;

        if(this.parisDuTour.length > 0)
        {
            this.parisDuTour.forEach((pariActuel) =>{
                const distance = Math.abs(pariActuel.Paris - scoreObtenu);
                if(distance > pireEcart)
                {
                    pireEcart = distance;
                    joueurLePlusLoin = pariActuel.Joueur;
                } 
            });
            return joueurLePlusLoin;
        }
        else
        {
            if(joueurEnJeu.length > 0)
            {
                return joueurEnJeu[0];
            }
            else
            {
                UI.afficherNortification("Attention il n'y a pas de joueur en jeu");
                return;
            }
        }
    },

    mettreAJourAffichageParis()
    {
        let joueur = this.nouvelOrdreParieur[this.indexJoueurActuel];

        if(joueur)
        {
            const nomParieur = document.getElementById('nom-parieur');
            const paris = document.getElementById('chiffre-paris');
            nomParieur.textContent = joueur;
            paris.value = 0;
        }
    },

    gestionPerdant()
    {
        const scoreDes = this.scoreDernierTour;
        let pireEcart = -1;
        let nomPerdant = "";
        let parisPerdant = 0;
        let gagnantTrouve = false;

        if(this.parisDuTour.length > 0)
        {
            this.parisDuTour.forEach((pari) =>{
                const ecart = Math.abs(pari.Paris - scoreDes);
                if(ecart > pireEcart)
                {
                    pireEcart = ecart;
                    nomPerdant = pari.Joueur;
                    parisPerdant = pari.Paris;
                } 
                if (pari.Paris === scoreDes) 
                {
                    gagnantTrouve = true;
                }
            });

            const tousIdentiques = this.verifierDesIdentiques();

            let multiplicateur = 1;
            let messageStatus = "Jusqu'ici tout va bien ! X1";

            if (gagnantTrouve && tousIdentiques) {
                multiplicateur = 3;
                messageStatus = "Aïe aïe aïe tranquenard! X3";
            } else if (gagnantTrouve || tousIdentiques) {
                multiplicateur = 2;
                messageStatus = "ouïe c'est la chute du toboggan! X2 ";
            }

            const totalGorgees = pireEcart * multiplicateur;

            this.afficherResultatsFinaux(nomPerdant, scoreDes, parisPerdant, totalGorgees, messageStatus);
        }
        
    },

    verifierDesIdentiques()
    {
        return this.valeursDes.every(v => v === this.valeursDes[0]);
    },

    afficherResultatsFinaux(nom, score, paris, gorgees, message) 
    {
        const elNom = document.getElementById('nom-perdant');
        const elScore = document.getElementById('scoreDes');
        const elParis = document.getElementById('parisDuJoueur');
        const elGorgees = document.getElementById('nombre-gorge');
        const elTitre = document.querySelector('#vue-modale-perdant h3');

        // 2. Injecter les textes
        elTitre.textContent = message;
        elNom.textContent = `Perdant : ${nom}`;
        elScore.textContent = `Le score des dés était de : ${score}`;
        elParis.textContent = `Ton pari était de : ${paris}`;
        elGorgees.textContent = `Tu dois prendre ${gorgees} gorgées ! 🍻`;

        UI.afficherVue('perdant'); 
    }
}
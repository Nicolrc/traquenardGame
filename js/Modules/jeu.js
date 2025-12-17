import { DES_SVG } from './desSvg.js';
import { Joueurs } from './joueurs.js';

export const jeu = 
{
    // Stock le paris pour les tours en cours
    parisDuTour: [],  
    // Suivi du joueur actuel
    indexJoueurActuel: 0,


    enregistrerParis(nomJoueur, montantParis)
    {
        // On stock le nom di joueur et son paris du tour
        this.parisDuTour.push({
            Joueur : nomJoueur,
            Paris : montantParis
        });
        // Si le pari est réussi, passer au joueur suivant
        this.indexJoueurActuel++;
    },

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

    initialiserDes()
    {
        const nombreDes = this.getNombreDeDes();

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
    
        const zoneDes = document.querySelector('.des'); 
        let desHTML = '';
        const resultatDes = [];
        let resultatFinal = 0;
        for (let i = 0; i < nombreDes; i++) 
        {
            const valeurAleatoire = Math.floor(Math.random() * 6) + 1;
            desHTML += this.créerDesSvg(valeurAleatoire);
            resultatDes.push(valeurAleatoire);
        }
        for (let i = 0; i < resultatDes.length; i++)
        {
            resultatFinal += resultatDes[i];
            console.log(resultatFinal);
        }
        document.getElementById('resultat-total').textContent = `Score total: ${resultatFinal}`;
        zoneDes.innerHTML = desHTML;

        return resultatFinal;
    },

    determinerLePremerParieur()
    {
        const scoreObtenu = this.lancerLesDes();
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
    }
}
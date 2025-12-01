import { DES_SVG } from './desSvg.js';

export const jeu = 
{
    init()
    {
        
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
    }
}
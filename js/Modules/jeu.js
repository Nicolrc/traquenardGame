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
    }
}
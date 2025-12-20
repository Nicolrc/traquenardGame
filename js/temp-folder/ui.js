export const UI = {
    elements: {
        modale: null,
        overlay: null,
        contenuParameter: null,
        vueAjouter : null,
        vueListe : null,
        vueParis : null,
        notification: null
    },

    init(){
        this.elements.modale = document.getElementById('modale');
        this.elements.overlay = document.querySelector('.overlay');
        this.elements.contenuParameter = document.querySelector('.parameter');
        this.elements.vueAjouter = document.getElementById('vue-ajouter-joueur');
        this.elements.vueListe = document.getElementById('vue-ancien-joueur');
        this.elements.vueParis = document.getElementById('vue-modale-paris');
        this.elements.vuePerdant = document.getElementById('vue-modale-perdant')
        this.elements.notification = document.getElementById('notification');
    },

    ouvrirModale()
    {
        this.elements.modale.style.display = 'block';
        this.elements.overlay.classList.add('active');
    },

    fermerModale()
    {
        this.elements.modale.style.display = 'none';
        this.elements.overlay.classList.remove('active');
    },

    ouvrireMenuParametre()
    {
        this.elements.contenuParameter.classList.add('open');
        this.elements.overlay.classList.add('active');
    },

    fermerMenuParametre()
    {
        this.elements.contenuParameter.classList.remove('open');
        this.elements.overlay.classList.remove('active');
    },

    afficherVue(nomVue)
    {
        if(nomVue === 'ajouter')
        {
            this.elements.vueAjouter.classList.remove('hidden');
            this.elements.vueListe.classList.add('hidden');
            this.elements.vueParis.classList.add('hidden');
            this.elements.vuePerdant.classList.add('hidden');
        } 
        else if (nomVue === 'liste')
        {
            this.elements.vueAjouter.classList.add('hidden');
            this.elements.vueListe.classList.remove('hidden');
            this.elements.vueParis.classList.add('hidden');
            this.elements.vuePerdant.classList.add('hidden');
        }
        else if (nomVue === 'paris')
        {
            this.elements.vueAjouter.classList.add('hidden');
            this.elements.vueListe.classList.add('hidden');
            this.elements.vueParis.classList.remove('hidden');
            this.elements.vuePerdant.classList.add('hidden');
        }
        else if (nomVue === 'perdant')
        {
            this.elements.vueAjouter.classList.add('hidden');
            this.elements.vueListe.classList.add('hidden');
            this.elements.vueParis.classList.add('hidden');
            this.elements.vuePerdant.classList.remove('hidden');
        }
        this.fermerMenuParametre();
    },

    afficherNortification(message, duree = 3000)
    {
        this.elements.notification.textContent = message;
        this.elements.notification.classList.remove('hidden');

        setTimeout(() => {
            this.elements.notification.classList.add('hidden');
        }, duree);
    }
};
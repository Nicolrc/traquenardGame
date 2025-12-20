export const Storage =  
{
    KEYS: 
    {
        PLAYERS: 'joueurs',
        ACTIVE_PLAYERS: 'joueursActifs'
    },

    // Récupérer tous les joueurs sauvegardés
    getAllPlayers()
    {
        return JSON.parse(localStorage.getItem(this.KEYS.PLAYERS)) || [];
    },

    // Récupére les joueurs actifs
    getActivePlayers()
    {
        return JSON.parse(localStorage.getItem(this.KEYS.ACTIVE_PLAYERS)) || [];
    },

    // Sauvegarde tous les joueurs 
    saveAllPlayers(joueurs)
    {
        localStorage.setItem(this.KEYS.PLAYERS, JSON.stringify(joueurs));
    },

    // Sauvegarde les joueurs actifs
    saveActivePlayers(joueurs)
    {
        localStorage.setItem(this.KEYS.ACTIVE_PLAYERS, JSON.stringify(joueurs));
    },

    // Vérifier si un joueur existe déjà
    playerExists(nomJoueur, listeJoueur)
    {
        return listeJoueur.includes(nomJoueur);
    }
}
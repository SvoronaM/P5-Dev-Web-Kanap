//Récupération du numéro de commande dans l'URL
// window.location.href renvoie le href (URL) de la page en cours
let str = window.location.href;
let url = new URL(str);
// url.searchParams.get renvoie la première valeur associée au paramètre de recherche donné(id).
let idOrderURL = url.searchParams.get("orderId");
//Affichage du numéro de commande, retour id avec querySelector
let orderIdNumberElt = document.querySelector('#orderId');
orderIdNumberElt.innerText = `${idOrderURL}. Nous vous remercions pour votre commande!`;
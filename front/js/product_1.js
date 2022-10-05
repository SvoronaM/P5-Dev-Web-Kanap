// Récupération des éléments qui contiendront les détails du produit
const itemPresentation = document.querySelector(".item");
const itemContent = document.querySelector("article");
const itemImgContainer = document.querySelector(".item__img");
const itemName = document.getElementById("title");
const itemPrice = document.getElementById("price");
const itemDescription = document.getElementById("description");
const itemColor = document.getElementById("colors");


// Extraction de l'ID du produit depuis l'URL
let params = new URL(document.location).searchParams;
let productId = params.get("id");
console.log(`Récupération de l'id du produit ayant enregistré le clic sur la page d'accueil : ${productId}`);


//envoi d'une requête a l'API avec fetch
fetch(`http://localhost:3000/api/products/${productId}`)
    // Si la requête est validé, retourne la réponse en JSON
    .then((response) => response.json())
    //définit API response en productDetails
    .then((productDetails) => {
        // Insertion de l'image
        let productImg = document.createElement("img");
        productImg.setAttribute("src", productDetails.imageUrl);
        productImg.setAttribute("alt", productDetails.altTxt);
        itemImgContainer.appendChild(productImg);

        // Insertion du nom
        let productName = productDetails.name;
        itemName.textContent = productName;

        // Insertion du prix
        let productPrice = productDetails.price;
        itemPrice.textContent = productPrice;

        // Insertion de la description
        let productDescription = productDetails.description;
        itemDescription.textContent = productDescription;

        // Insertion des couleurs, parcoure le tableau renvoyé par l'API pour insérer dynamiquement des options de couleur (colorOption) dans l'élément itemColor (.color)
        let productColors = productDetails.colors;
        for (i = 0; i < productColors.length; i++) {
            let colorOption = document.createElement("option");
            colorOption.setAttribute("value", productColors[i]);
            colorOption.innerText = productColors[i];
            itemColor.appendChild(colorOption);
        }
    })
    // si la requête est rejeté, Création d'un message à télécharger dans l'élément item pour informer l'utilisateur que quelque chose s'est mal passé.
    .catch((error) => {
        console.log("Il y a eu une erreur dans le chargement du produit sur le site." + error);
        itemPresentation.removeChild(itemContent);
        let productErrorMessage = document.createElement("h2");
        productErrorMessage.textContent = "Nous rencontrons des difficultés techniques pour afficher l'article que vous avez sélectionné. Nos équipes sont à l'oeuvre pour résoudre ce problème dans les plus brefs délais. Nous vous invitons à réessayer ultérieurement et nous excusons pour la gêne occasionnée.";
        productErrorMessage.style.textAlign = "center";
        productErrorMessage.style.padding = "15px";
        itemPresentation.appendChild(productErrorMessage);
    });



// Ajout des produits a Cart
// Récupération du Bouton dans une constante
const addToCartBtn = document.getElementById("addToCart");


// Récupération des quantité et des couleurs dans des variables
let quantity = document.getElementById("quantity");
let color = document.getElementById("colors");

// Ajout du listener
addToCartBtn.addEventListener("click", () => {
    // Définition des valeurs de colorPicked et de quantityPicked
    let colorPicked = color.value;
    let quantityPicked = Number(quantity.value);
    // Récupération du nom du produit
    let productName = document.getElementById("title").textContent;
    // création de l'objet pour cart
    let product = {
        id: productId,
        color: colorPicked,
        quantity: quantityPicked,
        name: productName,
    };
    // Si la couleur et la quantité ont été choisi, ajoute a Cart sinon envoi un message erreur
    if (color.value !== "" && quantity.value > 0 && quantity.value <= 100) {
        addToCart(product);
        alert("Votre choix a bien été effectué et votre article a été ajouté à votre panier.");
    } else {
        alert("Veuillez sélectionner une couleur et indiquer la quantité souhaitée. Attention, la quantité maximale est fixée à 100 articles.");
    }
});
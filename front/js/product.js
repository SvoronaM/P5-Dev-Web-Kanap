// Récupération de id dans URL
let string = window.location.href
let url = new URL(string)
let idURL = url.searchParams.get("id")
// Appel API avec l'id du produit
let requestURL = "http://localhost:3000/api/products/" + idURL
fetch(requestURL)
    .then(response => response.json())
    .then(async function (resultatAPI) {
        let  productUnit = await resultatAPI
        showProduct(productUnit)
    })
    // Message au cas où le serveur ne répond pas
    .catch(error => alert('Le serveur ne répond pas, suivez les instructions dans le README.md' + error))
        // Modification de contenu de chaque variable avec les bonnes données :
function showProduct(data) {
    document.title = data.name
    let panelImages = document.querySelector('.item__img')
            // Insertion image du canapé
    let createPict = document.createElement('img')
    createPict.setAttribute('src', data.imageUrl)
    createPict.setAttribute('alt', data.altTxt)
    panelImages.appendChild(createPict)
            // Insertion du nom du canapé
    let panelH1 = document.querySelector('#title')
    panelH1.textContent = data.name
            // Insertion du prix du canapé
    let panelPrice = document.querySelector('#price')
    panelPrice.textContent =data.price
            // Insertion du choix du canapé
     let panelDescription = document.querySelector('#description')
      panelDescription.textContent = data.description
            // Récupération de #colors
      let panelOption = document.querySelector('#colors')
            // Insertion du tableau des couleurs dans une variable
      let colors = data.colors
            // Parcour du tableau des couleurs et insertion de celles-ci dans choix
      for (let i = 0; i < colors.length; i++){
                let colorProduct = colors[i]
                let createOption = document.createElement('option')
                createOption.setAttribute('value', colorProduct)
                createOption.textContent = colorProduct
                panelOption.appendChild(createOption)
            }
        }

//     Récupération des donnes par rapport au choix de l'utilisateur
const selectQuantity = document.getElementById('quantity');
const selectColors = document.getElementById('colors');

// je configure un eventListener quand l'utilisateur clique sur ajouter au panier
const addToCart = document.getElementById('addToCart');
addToCart.addEventListener('click', (event) => {
    event.preventDefault();

    const selection = {
        id: newID,
        image: imageURL,
        alt: imageAlt,
        name: title.textContent,
        price: price.textContent,
        color: selectColors.value,
        quantity: selectQuantity.value,
    };

    // je déclare une variable productInLocalStorage
    // dans laquelle je mets les clés+valeurs dans le local storage
    // JSON.parse permet de convertir les données au format JSON en objet JavaScript
    let productInLocalStorage =  JSON.parse(localStorage.getItem('product'));

    // j'ajoute les produits sélectionnés dans le localStorage
    const addProductLocalStorage = () => {
        // je récupère la sélection de l'utilisateur dans le tableau de l'objet :
        // on peut voir dans la console qu'il y a les données,
        // mais pas encore stockées dans le storage à ce stade

        productInLocalStorage.push(selection);
        // je stocke les données récupérées dans le localStorage :
        // JSON.stringify permet de convertir les données au format JavaScript en JSON
        // vérifier que key et value dans l'inspecteur contiennent bien des données
        localStorage.setItem('product', JSON.stringify(productInLocalStorage));
    }

    // je crée une boîte de dialogue pour confirmer l'ajout au panier
    let addConfirm = () => {
        alert('Le produit a bien été ajouté au panier');
    }

    let update = false;

    // s'il y a des produits enregistrés dans le localStorage
    if (productInLocalStorage) {
        // verifier que le produit ne soit pas deja dans le localstorage/panier
        // avec la couleur
        productInLocalStorage.forEach (function (productOk, key) {
            if (productOk.id == newID && productOk.color == selectColors.value) {
                productInLocalStorage[key].quantity = parseInt(productOk.quantity) + parseInt(selectQuantity.value);
                localStorage.setItem('product', JSON.stringify(productInLocalStorage));
                update = true;
                addConfirm();
            }
        });

        //
        if (!update) {
            addProductLocalStorage();
            addConfirm();
        }
    }

    // s'il n'y a aucun produit enregistré dans le localStorage
    else {
        // je crée alors un tableau avec les éléments choisi par l'utilisateur
        productInLocalStorage = [];
        addProductLocalStorage();
        addConfirm();
    }
});
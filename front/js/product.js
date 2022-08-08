let string = window.location.href
let url = new URL(string)
let idURL = url.searchParams.get("id")
// Appel API avec l'id du produit
let productUnit = ""
let requestURL = "http://localhost:3000/api/products/" + idURL
fetch(requestURL)
    .then(response => response.json())
    .then(async function (resultatAPI) {
        productUnit = await resultatAPI
        showProduct(productUnit)
    })
    // ajoute un message au cas où le serveur ne répond pas
    .catch(error => alert('Le serveur ne répond pas, suivez les instructions dans le READ.me.' + error))
        // modification de contenu de chaque variable avec les bonnes données :
        function showProduct(data) {
            document.title = data.name
            let panelImages = document.querySelector('.item__img')
            // insertion image du canapé
            let createPict = document.createElement('img')
            createPict.setAttribute('src', data.imageUrl)
            createPict.setAttribute('alt', data.altTxt)
            panelImages.appendChild(createPict)
            // insertion du nom du canapé
            let panelH1 = document.querySelector('#title')
            panelH1.textContent = data.name
            // insertion du prix du canapé
            let panelPrice = document.querySelector('#price')
            panelPrice.textContent =data.price
            // insertion du choix du canapé
            let panelDescription = document.querySelector('#description')
            panelDescription.textContent = data.description
            // récupération de #colors
            let panelOption = document.querySelector('#colors')
            // insertion du tableau des couleurs dans une variable
            let colors = data.colors
            // parcour du tableau des couleurs et insertion de celles-ci dans choix
            for (let i = 0; i < colors.length; i++){
                let colorProduct = colors[i]
                let createOption = document.createElement('option')
                createOption.setAttribute('value', colorProduct)
                createOption.textContent = colorProduct
                panelOption.appendChild(createOption)
            }
        }
//     RECUPERATION DES DONNEES PAR RAPPORT AU CHOIX DE L'UTILISATEUR
const selectQuantity = document.getElementById('quantity')
const selectColors = document.getElementById('colors')
// configuration un eventListener quand l'utilisateur clique sur ajouter au panier
const addToCart = document.getElementById('addToCart')
addToCart.addEventListener('click', (event) => {
    event.preventDefault();

    const selection = {
        id: newID,
        image: imageUrl,
        alt: imageAlt,
        name: title.textContent,
        price: price.textContent,
        color: selectColors.value,
        quantity: selectQuantity.value,
    }
    // je déclare une variable productInLocalStorage
    let productInLocalStorage =  JSON.parse(localStorage.getItem('product'))
    // Ajoute les produits sélectionnés dans le localStorage
    const addProductLocalStorage = () => {
        // récupèration de la sélection de l'utilisateur dans le tableau de l'objet :
        productInLocalStorage.push(selection)
        // stockage des données récupérées dans le localStorage :
        localStorage.setItem('product', JSON.stringify(productInLocalStorage))
    }
    // création d'une boîte de dialogue pour confirmer l'ajout au panier
    let addConfirm = () => {
        alert('Le produit a bien été ajouté au panier')
    }
    let update = false
    // s'il y a des produits enregistrés dans le localStorage
    if (productInLocalStorage) {
        // verification que le produit ne soit pas deja dans le localstorage/panier
        productInLocalStorage.forEach (function (productOk, key) {
            if (productOk.id == newID && productOk.color == selectColors.value) {
                productInLocalStorage[key].quantity = parseInt(productOk.quantity) + parseInt(selectQuantity.value)
                localStorage.setItem('product', JSON.stringify(productInLocalStorage))
                update = true
                addConfirm()
            }
        });
        if (!update) {
            addProductLocalStorage()
            addConfirm()
        }
    }
    // s'il n'y a aucun produit enregistré dans le localStorage
    else {
        // création un tableau avec les éléments choisi par l'utilisateur
        productInLocalStorage = []
        addProductLocalStorage()
        addConfirm()
    }
});
/// Récupération du contenu du panier à partir du localstorage
let basketStr = localStorage.getItem('basket')
let basket = JSON.parse(basketStr)

// Récupération de l'élement "cart__items"
let cartPanel = document.querySelector('#cart__items');

function showProductBasketCreatArticlePict(produit, createArticle) {
    // insertion des articles
    createArticle.className = 'cart__item'
    createArticle.setAttribute('data-id', produit.id)
    createArticle.setAttribute('data-color', produit.color)
    cartPanel.appendChild(createArticle)
    // insertion div de l'img
    let createDivIMG = document.createElement('div')
    createDivIMG.className = 'cart__item__img'
    createArticle.appendChild(createDivIMG)
    // insertion des images
    let createPict = document.createElement('img')
    createPict.setAttribute('src', produit.img)
    createPict.setAttribute('alt', "Photographie d'un canapé")
    createDivIMG.appendChild(createPict)
}
// insertion div content description
function showProductBasketCreatContDescr(produit, createArticle, createDivDes, createDivContDes) {
    createDivContDes.className = 'cart__item__content'
    createArticle.appendChild(createDivContDes)
    // insertion div description
    createDivDes.className = 'cart__item__content__description'
    createDivContDes.appendChild(createDivDes)
    // insertion H2
    let createH2 = document.createElement('h2')
    createH2.textContent = produit.name
    createDivDes.appendChild(createH2)
    // insertion P color
    let createpColor = document.createElement('p')
    createpColor.textContent = "Couleur : " + produit.color
    createDivDes.appendChild(createpColor)
}
// recupération du prix en utilisant l'id du produit
function showProductBasketPr(produit, createDivDes) {
    let productUnit = ""
    // L'API Fetch fournit une interface pour la récupération de ressources
    fetch("http://localhost:3000/api/products/" + produit.id)
        .then(response => response.json())
        .then(async function (resultatAPI) {
            productUnit = await resultatAPI
            // insertion P price
            let createpPrice = document.createElement('p')
            createpPrice.textContent = (`Prix :   ${productUnit.price}   € / canapé`)
            createDivDes.appendChild(createpPrice)
        })
        .catch(error => alert("Erreur : " + error))
}
// insertion div content settings
function showProductBasketQuant(produit, createDivContDes, createDivContSet, createDivContSetQuantity) {
    createDivContSet.className = 'cart__item__content__settings'
    createDivContDes.appendChild(createDivContSet)
    // insertion div settings quantity
    createDivContSetQuantity.className = 'cart__item__content__settings__quantity'
    createDivContSet.appendChild(createDivContSetQuantity)
    // insertion P quantity
    let createpQuantity = document.createElement('p')
    createpQuantity.textContent = "Qté :"
    createDivContSetQuantity.appendChild(createpQuantity)
}
// insertion input quantity
function showProductBasketInpQuant(produit, createDivContSetQuantity) {
    let createInputQuantity = document.createElement('input')
    createInputQuantity.className = 'itemQuantity'
    createInputQuantity.setAttribute('type', 'number')
    createInputQuantity.setAttribute('name', 'itemQuantity')
    createInputQuantity.setAttribute('min', '0')
    createInputQuantity.setAttribute('max', '100')
    createInputQuantity.setAttribute('value', produit.quantity)
    createDivContSetQuantity.appendChild(createInputQuantity)
}
// insertion div settings delete
function showProductBasketDelp(produit, createDivContSet) {
    let createDivContSetDel = document.createElement('div')
    createDivContSetDel.className = 'cart__item__content__settings__delete'
    createDivContSet.appendChild(createDivContSetDel)
    // insertion P delete
    let createpDelete = document.createElement('p')
    createpDelete.className = 'deleteItem'
    createpDelete.textContent = "Supprimer"
    createDivContSetDel.appendChild(createpDelete)
}
// Affichage des produits dans la page panier
function showProductBasket(produit) {
    let createArticle = document.createElement('article')
    let createDivDes = document.createElement('div')
    let createDivContDes = document.createElement('div')
    let createDivContSet = document.createElement('div')
    let createDivContSetQuantity = document.createElement('div')
    showProductBasketCreatArticlePict(produit, createArticle)
    showProductBasketCreatContDescr(produit, createArticle, createDivDes, createDivContDes)
    showProductBasketPr(produit, createDivDes)
    showProductBasketQuant(produit, createDivContDes, createDivContSet, createDivContSetQuantity)
    showProductBasketInpQuant(produit, createDivContSetQuantity)
    showProductBasketDelp(produit, createDivContSet)
}
// Récupération de produit dans l'API via son id
async function getProduct(id) {
    return fetch("http://localhost:3000/api/products/" + id)
        .then(response => response.json())
        .catch(error => alert("Erreur : " + error))
}
// Si le panier est vide, afficher "panier vide"
// Si non parser le panier, et utiliser la function showproductbasket
async function showCart() {
    if (basketStr == null) {
        let createpEmpty = document.createElement('p')
        createpEmpty.textContent = 'Votre panier est vide'
        cartPanel.appendChild(createpEmpty)
    } else {
        let totalPrice = 0
        for (let i = 0 ; i < basket.products.length; i++) {
            basketProduct = basket.products[i]
            showProductBasket(basketProduct)
            let productsPrice = await getProduct(basketProduct.id)
            let productQuantity = basketProduct.quantity
            totalPrice += productsPrice.price * productQuantity
            let totalPriceElt = document.querySelector('#totalPrice')
            totalPriceElt.textContent = totalPrice
        }
        let totalQuantity = document.querySelector('#totalQuantity')
        totalQuantity.textContent = basket.totalQuantity
        changeQuantity()
        delProduct()
    }
}
showCart()
// Changement quantité et prix
function changeQuantity() {
    let quantityItem = document.querySelectorAll('.itemQuantity')
    for (let k = 0; k < quantityItem.length; k++) {
        quantityItemUnit = quantityItem[k]
        quantityItemUnit.addEventListener('change', function(event) {
            for (let l = 0 ; l < basket.products.length; l++) {
                basketProduct = basket.products[l]
                let articleQuantityItemID = event.target.closest('article').getAttribute("data-id")
                let articleQuantityItemColor = event.target.closest('article').getAttribute("data-color")
                newQuantityValue = event.target.valueAsNumber
                if (basketProduct.id == articleQuantityItemID && basketProduct.color == articleQuantityItemColor) {
                    qtyToAdd = newQuantityValue - basketProduct.quantity
                    basketProduct.quantity = newQuantityValue
                    basket.totalQuantity = basket.totalQuantity + qtyToAdd
                    // JSON.stringify() method converts a JavaScript value to a JSON string
                    let lineBasket = JSON.stringify(basket)
                    localStorage.setItem("basket", lineBasket)
                    window.location.reload()
                }
            }
        })
    }
}
// Suppression d'un canapé
function delProduct() {
    let delItem = document.querySelectorAll('.deleteItem')
    for (let j = 0; j < delItem.length; j++) {
        delItemUnit = delItem[j]
        // e - Event. Event.target - C'est une référence à l'objet qui a envoyé l'événement. La méthode closest() traverse l'élément courant
        delItemUnit.addEventListener('click', function(e) {
            let articleDelItemID = e.target.closest('article').getAttribute("data-id")
            let articleDelItemColor = event.target.closest('article').getAttribute("data-color")
            let basket = JSON.parse(basketStr)
            //  find() renvoie la valeur du premier élément trouvé dans le tableau qui respecte la condition donnée
            productToDel = basket.products.find(el => el.id == articleDelItemID && el.color == articleDelItemColor)
            // filter() crée et retourne un nouveau tableau contenant tous les éléments du tableau d'origine
            result = basket.products.filter(el => el.id !== articleDelItemID || el.color !== articleDelItemColor)
            basket.products = result
            newQuantity = basket.totalQuantity - productToDel.quantity
            basket.totalQuantity = newQuantity
            priceToDel = productToDel.quantity * productToDel.price
            alert('Vous avez bien supprimé votre produit du panier !')
            if (basket.totalQuantity == 0) {
                localStorage.clear()
                window.location.reload()
            } else {
                let lineBasket = JSON.stringify(basket)
                localStorage.setItem("basket", lineBasket)
                window.location.reload()
            }
        })
    }
}
// Validation formulaire
let form = document.querySelector(".cart__order__form")
// RegExp - correspondances d'un texte avec un motif donné
let adressRegExp = new RegExp("^[A-zÀ-ú0-9 ,.'\-]+$")
let nameRegExp = new RegExp("^[A-zÀ-ú \-]+$")
let emailRegExp = new RegExp("^[a-zA-Z0-9_. -]+@[a-zA-Z.-]+[.]{1}[a-z]{2,10}$")
// Prénom
let firstNameErrorMsg = document.querySelector('#firstNameErrorMsg')
form.firstName.addEventListener('change', function(e) {
    let value = e.target.value
    if (nameRegExp.test(value)){
        firstNameErrorMsg.innerText = ''
    } else {
        firstNameErrorMsg.innerText = 'Champ invalide, veuillez vérifier votre prénom.'
    }
})
// Nom
let lastNameErrorMsg = form.lastName.nextElementSibling
form.lastName.addEventListener('change', function(e) {
    let value = e.target.value
    if (nameRegExp.test(value)){
        lastNameErrorMsg.innerText = ''
    } else {
        lastNameErrorMsg.innerText = 'Champ invalide, veuillez vérifier votre nom.'
    }
})
// Adresse
let adressErrorMsg = document.querySelector('#addressErrorMsg')
form.address.addEventListener('change', function(e) {
    let value = e.target.value
    if (adressRegExp.test(value)){
        adressErrorMsg.innerText = ''
    } else {
        adressErrorMsg.innerText = 'Champ invalide, veuillez vérifier votre adresse postale.'
    }
})
// Ville
let cityErrorMsg = document.querySelector('#cityErrorMsg')
form.city.addEventListener('change', function(e) {
    let value = e.target.value
    if (nameRegExp.test(value)){
        cityErrorMsg.innerText = ''
    } else {
        cityErrorMsg.innerText = 'Champ invalide, veuillez vérifier votre ville.'
    }
})
// Email
let emailErrorMsg = document.querySelector('#emailErrorMsg')
form.email.addEventListener('change', function(e) {
    let value = e.target.value
    if (emailRegExp.test(value)){
        emailErrorMsg.innerText = ''
    } else {
        emailErrorMsg.innerText = 'Champ invalide, veuillez vérifier votre adresse email.'
    }
})
// Passer commande
let btnOrder = document.querySelector('#order')

btnOrder.addEventListener('click', function(e) {
    e.preventDefault()
    let inputFirstName = document.getElementById('firstName')
    let inputLastName = document.getElementById('lastName')
    let inputAddress = document.getElementById('address')
    let inputCity = document.getElementById('city')
    let inputEmail = document.getElementById('email')

    if (basketStr == null) {
        alert("Pour passer commande, veuillez ajouter des produits à votre panier")
        e.preventDefault()
    } else if (
        firstName.value === ""
        || lastName.value === ""
        || address.value === ""
        || city.value === ""
        || email.value === ""
    ) {
        alert("Vous devez renseigner vos coordonnées pour passer la commande !")
        e.preventDefault();
    } else if (
        nameRegExp.test(inputFirstName.value) ==  false
        || nameRegExp.test(inputLastName.value) ==  false
        || adressRegExp.test(inputAddress.value) ==  false
        || nameRegExp.test(inputCity.value) ==  false
        || emailRegExp.test(inputEmail.value) ==  false
    ) {
        alert("Vérifiez vos coordonnées pour passer la commande !")
        e.preventDefault()
    } else {
        productID = []
        for (let m = 0; m < basket.products.length; m++) {
            productID.push(basket.products[m].id)
        }
        let order = {
            contact : {
                firstName: inputFirstName.value,
                lastName: inputLastName.value,
                address: inputAddress.value,
                city: inputCity.value,
                email: inputEmail.value,
            },
            products : productID
        }
        fetch("http://localhost:3000/api/products/order", {
            // .post() permet d'envoyer des données
            method: 'POST',
            body: JSON.stringify(order),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
        })
            .then((response) => response.json())
            .then(async function (resultOrder) {
                order = await resultOrder
                document.location.href = "confirmation.html?orderId=" + order.orderId
                localStorage.clear()
            })
    }
})
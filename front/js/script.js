//fetch récupére les données depuis de l'API
fetch('http://localhost:3000/api/products')
//la réponse (en staged) transformation en json
    .then(res => res.json())
//afficher (en online) les données dans la fonction showProducts
    .then(data => {
        showProducts(data);
    })
//message error de serveur
    .catch(_error => {
        alert('Le serveur ne répond pas, suivez les instructions dans le READ.me.')
    })

//Affichage tous les produit
function showProducts(data) {
//product de la promise
    for (product of data) {
//élément items dans index.html
        const itemCard = document.getElementById('items')
//ajouter tous les éléments
        itemCard.innerHTML +=`<a href="./product.html?id=${product._id}">
        <article>
        <img src="${product.imageUrl}" alt="${product.altTxt}">
          <h3 class="productName">${product.name}</h3>
          <p class="productDescription">${product.description}</p>
        </article></a>`
    }
}


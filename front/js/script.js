//fetch récupére les données depuis de l'API
fetch('http://localhost:3000/api/products')
//La réponse (en staged) transformation en json
    .then(response => response.json())
//Afficher (en online) les données dans la fonction showProducts
    .then(data => {
        showProducts(data);
    })
//message error de serveur
    .catch(_error => {
        alert('Le serveur ne répond pas, suivez les instructions dans le READ.me.')
    })

// Affichage des produits
function showProducts(data) {
    for (let i = 0; i < data.length; i++){
        let product = data[i]
        let allPanels = document.querySelector('.items')
        let createLinkPanel = document.createElement('a')
        let createArticle = document.createElement('article')
        let createPict = document.createElement('img')
        let createH3 = document.createElement('h3')
        let createP = document.createElement('p')
        // insertion du lien de chaque canapés
        createLinkPanel.setAttribute('href', "./product.html?id=" + product._id)
        allPanels.appendChild(createLinkPanel)
        // insertion des articles
        createLinkPanel.appendChild(createArticle)
        // insertion des images
        createPict.setAttribute('src', product.imageUrl)
        createPict.setAttribute('alt', product.altTxt)
        createArticle.appendChild(createPict)
        // insertion des noms dans h3
        createH3.className = 'productName'
        createH3.textContent = product.name
        createArticle.appendChild(createH3)
        // insertion des descriptions dans p
        createP.className = 'productDescription'
        createP.textContent = product.description
        createArticle.appendChild(createP)
    }
}

// Extrait order Id depuis l'URL et l'ajoute dans le texte de l'élément HTML orderId
let params = new URL(document.location).searchParams;
document.getElementById("orderId").textContent = params.get("id");
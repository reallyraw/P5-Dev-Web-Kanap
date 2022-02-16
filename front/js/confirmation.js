const searchId = window.location.search; // Récupère l'id
const params = new URLSearchParams(searchId);
const idNumber = params.get("id");
const orderId = document.getElementById("orderId");
orderId.appendChild(
    document.createTextNode(`${idNumber}`)
  );
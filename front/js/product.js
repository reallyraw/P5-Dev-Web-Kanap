// Page produit

// Variables
const $itemImg = document.getElementById("product-img");
const $itemName = document.getElementById("title");
const $itemPrice = document.getElementById("price");
const $itemDesc = document.getElementById("description");
const $itemColor = document.getElementById("color-choice");
const $addToCart = document.getElementById("addToCart");
const $itemQty = document.getElementById("quantity");
const $itemColorPicker = document.getElementById("colors");
const productId = window.location.search; // Récupère l'id
const params = new URLSearchParams(productId);
const idNumber = params.get("Id");
var selectedQty = null;
var selectedColor = null;
var $cartItems = [];
var $cart = [];

class shoppingCart {
  constructor(id, color, quantity) {
    this.id = id;
    this.color = color;
    this.quantity = quantity;
  }
}

// fetch API
const retrieveData = () =>
  fetch(`http://localhost:3000/api/products`)
    .then((res) => res.json())
    .catch((err) => console.log("Oh no", err));

// Fill Product Data
const fillProductData = (product) => {
  $itemName.textContent = product.name;
  $itemPrice.textContent = product.price;
  $itemDesc.textContent = product.description;

  $itemImg.setAttribute("src", `${product.imageUrl}`);
  $itemImg.setAttribute("alt", `${product.altTxt}`);

  for (let i = 0; i < product.colors.length; i++) {
    $itemColor.insertAdjacentHTML(
      "afterend",
      "<option value=" +
        `${product.colors[i]}` +
        ">" +
        `${product.colors[i]}` +
        "</option>"
    );
  }
};

// Vérifie les champs
const checkColorSelected = () => {
  selectedColor =
    $itemColorPicker.options[$itemColorPicker.selectedIndex].value;

  if (selectedColor == "select") {
    alert("Choisissez une couleur");
    return false;
  } else {
    return true;
  }
};

const checkQty = () => {
  selectedQty = $itemQty.value;

  if (selectedQty == "0") {
    alert("La quantité doit être supérieure à 0");
    return false;
  } else {
    return true;
  }
};

const isCartValid = () => checkColorSelected() && checkQty();

const cartClick = () => {
  if (isCartValid()) {
    // On store à partir de maintenant les données
    const $itemInCart = new shoppingCart(idNumber, selectedColor, selectedQty);
    // on doit check si id est dejà là
      // si oui: on check si couleur est dejà là
        // si oui: somme quantité
        // si non: push
      // si non: push
    for (let i = 0; i < $cart.length; i++) {
      if ($cart[i]) {
        if ($cart[i].id === idNumber) {
          if ($cart[i].color === selectedColor) {
            console.log('oui')
            // const sameItem = $cart.filter(i => i.id === idNumber && i.color === selectedColor)
            console.log(sameItem)
          } else {
            $cartItems.push($itemInCart);
            localStorage.setItem("cart", JSON.stringify($cartItems));
          }
        } else {
          $cartItems.push($itemInCart);
          localStorage.setItem("cart", JSON.stringify($cartItems));
        }
      }
    }
    
    var $cart = JSON.parse(localStorage.getItem('cart'));

    alert("Article ajouté au panier !");
  } else {
      console.error("Erreur inattendue")
  }
};

// execute
const main = async () => {
  const productData = await retrieveData();

  for (let i = 0; i < productData.length; i++) {
    if (productData[i]._id === idNumber) {
      fillProductData(productData[i]);
    }
  }
};

main();


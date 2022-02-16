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
var cartItems = [];
var cart = JSON.parse(localStorage.getItem("cart")) || [];

class shoppingCart {
  constructor(id, color, quantity) {
    this.id = id;
    this.color = color;
    this.quantity = quantity;
  }
}

const retrieveData = () =>
  fetch(`http://localhost:3000/api/products`)
    .then((res) => res.json())
    .catch((err) => console.log("Oh no", err));

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

// Check Inputs

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

// On click

const handleCartBtn = () => {
  if (isCartValid()) {
    const itemInCart = new shoppingCart(idNumber, selectedColor, selectedQty);

    if (cart.length > 0) {
      let isItemAlreadyInCart = false;
      for (let i = 0; i < cart.length; i++) {
        if (cart[i].id === idNumber && cart[i].color === selectedColor) {
          cart[i].quantity = Number(cart[i].quantity) + Number(selectedQty);
          isItemAlreadyInCart = true;
        }
      }
      if (!isItemAlreadyInCart) {
        addToCart(itemInCart);
      }
      localStorage.setItem("cart", JSON.stringify(cart));
    } else {
      addToCart(itemInCart);
    }
    alert("Article ajouté au panier !");
  } else {
    console.error("Erreur inattendue");
  }
};

const addToCart = (item) => {
  cart.push(item);
  localStorage.setItem("cart", JSON.stringify(cart));
};

const main = async () => {
  const productData = await retrieveData();

  for (let i = 0; i < productData.length; i++) {
    if (productData[i]._id === idNumber) {
      fillProductData(productData[i]);
    }
  }
};

main();

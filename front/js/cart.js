const $cartItems = document.getElementById("cart__items");
var $totalQty = document.getElementById("totalQuantity");
var $totalPrice = document.getElementById("totalPrice");

class cartItem {
  constructor(id, color, quantity) {
    this.id = id;
    this.color = color;
    this.quantity = quantity;
  }
}

const displayEmptyCartMessage = () => {
  $cartItems.replaceChildren();
  const cartText = document.createElement("p");
  cartText.appendChild(
    document.createTextNode(`Il n'y a pas encore de produits ici, visitez `)
  );
  const cartLink = document.createElement("a");
  cartLink.setAttribute("href", "./index.html");
  cartLink.style.color = "white";
  cartLink.style["font-weight"] = "700";
  cartLink.appendChild(document.createTextNode("notre sélection"));
  cartText.appendChild(cartLink);
  $cartItems.appendChild(cartText);
};

const createItemImg = (item) => {
  const $itemImgDiv = document.createElement("div");
  $itemImgDiv.classList.add("cart__item__img");

  const $itemImg = document.createElement("img");
  $itemImg.setAttribute("src", `${item.imageUrl}`);
  $itemImg.setAttribute("alt", `${item.altTxt}`);

  $itemImgDiv.appendChild($itemImg);

  return $itemImgDiv;
};

const createItemContent = (item, values) => {
  const $itemContent = document.createElement("div");
  $itemContent.classList.add("cart__item__content");

  const $itemContentDescription = document.createElement("div");
  $itemContentDescription.classList.add("cart__item__content__description");

  const $itemProductName = document.createElement("h2");
  $itemProductName.textContent = `${item.name}`;
  $itemContentDescription.appendChild($itemProductName);

  const $itemColor = document.createElement("p");
  $itemColor.textContent = `${values.color}`;
  $itemContentDescription.appendChild($itemColor);

  const $itemPrice = document.createElement("p");
  $itemPrice.textContent = `${item.price}` + "€";
  $itemContentDescription.appendChild($itemPrice);

  const $itemContentSettings = document.createElement("div");
  $itemContentSettings.classList.add("cart__item__content__settings");

  const $itemContentQty = document.createElement("div");
  $itemContentQty.classList.add("cart__item__content__settings__quantity");

  const $itemQtyDesc = document.createElement("p");
  $itemQtyDesc.textContent = `Qté : `;
  $itemContentQty.appendChild($itemQtyDesc);

  const $itemQty = document.createElement("input");
  $itemQty.setAttribute("type", `number`);
  $itemQty.setAttribute("name", `itemQuantity`);
  $itemQty.setAttribute("min", `1`);
  $itemQty.setAttribute("max", `100`);
  $itemQty.setAttribute("value", `${values.quantity}`);

  $itemContentQty.classList.add("itemQuantity");
  $itemContentQty.appendChild($itemQty);

  const $itemSettingsDelete = document.createElement("div");
  $itemSettingsDelete.classList.add("cart__item__content__settings__delete");

  const $itemDelete = document.createElement("p");
  $itemDelete.classList.add("deleteItem");
  $itemDelete.textContent = `Supprimer`;

  $itemSettingsDelete.appendChild($itemDelete);

  $itemContentSettings.appendChild($itemContentQty);
  $itemContentSettings.appendChild($itemSettingsDelete);

  const $itemImgDiv = createItemImg(item);

  $itemContent.appendChild($itemImgDiv);
  $itemContent.appendChild($itemContentDescription);
  $itemContent.appendChild($itemContentSettings);

  return $itemContent;
};

const createItemArticle = (item, values) => {
  const $itemCard = document.createElement("article");
  $itemCard.classList.add("cart__item");

  $itemCard.setAttribute("data-id", `${values.id}`);
  $itemCard.setAttribute("data-color", `${values.color}`);

  const $itemContent = createItemContent(item, values);
  $itemCard.appendChild($itemContent);

  return $itemCard;
};

const deleteCartItem = () => {
  let cartItem = document.getElementsByClassName("cart__item");

  for (let i = 0; i < cartItem.length; i++) {
    let itemId = cartItem[i].dataset.id;
    let itemColor = cartItem[i].dataset.color;
    let deleteItemBtn = cartItem[i].querySelector(".deleteItem");

    deleteItemBtn.addEventListener("click", (e) => {
      e.preventDefault();
      if (window.confirm("Cet article va être supprimé de votre panier.")) {
        const cart = JSON.parse(localStorage.getItem("cart"));

        for (let i = 0; i < cart.length; i++) {
          if (cart[i].id === itemId && cart[i].color === itemColor) {
            cartItem[i].remove();
            cart.splice(i, 1);
            localStorage.setItem("cart", JSON.stringify(cart));

            if (cart === []) {
              displayEmptyCartMessage();
            }
          }
        }

        updateTotal();
      }
    });
  }
};

const changeQty = () => {
  let cartItem = document.getElementsByClassName("cart__item");

  for (let i = 0; i < cartItem.length; i++) {
    let itemId = cartItem[i].dataset.id;
    let itemColor = cartItem[i].dataset.color;
    let itemQty = cartItem[i].querySelector(".itemQuantity");

    itemQty.addEventListener("change", (e) => {
      const newQty = e.target.value;
      const cart = JSON.parse(localStorage.getItem("cart"));

      for (let i = 0; i < cart.length; i++) {
        if (cart[i].id === itemId && cart[i].color === itemColor) {
          cart[i].quantity = Number(newQty);
          localStorage.setItem("cart", JSON.stringify(cart));
        }
      }

      updateTotal();
    });
  }
};

const updateTotal = async () => {
  const cart = JSON.parse(localStorage.getItem("cart"));
  let sumQty = Number(0);
  let sumPrice = Number(0);
  for (let i = 0; i < cart.length; i++) {
    const kanapData = await retrieveData(cart[i]);
    sumQty += Number(cart[i].quantity);
    sumPrice += Number(cart[i].quantity * kanapData.price);
  }
  $totalQty.textContent = `${sumQty}`;
  $totalPrice.textContent = `${sumPrice}`;
};

const retrieveData = (item) =>
  fetch(`http://localhost:3000/api/products/${item.id}`)
    .then((res) => res.json())
    .catch((err) => console.log("Oh no", err));

// FORM

const regexForNames =
  /^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/u;

class Form {
  constructor() {
    this.firstName = document.getElementById("firstName").value;
    this.lastName = document.getElementById("lastName").value;
    this.address = document.getElementById("address").value;
    this.city = document.getElementById("city").value;
    this.email = document.getElementById("email").value;
  }
}

const checkInputs = () => {
  const userForm = new Form();

  const checkFirstName = () => {
    const userFirstName = userForm.firstName;
    const firstNameErrorMsg = document.getElementById("firstNameErrorMsg");
    firstNameErrorMsg.replaceChildren();

    if (regexForNames.test(userFirstName)) {
      return true;
    }
    
    firstNameErrorMsg.appendChild(
      document.createTextNode("Veuillez remplir ce champ avec des caractères autorisés.")
    );
  };

  const checkLastName = () => {
    const userLastName = userForm.lastName;
    const lastNameErrorMsg = document.getElementById("lastNameErrorMsg");
    lastNameErrorMsg.replaceChildren();

    if (regexForNames.test(userLastName)) {
      return true;
    }
    lastNameErrorMsg.appendChild(
      document.createTextNode("Veuillez remplir ce champ avec des caractères autorisés.")
    );
  };

  const checkAddress = () => {
    const userAddress = userForm.address;
      const addressErrorMsg = document.getElementById("addressErrorMsg");
      addressErrorMsg.replaceChildren();

    if (/[^§]{5,50}$/.test(userAddress)) {
      return true;
    }
    addressErrorMsg.appendChild(
      document.createTextNode("Votre adresse ne semble pas être au bon format.")
    );
  };

  const checkCity = () => {
    const userCity = userForm.city;
    const cityErrorMsg = document.getElementById("cityErrorMsg");
    cityErrorMsg.replaceChildren();

    if (regexForNames.test(userCity)) {
      return true;
    }
    cityErrorMsg.appendChild(
      document.createTextNode(
        "Veuillez remplir ce champ avec des caractères autorisés."
      )
    );
  };

  return (
    (checkFirstName() && checkLastName() && checkAddress() && checkCity()) ||
    console.error("Input(s) non valide(s).")
  );
};

const orderProducts = (item) => {
  let productsIdList = [];

  for (let i = 0; i < item.length; i++) {
    const productId = item[i].id;
    productsIdList.push(productId);
  }
  
  return productsIdList;
};

const fetchOrderAPI = (item) =>
  fetch("http://localhost:3000/api/products/order", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(item),
  })
    .then((res) => res.json())
    .then((value) => {
      localStorage.clear();
      document.location.href = `./confirmation.html?id=${value.orderId}`;
    })
    .catch((error) => {
      console.error("Error: " + error);
    });

const sendForm = () => {
  const userFormSubmit = document.getElementById("order");
  userFormSubmit.addEventListener("click", (e) => {
    e.preventDefault();
    const cart = JSON.parse(localStorage.getItem("cart"));
    if (cart == "[]") {
      if (checkInputs()) {
        const products = orderProducts(cart);
        const toSend = {
          contact: {
            firstName: firstName.value,
            lastName: lastName.value,
            address: address.value,
            city: city.value,
            email: email.value,
          },
          products,
        };
  
        fetchOrderAPI(toSend);
      }
    } else {
      alert("Il n'y aucun produit dans votre panier.");
    }
  });
};

const main = async () => {
  const cart = JSON.parse(localStorage.getItem("cart"));
  $cartItems.replaceChildren();
  let sumQty = Number(0);
  let sumPrice = Number(0);

  if (cart) {
    for (let i = 0; i < cart.length; i++) {
      if (cart[i]) {
        const kanapData = await retrieveData(cart[i]);
        sumQty += Number(cart[i].quantity);
        sumPrice += Number(cart[i].quantity * kanapData.price);
        $cartItems.appendChild(createItemArticle(kanapData, cart[i]));
      }
    }
  } else {
    displayEmptyCartMessage();
  }

  $totalQty.textContent = `${sumQty}`;
  $totalPrice.textContent = `${sumPrice}`;

  deleteCartItem();
  changeQty();
};

sendForm();
main();

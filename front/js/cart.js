const $cartItems = document.getElementById('cart__items')

const createItemArticle = item => {
    const $itemCard = document.createElement('article')
    $itemCard.classList.add('cart__item')

    $itemCard.setAttribute('data-id', `${item.id}`)
    $itemCard.setAttribute('data-color', `${item.color}`)

    return $itemCard
}

const createItemImg = item => {
    const $itemImgDiv = document.createElement('div')
    $itemImgDiv.classList.add('cart__item__img')

    const $itemImg = document.createElement('img')
    $itemImg.setAttribute('src', `${item.imageUrl}`)
    $itemImg.setAttribute('alt', `${item.altTxt}`)

    $itemImgDiv.appendChild($itemImg)

    return $itemImgDiv
}

const createItemContent = item => {
    const $itemContent = document.createElement('div')
    $itemContent.classList.add('cart__item__content')


    const $itemContentDescription = document.createElement('div')
    $itemContentDescription.classList.add('cart__item__content__description')

    const $itemProductName = document.createElement('h2')
    $itemProductName.textContent = `${item.name}`
    $itemContentDescription.appendChild($itemProductName)

    const $itemColor = document.createElement('p')
    $itemColor.textContent = `${item.color}`
    $itemContentDescription.appendChild($itemColor)

    const $itemPrice = document.createElement('p')
    $itemPrice.textContent = `${item.price}`
    $itemContentDescription.appendChild($itemPrice)


    const $itemContentSettings = document.createElement('div')
    $itemContentSettings.classList.add('cart__item__content__settings')

    
    const $itemContentQty = document.createElement('div')
    $itemContentQty.classList.add('cart__item__content__settings__quantity')

    const $itemQtyDesc = document.createElement('p')
    $itemQtyDesc.textContent = `Qté : `
    $itemContentQty.appendChild($itemQtyDesc)

    const $itemQty = document.createElement('input')
    $itemImg.setAttribute('type', `number`)
    $itemImg.setAttribute('name', `itemQuantity`)
    $itemImg.setAttribute('min', `1`)
    $itemImg.setAttribute('max', `100`)
    $itemContentQty.classList.add('itemQuantity')
    $itemImg.setAttribute('value', `${item.quantity}`)
    $itemContentQty.appendChild($itemQty)


    const $itemSettingsDelete = document.createElement('div')
    $itemSettingsDelete.classList.add('cart__item__content__settings__delete')

    
    const $itemDelete = document.createElement('p')
    $itemDelete.classList.add('deleteItem')
    $itemDelete.textContent = `Supprimer`

    $itemSettingsDelete.appendChild($itemDelete)

    $itemContentSettings.appendChild($itemContentQty)
    $itemContentSettings.appendChild($itemSettingsDelete)

    $itemContent.appendChild($itemContentDescription)
    $itemContent.appendChild($itemContentSettings)

    return $itemContent
}

const main = () => {
    const $cart = JSON.parse(localStorage.getItem('cart'));

    for (let i = 0; i < $cart.length; i++) {
        if ($cart[i]) {
            $cartItems.appendChild(createItemContent($cart[i]))
        }
    }
}

main()
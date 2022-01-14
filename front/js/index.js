const $kanapItems = document.querySelector('.items')

// Img


const createItemCardImg = Item => {
    const $ItemImg = document.createElement('img')

    $ItemImg.classList.add('Item-img')

    $ItemImg.setAttribute('src', `${Item.imageUrl}`)
    $ItemImg.setAttribute('alt', `${Item.altTxt}`)

    return $ItemImg
}

// Info


const createItemCardInfo = item => {
    const $itemInfo = document.createElement('article')
    $itemInfo.classList.add('item-info')

    const $itemImg = document.createElement('img')
    $itemImg.classList.add('item-img')
    $itemImg.setAttribute('src', `${item.imageUrl}`)
    $itemImg.setAttribute('alt', `${item.altTxt}`)
    
    const $itemInfoTitle = document.createElement('h3')
    $itemInfoTitle.classList.add('productName')
    $itemInfoTitle.textContent = `${item.name}`

    const $itemInfoDesc = document.createElement('p')
    $itemInfoDesc.classList.add('productDescription')
    $itemInfoDesc.textContent = `${item.description}`

    $itemInfo.appendChild($itemInfoTitle)
    $itemInfo.appendChild($itemInfoDesc)

    return $itemInfo
}



// Card

const createItemCard = item => {
    const $itemCard = document.createElement('article')
    $itemCard.classList.add('item-card')

    const $itemImg = createItemCardImg(item)
    const $itemInfo = createItemCardInfo(item)


    $itemCard.appendChild($itemImg)
    $itemCard.appendChild($itemInfo)
    

    return $itemCard
}

// Card Link

const createItemCardLink = item => {
    const $itemCardLink = document.createElement("a")
    $itemCardLink.setAttribute('href', `./product.html?Id=${item._id}`)

    const $itemFinalCard = createItemCard(item);
    
    $itemCardLink.appendChild($itemFinalCard)

    return $itemCardLink

}

const createItem = item => {
    const $template = document.getElementById('items');
    let $item = $template.cloneNode(true);
    $item.removeAttribute('hidden');
    $item.querySelector('.productName').textContent = item.name;
    return $item
}


// récupérer les données de l'API

const retrieveData = () => fetch(`http://localhost:3000/api/products`)
    .then(res => res.json())
    .catch(err => console.log("Oh no", err))


// Finalisation

const main = async () => {
    const kanapData = await retrieveData()

    for (let i = 0; i < kanapData.length; i++) {
        if (kanapData[i]) {
            $kanapItems.appendChild(createItemCardLink(kanapData[i]))
        }
    }
}

main()
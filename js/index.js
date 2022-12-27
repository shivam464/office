// const hamburger = document.querySelector('.hamburger');
// const navLink = document.querySelector('.nav__link');

// hamburger.addEventListener('click', () => {
//   navLink.classList.toggle('hide');
// });



const getResponse = async () => {

  const resp = await fetch(
    `https://pim.wforwoman.com/pim/pimresponse.php/?service=category&store=1&url_key=top-wear-kurtas&page=1&count=100&sort_by=&sort_dir=desc&filter=`
  ).then((res) => res.json());
  const response = resp.result;
  // console.log("api_response", api_response);
  show(response);
  api_response = response
  displaycards(response)
  console.log("response", response);
}

function abc(data) {
  return `
    <div class="content">
       <label class="container">${filter.filter_lable}
        input type="checkbox" checked="checked">
        <span class="checkmark"></span>
       </label>
     </div>
`
}

function show(data) {
  let filters = "";
  data.filters.forEach(filter => {
    // console.log("filter", filter);


    let filtersegment = `<div class="collapsible-wrapper">
      <p>${filter.filter_lable}</p>
    </div>
    `
    // const card = document.createElement('div');
    // card.classList.add('content');

    // filter.options.forEach(Option => {
    //   card.innerHTML = `
    //      <label class="container">${Option.value}
    //        <input type="checkbox" checked="checked">
    //        <span class="checkmark"></span>
    //      </label>`
    //      data+=card
    // })



    //   let filtersegment = `<div class="content">
    //     <label class="container">${filter.filter_lable}
    //     <input type="checkbox" checked="checked">
    //     <span class="checkmark"></span>
    //   </label>
    // </div>`;
    filters += filtersegment;
  })
  let filtercontainer = document.querySelector(".left-container")
  // console.log('filtercontainer', filtercontainer);
  filtercontainer.innerHTML = filters;



}

function displaycards(data) {
  let html = '';
  data.products.slice(10, 20).forEach(product => {
    let htmlSegment = `<div class="card">
                        <img src="${product.image}" >  
                        <div class="product-details">
                        <p class="product-name">${product.name}</p>
                        <p class="product-price">Rs.${product.price}</p>
                        <div class="heart-icon"><i class="fa-regular fa-heart"></i></div>
                        </div>
                    </div>`;

    html += htmlSegment;
  });
  console.log("html", html);
  let cardcontainer = document.querySelector(".cards")
  cardcontainer.innerHTML = html;
}

getResponse();
var api_response;

var coll = document.getElementsByClassName("collapsible-wrapper");
var i;

for (i = 0; i < coll.length; i++) {
  coll[i].addEventListener("click", function () {
    console.log("hyy", coll)
    this.classList.toggle("active");
    var content = this.nextElementSibling;
    if (content.style.maxHeight) {
      content.style.maxHeight = null;
    } else {
      content.style.maxHeight = content.scrollHeight + "px";
    }
  });
}


// ------------------Infinite scrolling--------------

const cardContainer = document.getElementById("card-container");
// const cardCountElem = document.getElementById("card-count");
// const cardTotalElem = document.getElementById("card-total");
const loader = document.getElementById("loader");
setTimeout(() => {
  const cardLimit = api_response.products.length;
  const cardIncrease = 10;
  const pageCount = Math.ceil(cardLimit / cardIncrease);
  let currentPage = 1;

  // cardTotalElem.innerHTML = cardLimit;

  var throttleTimer;
  const throttle = (callback, time) => {
    if (throttleTimer) return;

    throttleTimer = true;

    setTimeout(() => {
      callback();
      throttleTimer = false;
    }, time);
  };


  const addCards = (pageIndex) => {
    currentPage = pageIndex;

    const startRange = (pageIndex - 1) * cardIncrease;
    const endRange =
      currentPage == pageCount ? cardLimit : pageIndex * cardIncrease;



    let cards = '';
    let z;
    for (let i = startRange + 1; i <= endRange; i++) {
      z = document.createElement('div');
      // z.classList.add('card')

      const data = api_response.products[i]
      let card = `  
                            <img src="${data.image}">  
                            <div class="product-details">
                            <p class="product-name">${data.name}</p>
                            <p class="product-price">Rs.${data.price}</p>
                            <div class="heart-icon"><i class="fa-regular fa-heart"></i></div>
                            </div>
                            
                  `;
      // cards += card;
      z.innerHTML += card
    }
    let cardcontainer = document.querySelector("#data-card")
    cardcontainer.appendChild(z)
    console.log("z", z);

    // cardcontainer.append(cards)
    console.log("abc", cardcontainer.childNodes)

    // let lastChild = cardcontainer.lastChild;

    // if (lastChild && lastChild.nodeType === Node.TEXT_NODE) //test if there is at least a node and the last is a text node
    //   lastChild.appendData(cards);

  };

  const handleInfiniteScroll = () => {
    throttle(() => {
      const endOfPage =
        window.innerHeight + window.pageYOffset >= document.body.offsetHeight;

      if (endOfPage) {
        addCards(currentPage + 1);
      }

      if (currentPage === pageCount) {
        removeInfiniteScroll();
      }
    }, 1000);
  };

  const removeInfiniteScroll = () => {
    loader.remove();
    window.removeEventListener("scroll", handleInfiniteScroll);
  };

  window.onload = function () {
    addCards(currentPage);
  };

  window.addEventListener("scroll", handleInfiniteScroll);
}, 1000);
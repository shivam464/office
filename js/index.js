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
  console.log("response", response);
  show(response);
}

function show(data) {

  let html = '';
  data.products.forEach(product => {
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

  let cardcontainer = document.querySelector(".cards")
  cardcontainer.innerHTML = html;
}



getResponse();


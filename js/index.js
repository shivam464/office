// const hamburger = document.querySelector('.hamburger');
// const navLink = document.querySelector('.nav__link');

// hamburger.addEventListener('click', () => {
//   navLink.classList.toggle('hide');
// });



const getResponse = async () => {

  const resp = await fetch(
    `https://pim.wforwoman.com/pim/pimresponse.php/?service=category&store=1&url_key=top-wear-kurtas&page=1&count=20&sort_by=&sort_dir=desc&filter=`
  ).then((res) => res.json());
  const response = resp.result;
  console.log("response", response);
  show(response);
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
  console.log('filtercontainer', filtercontainer);
  filtercontainer.innerHTML = filters;


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
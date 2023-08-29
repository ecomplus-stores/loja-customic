// Add your custom JavaScript for storefront pages here.
document.getElementById('c-5fad9d7580c6216a3fc547dc').href = '/impactor-flex-antibacteria-all';
document.getElementById('cd-5fad9d7580c6216a3fc547dc').href = '/impactor-flex-antibacteria-all';
document.getElementById('c-5f1f3f5bf023684cdbd4a1f4').href = '/impactor-ultra-all';
document.getElementById('cd-5f1f3f5bf023684cdbd4a1f4').href = '/impactor-ultra-all';
document.getElementById('c-5f1f3f6cf023684cdbd4a218').href = '/impactor-ultra-fabric-all';
document.getElementById('cd-5f1f3f6cf023684cdbd4a218').href = '/impactor-ultra-fabric-all';
document.getElementById('c-5f1f3f5af023684cdbd4a1f2').href = '/impactor-flex-all';
document.getElementById('cd-5f1f3f5af023684cdbd4a1f2').href = '/impactor-flex-all';
document.getElementById('c-5f1f3f5df023684cdbd4a1f8').href = '/soft-all';
document.getElementById('cd-5f1f3f5df023684cdbd4a1f8').href = '/soft-all';
document.getElementById('c-5f4d54c67430f92180ea8c8b').href = '/soft-touch-all';
document.getElementById('cd-5f4d54c67430f92180ea8c8b').href = '/soft-touch-all';
document.getElementById('c-5f1f3f54f023684cdbd4a1e4').href = '/seed-eco-case-all';
document.getElementById('cd-5f1f3f54f023684cdbd4a1e4').href = '/seed-eco-case-all';
document.getElementById('c-5f1f3f57f023684cdbd4a1eb').href = '/hardbox-all';
document.getElementById('cd-5f1f3f57f023684cdbd4a1eb').href = '/hardbox-all';
document.getElementById('c-5f1f3f3bf023684cdbd4a1af').href = '/impactor-clear-all';
document.getElementById('cd-5f1f3f3bf023684cdbd4a1af').href = '/impactor-clear-all';
document.getElementById('c-5fb80f6669274c73fcd951f5').href = '/seed-eco-case-antibacteria';
document.getElementById('cd-5fb80f6669274c73fcd951f5').href = '/seed-eco-case-antibacteria';
document.querySelector('#c-5f1f3f3cf023684cdbd4a1b1 span').innerText = 'Capas'
document.querySelector('#c-5f1f3f37f023684cdbd4a1a6 span').innerText = 'Películas'

function setTitleCategoryProductCard() {
  let categoryTitle = $(".breadcrumb-item:nth-of-type(3)").text().trim();
  
  $(".search-engine__retail .row > div").map(function () {
    $(this).find(".product-card__name").append(` / ${categoryTitle}`);
  })
}


$(document).ready(function () {
  setTitleCategoryProductCard(); 
})
storefront.on('widget:@ecomplus/widget-minicart', function () {
    setTimeout(function () {
      if (storefront && storefront.context && storefront.context.body && storefront.context.body.name.indexOf('PRÉ-VENDA') > -1) {
        document.querySelector('.product__prices').insertAdjacentHTML('afterend', '<div id="lancamento" style="color: #624175"> **Envio em Outubro 2022! 🚚** </div>')
      }
    }, 2400);
  });

  $(window).one('scroll', () => {
    if (!localStorage.getItem('cookieconsent')) {
      document.getElementById('cookieconsent').classList.remove("d-none");
    }
  })

  if (window.location.pathname === '/search') {
    const searchParam = new URLSearchParams(window.location.search)
    const model = searchParam.get('term')
    if (model && model.length > 1) {
      let searchText
      const getModel = (model) => {
        switch (model.toLowerCase()) {
          case 'iphone 13 pro max':
              return 'iPhone 13 Pro Max';
          case 'iphone 12 pro max':
              return 'iPhone 12 Pro Max';
          case 'iphone 13 pro':
              return 'iPhone 13 Pro';
          case 'iphone 12/12 pro':
              return 'iPhone 12/12 Pro';
          case 'iphone 11':
              return 'iPhone 11';
          case 'iphone 13':
              return 'iPhone 13';
          case 'iphone 12 mini':
              return 'iPhone 12 Mini';
          case 'iphone 13 mini':
              return 'iPhone 13 Mini';
          case 'iphone 11 pro max':
              return 'iPhone 11 Pro Max';
          case 'iphone x/xs':
              return 'iPhone X/XS';
          case 'iphone 11 pro':
              return 'iPhone 11 Pro';
          case 'iphone 7 plus':
              return 'iPhone 7 Plus';
          case 'iphone xs max':
              return 'iPhone XS Max';
          case 'iphone 14 pro':
              return 'iPhone 14 Pro';
          case 'iphone xr':
              return 'iPhone XR';
          case 'iphone 14':
              return 'iPhone 14';
          case 'iphone 14 pro max':
              return 'iPhone 14 Pro Max';
          case 'galaxy s21 plus':
              return 'Galaxy S21 Plus';
          case 'galaxy s21 ultra':
              return 'Galaxy S21 Ultra';
          case 'iphone 14 plus':
              return 'iPhone 14 Plus';
          case 'galaxy s20 plus':
              return 'Galaxy S20 Plus';
          case 'galaxy s21':
              return 'Galaxy S21';
          case 'iphone 7':
              return 'iPhone 7';
          case 'galaxy s20 ultra':
              return 'Galaxy S20 Ultra';
          case 'iphone 6/6s':
              return 'iPhone 6/6s';
          case 'iphone 6/6s plus':
              return 'iPhone 6/6s Plus';
          case 'iphone 6/7/8 plus':
              return 'iPhone 6/7/8 Plus';
          case 'galaxy s8':
              return 'Galaxy S8';
          case 'galaxy s8 plus':
              return 'Galaxy S8 Plus';
          case 'iphone se 2020':
              return 'iPhone SE 2020';
          case 'galaxy a72':
              return 'Galaxy A72';
          case 'galaxy s10 plus':
              return 'Galaxy S10 Plus';
          case 'galaxy s22':
              return 'Galaxy S22';
          case 'galaxy s22 plus':
              return 'Galaxy S22 Plus';
          case 'galaxy s10e':
              return 'Galaxy S10e';
          case 'iphone 6/7/8':
              return 'iPhone 6/7/8';
          case 'galaxy a02s':
              return 'Galaxy A02s';
          case 'galaxy a03s':
              return 'Galaxy A03s';
          case 'galaxy a11':
              return 'Galaxy A11';
          case 'galaxy a12':
              return 'Galaxy A12';
          case 'galaxy a21s':
              return 'Galaxy A21s';
          case 'galaxy a22 4g':
              return 'Galaxy A22 4G';
          case 'galaxy a31':
              return 'Galaxy A31';
          case 'galaxy a32 4g':
              return 'Galaxy A32 4G';
          case 'galaxy a32 5g':
              return 'Galaxy A32 5G';
          case 'galaxy a51':
              return 'Galaxy A51';
          case 'galaxy a71':
              return 'Galaxy A71';
          case 'galaxy note 20':
              return 'Galaxy Note 20';
          case 'galaxy s10':
              return 'Galaxy S10';
          case 'galaxy s20':
              return 'Galaxy S20';
          case 'galaxy s22 ultra':
              return 'Galaxy S22 Ultra';
          case 'k41s':
              return 'K41s';
          case 'k51s':
              return 'K51s';
          case 'k52':
              return 'K52';
          case 'k61':
              return 'K61';
          case 'k62':
              return 'K62';
          case 'k62 plus':
              return 'K62 Plus';
          case 'moto edge 20':
              return 'Moto Edge 20';
          case 'moto edge 20 lite':
              return 'Moto Edge 20 Lite';
          case 'moto edge 20 pro':
              return 'Moto Edge 20 Pro';
          default:
              return 'isNotModel';
        }
      }
      searchText = getModel(model)
      if (searchText !== 'isNotModel') {
        EcomSearch.dslMiddlewares.push((dsl) => {
          dsl.query.bool.filter = [
            {
              term: {
                visible: true
              }
            },
            {
              "nested": {
                "path": "specs",
                "query": {
                  "bool": {
                    "filter": [
                      {
                        "term": {
                          "specs.grid": "modelo"
                        }
                      },
                      {
                        "terms": {
                          "specs.text": [
                            searchText
                          ]
                        }
                      }
                    ]
                  }
                }
              }
            }
          ]
        })
      }
    }
  }
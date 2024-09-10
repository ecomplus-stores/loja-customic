// Add your custom JavaScript for storefront pages here.
import EcomSearch from '@ecomplus/search-engine'
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

function setTitleCategoryProductCard() {
  let categoryTitle = $(".breadcrumb-item:nth-of-type(3)").text().trim();
  console.log(categoryTitle)
  if (categoryTitle) {
    $(".search-engine__retail .row > div").map(function () {
      $(this).find(".product-card__name").prepend(`
      <span class="spec-search" style="display: flex; justify-content: center;">
        ${categoryTitle}
      </span>
      `);
    })
  }
}


$(document).ready(function () {
  setTitleCategoryProductCard(); 
})
storefront.on('widget:@ecomplus/widget-minicart', function () {
    setTimeout(function () {
      if (storefront && storefront.context && storefront.context.body && storefront.context.body.name.indexOf('PRÉ-VENDA') > -1) {
        document.querySelector('.product__prices').insertAdjacentHTML('afterend', '<div id="lancamento" style="color: #624175"> **Envio em Outubro 2023! 🚚** </div>')
      }
    }, 2400);
  });

  $(window).one('scroll', () => {
    if (!localStorage.getItem('cookieconsent')) {
      document.getElementById('cookieconsent').classList.remove("d-none");
    }
  })


  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

const words = ["sua Capa", "sua Película", "seu Popsockets", "seus Acessórios", "seu Combo"];
let i = 0;
let timer;

function typingEffect() {
    console.log('Typing effect started');
    let word = words[i].split("");
    let elem = document.querySelector('.header__row #search-input');


    var loopTyping = function() {
        if (word.length > 0) {
            elem.setAttribute('placeholder', elem.getAttribute('placeholder') + word.shift());
        } else {
            // Move to deleting effect after typing is complete
            setTimeout(deletingEffect, 1000); // Adjust delay as needed
            return false;
        }
        timer = setTimeout(loopTyping, 200);
    };
    loopTyping();
}

function deletingEffect() {
    console.log('Deleting effect started');
    let elem = document.querySelector('.header__row #search-input');
    let fullText = elem.getAttribute('placeholder');
    let baseText = "Encontre "; // Base text that doesn't change
    let word = words[i].split("");
    
    var loopDeleting = function() {
        if (word.length > 0) {
            word.pop();
            elem.setAttribute('placeholder', baseText + word.join(""));
        } else {
            // Switch to the next word
            if (words.length > (i + 1)) {
                i++;
            } else {
                i = 0;
            }
            typingEffect();
            return false;
        }
        timer = setTimeout(loopDeleting, 100);
    };
    loopDeleting();
}

// Start the effect with the initial placeholder set to "Encontre sua Capa"
typingEffect();

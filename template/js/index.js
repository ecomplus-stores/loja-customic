import '#template/js/'
import './custom-js/pages'
import lozad from 'lozad'

async function loadAsync () {
    // Hubspot form
  if (typeof window.setupRd === 'function') {
    const observer = lozad(document.getElementById('b2c-newsletter-site-28eb1cb7f1fd2326ac39'), {
      rootMargin: '350px 0px',
      threshold: 0,
      load () {
        const script = document.createElement('script')
        script.src = 'https://d335luupugsy2.cloudfront.net/js/rdstation-forms/stable/rdstation-forms.min.js'
        script.id = 'hs-script-loader'
        script.async = true
        script.onload = window.setupRd
        document.getElementById('b2c-newsletter-site-28eb1cb7f1fd2326ac39').appendChild(script)
      }
    })
    observer.observe()
  }

    //popup
   lozad(document.getElementById('popup-rd'), {
    rootMargin: '350px 0px',
    threshold: 0,
    load () {
      const script = document.createElement('script')
      script.src = 'https://d335luupugsy2.cloudfront.net/js/loader-scripts/c09c327f-2daf-4048-b58e-6f791d990f97-loader.js'
      script.id = 'rd-popup'
      script.async = true
      document.getElementById('popup-rd').appendChild(script)
    }
  }).observe()

}
loadAsync()

if (window.navigator.userAgent && !/Chrome-Lighthouse/i.test(window.navigator.userAgent)) {
  const loadChat = () => {
    const script = document.createElement('script')
    script.src = 'https://www5.directtalk.com.br/clientes/custom/Customic/widget.min.js'
    script.id = 'dt-widget'
    script.async = true
    document.body.appendChild(script)

    window.storefront.once('widget:@ecomplus/widget-minicart', () => {
      document.querySelectorAll('.backdrop').forEach(($backdrop) => {
        const observer = new window.MutationObserver(function (mutationList, observer) {
          mutationList.forEach(function (mutation) {
            if (mutation.type === 'attributes' && mutation.attributeName === 'style') {
              const $chat = document.getElementById('bot')
              if ($chat) {
                $chat.style.setProperty('display',
                  $backdrop.style.zIndex > 1 ? 'none' : '', 'important')
              }
            }
          })
        })
        observer.observe($backdrop, {
          attributes: true
        })
      })
    })
  }

  $(window).one('scroll', () => {
    loadChat()
  })
}

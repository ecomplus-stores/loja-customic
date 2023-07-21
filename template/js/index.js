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
      script.src = 'https://d335luupugsy2.cloudfront.net/js/loader-scripts/f31e0d37-3ae8-4b64-b234-2c6283bfd88d-loader.js'
      script.id = 'rd-popup'
      script.async = true
      document.getElementById('popup-rd').appendChild(script)
    }
  }).observe()

  // direct
  lozad(document.getElementById('chat-direct'), {
    rootMargin: '350px 0px',
    threshold: 0,
    load () {
      const script = document.createElement('script')
      script.src = 'https://www5.directtalk.com.br/clientes/custom/Customic/widget.min.js'
      script.id = 'dt-widget'
      script.async = true
      document.getElementById('chat-direct').appendChild(script)
    }
  }).observe()
}
loadAsync()
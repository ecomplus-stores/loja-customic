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
}
loadAsync()
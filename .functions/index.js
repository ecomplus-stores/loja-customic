const { onRequest } = require('firebase-functions/v2/https')

process.env.STOREFRONT_LONG_CACHE = 'false'
process.env.STOREFRONT_ASSETS = 'https://s1-customic.b-cdn.net'

const { ssr: renderSsr } = require('@ecomplus/storefront-renderer/functions/')

// Security: the renderer `/~reverse-proxy/` route forwards visitor headers to any URL,
// which exposes the GCP metadata server (service account token). Keep it disabled.
const ssr = (req, res) => {
  if (/reverse-proxy/i.test(`${req.url}${req.originalUrl || ''}`)) {
    return res.sendStatus(404)
  }
  return renderSsr(req, res)
}

exports.ssr2 = onRequest({
  concurrency: 80,
  minInstances: 0,
  memory: '1GiB',
}, async (req, res) => {
  if (req.hostname === 'customic.com.br') {
    res.redirect(302, `https://www.customic.com.br${req.originalUrl}`)
    return null
  }
  if (req.path.startsWith('/~partytown')) {
    res.sendStatus(404)
    return null
  }
  res.set('x-load-took', '1')
  res.set('Link', `<${process.env.STOREFRONT_ASSETS}/>; rel=preconnect`)
  return ssr(req, res)
})

exports.reverseproxy = onRequest({
  concurrency: 80,
  minInstances: 0,
  memory: '1GiB',
}, ssr)

const { onRequest } = require('firebase-functions/v2/https')

process.env.STOREFRONT_LONG_CACHE = 'false'
process.env.STOREFRONT_ASSETS = 'https://s1-customic.b-cdn.net'

const { ssr } = require('@ecomplus/storefront-renderer/functions/')

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

const PROXY_CONFIG = {
  '/realms/*': {
    target: 'http://172.20.50.60:7785',
    secure: false,
    logLevel: 'debug',
    cookieDomainRewrite: 'localhost',
    changeOrigin: true,
    onProxyReq: (proxyReq, req, res) => {
      console.log('🚀 Proxying:', req.method, req.url);
      console.log('🍪 Request headers:', req.headers);
    },
    onProxyRes: (proxyRes, req, res) => {
      console.log('✅ Response status:', proxyRes.statusCode);
      console.log('🍪 Set-Cookie:', proxyRes.headers['set-cookie']);
      console.log('🌐 Response headers:', proxyRes.headers);
    },
  },
};

module.exports = PROXY_CONFIG;

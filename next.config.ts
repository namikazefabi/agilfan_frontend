// next.config.js
module.exports = {
  // Outras configurações...
  async redirects() {
    return [
      {
        source: '/login',
        destination: '/pagamentos',
        permanent: true,
      },
    ];
  },
};

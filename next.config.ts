// next.config.js
module.exports = {
  // Outras configurações...
  async redirects() {
    return [
      {
        source: '/pagamentos',
        destination: '/pagamentos',
        permanent: true,
      },
    ];
  },
};

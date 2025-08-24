import adapter from '@sveltejs/adapter-static';

const config = {
  kit: {
    adapter: adapter({
      fallback: 'index.html' // so SPA routing works
    })
  }
};

export default config;

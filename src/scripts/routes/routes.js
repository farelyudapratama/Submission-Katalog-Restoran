const createPage = async (importFn) => {
  const module = await importFn();
  const Component = module.default;
  
  if (typeof Component === 'function') {
    return new Component();
  }
  
  return Component;
};

const routes = {
  '/': {
    async render() {
      const page = await createPage(() => import('../views/pages/home'));
      return page.render();
    },
    async afterRender() {
      const page = await createPage(() => import('../views/pages/home'));
      return page.afterRender();
    }
  },
  '/now-playing': {
    async render() {
      const page = await createPage(() => import('../views/pages/home'));
      return page.render();
    },
    async afterRender() {
      const page = await createPage(() => import('../views/pages/home'));
      return page.afterRender();
    }
  },
  '/favorite': {
    async render() {
      const page = await createPage(() => import('../views/pages/favorite'));
      return page.render();
    },
    async afterRender() {
      const page = await createPage(() => import('../views/pages/favorite'));
      return page.afterRender();
    }
  },
  '/detail/:id': {
    async render() {
      const page = await createPage(() => import('../views/pages/detail'));
      return page.render();
    },
    async afterRender() {
      const page = await createPage(() => import('../views/pages/detail'));
      return page.afterRender();
    }
  }
};

export default routes;
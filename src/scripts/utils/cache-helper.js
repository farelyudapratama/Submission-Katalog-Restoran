import CONFIG from '../globals/config';

const CacheHelper = {
  async cachingAppShell(requests) {
    const cache = await this._openCache();
    try {
      await cache.addAll(requests);
    } catch (error) {
      console.error('Failed to cache app shell:', error);
    }
  },

  async deleteOldCache() {
    const cacheNames = await caches.keys();
    await Promise.all(
      cacheNames
        .filter((name) => name !== CONFIG.CACHE_NAME)
        .map((filteredName) => caches.delete(filteredName))
    );
  },

  async revalidateCache(request) {
    const response = await caches.match(request);

    if (response) {
      this._fetchRequest(request);
      return response;
    }
    return this._fetchRequest(request);
  },

  async _openCache() {
    return caches.open(CONFIG.CACHE_NAME);
  },

  async _fetchRequest(request) {
    try {
      console.log(`Fetching request: ${request.url}`);
      const response = await fetch(request);

      if (!response || response.status !== 200) {
        return response;
      }

      await this._addCache(request, response.clone());
      return response;
    } catch (error) {
      console.error('Failed to fetch request:', error);
      return new Response('Network error occurred', {
        status: 408,
        statusText: 'Network error occurred',
      });
    }
  },

  async _addCache(request, response) {
    const cache = await this._openCache();
    try {
      const url = new URL(request.url);
      if (url.protocol === 'http:' || url.protocol === 'https:') {
        await cache.put(request, response);
      } else {
        console.warn(
          `Request with unsupported scheme (${url.protocol}) will not be cached.`
        );
      }
    } catch (error) {
      console.error('Failed to add request to cache:', error);
    }
  },
};

export default CacheHelper;

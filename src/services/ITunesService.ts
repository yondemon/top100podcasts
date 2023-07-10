import http from "../http-common";

interface cachedData {
  expires: null | number;
  data: []
};

export default class ITunesService {
  cacheTime = 24 * 60 * 60 * 1000;
  top100: cachedData = {
    expires: null,
    data: [],
  };
  podcasts: Record<string,cachedData> = {};

  async getTop100(): Promise<Array<Record<string,any>>> {
    const localStorageTop100CacheKey = 'top100';

    this.top100 = JSON.parse(localStorage.getItem(localStorageTop100CacheKey) || "{}");

    if(!this.top100.expires || this.top100.expires < Date.now() ){
      const result = await http.get('https://itunes.apple.com/us/rss/toppodcasts/limit=100/genre=1310/json');
      this.top100 = {
        data: result.data.feed.entry,
        expires: Date.now() + this.cacheTime
      };

      localStorage.setItem(localStorageTop100CacheKey, JSON.stringify(this.top100));
    }

    return this.top100.data;
  }

  async getPodcastInfo(podcastId: string) {
    const localStoragePodcastsCacheKey = 'top100-podcasts';
    this.podcasts = JSON.parse(localStorage.getItem(localStoragePodcastsCacheKey) || "{}");

    if(!this.podcasts[podcastId] || !this.podcasts[podcastId].expires || this.podcasts[podcastId].expires! < Date.now() ){

      const url = `https://itunes.apple.com/lookup?id=${podcastId}&media=podcast&entity=podcastEpisode&limit=100`
      const result = await http.get(
        `https://api.allorigins.win/get?url=${encodeURIComponent(url)}`
      );

      if(result.status === 200){
        const resultAPI = JSON.parse(result.data.contents);

        this.podcasts[podcastId] = {
          data: resultAPI,
          expires: Date.now() + this.cacheTime
        }
        localStorage.setItem(localStoragePodcastsCacheKey, JSON.stringify(this.podcasts));

        return resultAPI;
      }
    }

    return this.podcasts[podcastId].data;
  }
}

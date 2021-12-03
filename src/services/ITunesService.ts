import http from "../http-common";

class ITunesService {
  getTop100() {
    return http.get('https://itunes.apple.com/us/rss/toppodcasts/limit=100/genre=1310/json');
  }

  async getPodcastInfo(podcastId: string) {
    const url = `https://itunes.apple.com/lookup?id=${podcastId}&media=podcast&entity=podcastEpisode&limit=100`
    const result = await http.get(
      `https://api.allorigins.win/get?url=${encodeURIComponent(url)}`
    );

    if(result.status === 200){
      const resultAPI = JSON.parse(result.data.contents);
      return resultAPI;
    }

    return result;
  }
}

export default new ITunesService();
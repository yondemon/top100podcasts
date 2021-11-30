import http from "../http-common";

class ITunesService {
  getTop100() {
    return http.get('/us/rss/toppodcasts/limit=100/genre=1310/json');
  }

  getPodcastInfo() {
    return http.get('/lookup?id={podcastId}&media=podcast&entity=podcastEpisode&limit=100');
  }
}

export default new ITunesService();
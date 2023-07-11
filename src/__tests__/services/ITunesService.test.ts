import httpCommon from "../../http-common";
import ITunesService from "../../services/ITunesService";


describe('PodcastView', () => {
  let httpCommonGet: any;
  
  beforeEach(() => {
    global.localStorage.clear();

    httpCommonGet = jest.fn();
    httpCommonGet = jest.spyOn(httpCommon,'get')
      .mockReturnValue(Promise.resolve({
        status: 200,
        data: {
          contents: "{}"
        }
      }));
  });

  afterAll(() => {
    httpCommonGet.mockRestore()
  });

  it('top100 calls', () => {
    const service = new ITunesService();

    service.getTop100();

    expect(httpCommonGet).toHaveBeenCalled();
  });

  it('getPodcastInfo calls', () => {
    const service = new ITunesService();

    service.getPodcastInfo('001');

    expect(httpCommonGet).toHaveBeenCalled();
  });

  it('getPodcastInfo calls once (cache)', async () => {
    const service = new ITunesService();

    await service.getPodcastInfo('001');
    await service.getPodcastInfo('001');

    expect(httpCommonGet).toHaveBeenCalledTimes(1);
  });
});

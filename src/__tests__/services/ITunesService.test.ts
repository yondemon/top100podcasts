import httpCommon from "../../http-common";
import ITunesService from "../../services/ITunesService";


describe('ITunesService', () => {
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
    httpCommonGet = jest.spyOn(httpCommon,'get')
    .mockReturnValue(Promise.resolve({
      status: 200,
      data: {
        feed: { entry: []}
      }
    }));

    const service = new ITunesService();

    try {
      service.getTop100();
    } catch(err: any) {

    }

    expect(httpCommonGet).toHaveBeenCalled();
  });

  it('getPodcastInfo calls', () => {
    httpCommonGet = jest.spyOn(httpCommon,'get')
    .mockReturnValue(Promise.resolve({
      status: 200,
      data: {
        contents: "{}"
      }
    }));

    const service = new ITunesService();

    try {
      service.getPodcastInfo('001');
    } catch(err: any) {

    }

    expect(httpCommonGet).toHaveBeenCalled();
  });

  it('getPodcastInfo calls once (cache)', async () => {
    httpCommonGet = jest.spyOn(httpCommon,'get')
    .mockReturnValue(Promise.resolve({
      status: 200,
      data: {
        contents: "{}"
      }
    }));

    const service = new ITunesService();

    try {
      await service.getPodcastInfo('001');
      await service.getPodcastInfo('001');
    } catch(err: any) {

    }

    expect(httpCommonGet).toHaveBeenCalledTimes(1);
  });
});

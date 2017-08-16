import { PlexAppPage } from './app.po';

describe('plex-app App', () => {
  let page: PlexAppPage;

  beforeEach(() => {
    page = new PlexAppPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});

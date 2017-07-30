import { GirePage } from './app.po';

describe('gire App', () => {
  let page: GirePage;

  beforeEach(() => {
    page = new GirePage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});

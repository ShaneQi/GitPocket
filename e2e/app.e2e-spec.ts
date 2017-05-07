import { GitPocketPage } from './app.po';

describe('git-pocket App', () => {
  let page: GitPocketPage;

  beforeEach(() => {
    page = new GitPocketPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});

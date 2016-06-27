import { BoncarPage } from './app.po';

describe('boncar App', function() {
  let page: BoncarPage;

  beforeEach(() => {
    page = new BoncarPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});

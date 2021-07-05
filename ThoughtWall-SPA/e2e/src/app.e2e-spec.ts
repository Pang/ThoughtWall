import { AppPage } from './app.po';
import { browser, by, element, logging } from 'protractor';

describe('Check threads match their summaries', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  
  it('should match summary & thread page titles', async () => {
    browser.get('http://localhost:4200/')
    
    var summaryTitleEl = element.all(by.className('summaryTitle')).first();
    var summaryTitle: string;
    await summaryTitleEl.getText().then((text) => summaryTitle = text);

    element.all(by.className('threadSummary')).first().click(); 
    browser.waitForAngularEnabled(false);

    var threadTitle = element(by.className('threadTitle'));
    expect(threadTitle.getText()).toMatch(summaryTitle);
  })

  afterEach(async () => {
    // Assert that there are no errors emitted from the browser
    const logs = await browser.manage().logs().get(logging.Type.BROWSER);
    expect(logs).not.toContain(jasmine.objectContaining({
      level: logging.Level.SEVERE,
    } as logging.Entry));
  });
});

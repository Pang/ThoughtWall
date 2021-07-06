import { AppPage } from './app.po';
import { Browser, browser, by, element, logging } from 'protractor';
import { protractor } from 'protractor/built/ptor';

describe('Homepage: Threads', () => {
  let page: AppPage;
  const EC = browser.ExpectedConditions;

  beforeEach(() => {
    page = new AppPage();
    browser.get('http://localhost:4200/');
  });

  it('should match summary & thread page titles', async () => {
    var summaryTitleEl = element.all(by.css('.summaryTitle')).first();
    var summaryTitle: string;
    await summaryTitleEl.getText().then((text) => summaryTitle = text);

    element.all(by.css('.threadSummary')).first().click(); 
    browser.waitForAngularEnabled(false);

    var threadTitle = element(by.css('.threadTitle'));
    expect(threadTitle.getText()).toMatch(summaryTitle);
  })

  it('should search test and get 1 result', async () => {
    let searchBar = await element(by.css('.ngSearch'));
    await searchBar.clear();
    await searchBar.sendKeys('test');
    await searchBar.sendKeys(protractor.Key.chord(protractor.Key.ENTER));
    // waits for a .thread class to exist before continuing
    browser.wait(EC.presenceOf(await element(by.css('.threads'))));
    let threads = await element.all(by.css('.threads'));
    expect(threads.length > 0).toBeTruthy();

  })

  afterEach(async () => {
    // Assert that there are no errors emitted from the browser
    const logs = await browser.manage().logs().get(logging.Type.BROWSER);
    expect(logs).not.toContain(jasmine.objectContaining({
      level: logging.Level.SEVERE,
    } as logging.Entry));
  });
});

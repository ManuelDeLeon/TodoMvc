import Main from './pages/Main';

describe('angularjs homepage', function () {
  const mainPage = new Main();
  beforeEach(()=>{
    browser.waitForAngularEnabled(false);
    browser.get('/');
  });

  it('can add item', function () {
    const input = mainPage.newItem;
    expect(input.getText()).toEqual("");
    input.sendKeys("AAA", protractor.Key.ENTER);
    const itemsLeft = mainPage.itemsLeft;
    expect(itemsLeft.getText()).toEqual("1 item left");
    const selectedFilter = mainPage.selectedFilter;
    expect(selectedFilter.getText()).toEqual('All');
    expect(mainPage.items.count()).toBe(1);
    const item = mainPage.items.get(0);
    expect(item.checkbox.getAttribute('checked')).toBeFalsy();
    expect(item.label.getText()).toEqual('AAA');
    expect(item.button.isDisplayed()).toBe(false);
    expect(input.getText()).toEqual("");
    expect(input.getId()).toEqual(browser.driver.switchTo().activeElement().getId());
  });

  it('can delete item', ()=>{
    const input = mainPage.newItem;
    input.sendKeys("AAA", protractor.Key.ENTER);
    const main = by.css('section.main');
    expect(element(main).isDisplayed()).toBe(true);
    const footer = by.css('footer.footer');
    expect(element(footer).isDisplayed()).toBe(true);
    browser.actions().mouseMove(element(by.css('ul.todo-list li'))).perform();
    const button = element(by.css('button.destroy'));
    expect(button.isDisplayed()).toBe(true);
    browser.actions().click(button).perform();
    expect(element(main).isPresent()).toBe(false);
    expect(element(footer).isPresent()).toBe(false);
    expect(input.getText()).toEqual("");
  })

  it(`can select All/Active/Completed`, ()=>{
    const input = mainPage.newItem;
    input.sendKeys("AAA", protractor.Key.ENTER);
    const aaaCheckbox = element(by.css('.view input[type="checkbox"]:not(:checked)'));
    input.sendKeys("BBB", protractor.Key.ENTER);
    expect(element(by.css('span.todo-count')).getText()).toEqual("2 items left");
    browser.actions().click(aaaCheckbox).perform();
    const bbbCheckbox = element(by.css('.view input[type="checkbox"]:not(:checked)'));
    expect(element(by.css('span.todo-count')).getText()).toEqual("1 item left");
  })
});
